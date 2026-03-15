const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const projectRoot = path.join(__dirname, '..');
const imagesRoot = path.join(projectRoot, 'src', 'images');
const thumbsRoot = path.join(imagesRoot, 'thumbs');
const fullRoot = path.join(imagesRoot, 'full');

const force = process.argv.includes('--force');

const THUMB_MAX = 640;
const LARGE_MAX = 2200;
const THUMB_QUALITY = 78;
const LARGE_QUALITY = 84;
const SOURCE_EXT_PRIORITY = {
  tif: 0,
  tiff: 1,
  png: 2,
  jpg: 3,
  jpeg: 4,
  webp: 5
};

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
      continue;
    }
    files.push(full);
  }
  return files;
}

function sourceExt(filePath) {
  return path.extname(filePath).replace('.', '').toLowerCase();
}

function isSourceImage(filePath) {
  return Object.prototype.hasOwnProperty.call(SOURCE_EXT_PRIORITY, sourceExt(filePath));
}

function isDerivedVariant(filePath) {
  return filePath.startsWith(thumbsRoot) || filePath.startsWith(fullRoot);
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function targetPaths(input) {
  const rel = path.relative(imagesRoot, input);
  const parsed = path.parse(rel);
  const thumbOut = path.join(thumbsRoot, parsed.dir, `${parsed.name}-thumb.webp`);
  const largeOut = path.join(fullRoot, parsed.dir, `${parsed.name}-large.webp`);
  return { thumbOut, largeOut };
}

function baseKey(filePath) {
  return filePath.replace(/\.[^/.]+$/, '').toLowerCase();
}

function pickBestSources(files) {
  const chosen = new Map();
  for (const file of files) {
    const key = baseKey(file);
    const rank = SOURCE_EXT_PRIORITY[sourceExt(file)] ?? 99;
    const existing = chosen.get(key);
    if (!existing || rank < existing.rank) {
      chosen.set(key, { file, rank });
    }
  }
  return Array.from(chosen.values()).map((v) => v.file);
}

function hasMagick() {
  const result = spawnSync('magick', ['-version'], { stdio: 'ignore', shell: true });
  return result.status === 0;
}

async function convertWithSharp(sourceFiles) {
  let sharp;
  try {
    sharp = require('sharp');
  } catch {
    return null;
  }

  let converted = 0;
  let skipped = 0;

  for (const input of sourceFiles) {
    const { thumbOut, largeOut } = targetPaths(input);
    const needsThumb = force || !fs.existsSync(thumbOut);
    const needsLarge = force || !fs.existsSync(largeOut);

    if (!needsThumb && !needsLarge) {
      skipped++;
      continue;
    }

    ensureDir(thumbOut);
    ensureDir(largeOut);

    if (needsThumb) {
      await sharp(input)
        .rotate()
        .resize({ width: THUMB_MAX, height: THUMB_MAX, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: THUMB_QUALITY })
        .toFile(thumbOut);
    }

    if (needsLarge) {
      await sharp(input)
        .rotate()
        .resize({ width: LARGE_MAX, height: LARGE_MAX, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: LARGE_QUALITY })
        .toFile(largeOut);
    }

    converted++;
    console.log(`sharp: ${path.relative(projectRoot, input)}`);
  }

  return { converted, skipped };
}

function convertWithMagick(sourceFiles) {
  if (!hasMagick()) return null;

  let converted = 0;
  let skipped = 0;

  for (const input of sourceFiles) {
    const { thumbOut, largeOut } = targetPaths(input);
    const needsThumb = force || !fs.existsSync(thumbOut);
    const needsLarge = force || !fs.existsSync(largeOut);

    if (!needsThumb && !needsLarge) {
      skipped++;
      continue;
    }

    ensureDir(thumbOut);
    ensureDir(largeOut);

    if (needsThumb) {
      const thumbResult = spawnSync(
        'magick',
        [input, '-auto-orient', '-resize', `${THUMB_MAX}x${THUMB_MAX}>`, '-quality', `${THUMB_QUALITY}`, thumbOut],
        { stdio: 'inherit', shell: true }
      );
      if (thumbResult.status !== 0) {
        throw new Error(`ImageMagick failed for ${input}`);
      }
    }

    if (needsLarge) {
      const largeResult = spawnSync(
        'magick',
        [input, '-auto-orient', '-resize', `${LARGE_MAX}x${LARGE_MAX}>`, '-quality', `${LARGE_QUALITY}`, largeOut],
        { stdio: 'inherit', shell: true }
      );
      if (largeResult.status !== 0) {
        throw new Error(`ImageMagick failed for ${input}`);
      }
    }

    converted++;
    console.log(`magick: ${path.relative(projectRoot, input)}`);
  }

  return { converted, skipped };
}

async function main() {
  if (!fs.existsSync(imagesRoot)) {
    throw new Error(`Images directory not found: ${imagesRoot}`);
  }

  const allFiles = walk(imagesRoot);
  const sourceCandidates = allFiles.filter((f) => isSourceImage(f) && !isDerivedVariant(f));
  const sourceFiles = pickBestSources(sourceCandidates);
  if (sourceFiles.length === 0) {
    console.log('No source image files found.');
    return;
  }

  const convertedBySharp = await convertWithSharp(sourceFiles);
  if (convertedBySharp) {
    console.log(
      `sharp: converted ${convertedBySharp.converted}, skipped ${convertedBySharp.skipped} source files.`
    );
    return;
  }

  const convertedByMagick = convertWithMagick(sourceFiles);
  if (convertedByMagick) {
    console.log(
      `ImageMagick: converted ${convertedByMagick.converted}, skipped ${convertedByMagick.skipped} source files.`
    );
    return;
  }

  throw new Error(
    'No converter available. Install sharp (`npm install --save-dev sharp`) or install ImageMagick (`magick`).'
  );
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
