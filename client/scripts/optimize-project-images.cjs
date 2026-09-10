const fs = require('node:fs/promises')
const path = require('node:path')
const sharp = require('sharp')

async function main() {
  const root = path.resolve(__dirname, '..')
  const source = await fs.readFile(path.join(root, 'src/data/projects.js'), 'utf8')
  const references = [...source.matchAll(/projectImageAssets\('([^']+)', '([^']+)'\)/g)]
  const processed = new Set()
  let originalBytes = 0
  let cardBytes = 0
  let previewBytes = 0

  for (const [, folder, filename] of references) {
    const key = `${folder}/${filename}`
    if (processed.has(key)) continue
    const input = path.join(root, 'public/projects', key)
    const stem = `${folder}/${path.parse(filename).name}`
    originalBytes += (await fs.stat(input)).size

    for (const [variant, size] of [
      ['card', 1000],
      ['preview', 2400]
    ]) {
      const relative = `projects/optimized/${stem}-${variant}.webp`
      const output = path.join(root, 'public', relative)
      await fs.mkdir(path.dirname(output), { recursive: true })
      const result = await sharp(input)
        .rotate()
        .resize({ width: size, height: size, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: variant === 'card' ? 82 : 88, effort: 6 })
        .toFile(output)
      if (variant === 'card') cardBytes += result.size
      else previewBytes += result.size
    }
    processed.add(key)
  }

  console.log(JSON.stringify({ images: processed.size, originalBytes, cardBytes, previewBytes }))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
