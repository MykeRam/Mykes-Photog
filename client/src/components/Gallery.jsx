import React, { useEffect, useMemo, useState } from 'react'

function getSpanClassWithIndex(ratio, index) {
  if (!ratio) return 'item--square'

  if (ratio >= 1.75) {
    return index % 9 === 1 ? 'item--feature-wide' : 'item--wide'
  }

  if (ratio >= 1.12) {
    if (index % 11 === 1) return 'item--feature-landscape'
    if (index % 7 === 4) return 'item--medium-landscape'
    return 'item--landscape'
  }

  if (ratio <= 0.68) {
    return index % 6 === 0 ? 'item--feature-portrait' : 'item--portrait-tall'
  }

  if (ratio <= 0.95) {
    return index % 8 === 3 ? 'item--portrait-emphasis' : 'item--portrait'
  }

  return index % 10 === 5 ? 'item--square-large' : 'item--square'
}

function loadAspectRatio(src) {
  return new Promise((resolve) => {
    const probe = new window.Image()

    probe.onload = () => {
      if (!probe.naturalWidth || !probe.naturalHeight) {
        resolve([src, 1])
        return
      }

      resolve([src, probe.naturalWidth / probe.naturalHeight])
    }

    probe.onerror = () => resolve([src, 1])
    probe.src = src
  })
}

const thumbModules = import.meta.glob('../images/thumbs/**/*.{webp,jpg,jpeg,png,svg,gif}', {
  eager: true,
  query: '?url',
  import: 'default'
})

const fullModules = import.meta.glob('../images/full/**/*.{webp,jpg,jpeg,png,svg,gif}', {
  eager: true,
  query: '?url',
  import: 'default'
})

const extensionPriority = {
  webp: 0,
  jpg: 1,
  jpeg: 2,
  png: 3,
  gif: 4,
  svg: 5
}

function stripExt(p) {
  return p.replace(/\.[^/.]+$/, '')
}

function getVariantInfo(filePath, rootSegment, suffix) {
  const prefix = `../images/${rootSegment}/`
  const relative = filePath.startsWith(prefix) ? filePath.slice(prefix.length) : filePath
  const base = stripExt(relative).replace(new RegExp(`${suffix}$`), '')
  const parts = base.split('/')
  const folder = parts[parts.length - 2] || 'root'
  return { key: base.toLowerCase(), sortPath: base, folder }
}

export default function Gallery() {
  const [parentFilter, setParentFilter] = useState('All')
  const [childFilter, setChildFilter] = useState(null)
  const [activeImage, setActiveImage] = useState(null)
  const [aspectRatios, setAspectRatios] = useState({})

  const images = useMemo(() => {
    const grouped = new Map()

    for (const [p, src] of Object.entries(thumbModules)) {
      const ext = p.split('.').pop().toLowerCase()
      const rank = extensionPriority[ext] ?? 99
      const info = getVariantInfo(p, 'thumbs', '-thumb')
      const existing = grouped.get(info.key) || {
        sortPath: info.sortPath,
        folder: info.folder,
        thumb: null,
        thumbRank: 99,
        full: null,
        fullRank: 99
      }

      if (!existing.thumb || rank < existing.thumbRank) {
        existing.thumb = src
        existing.thumbRank = rank
      }

      grouped.set(info.key, existing)
    }

    for (const [p, src] of Object.entries(fullModules)) {
      const ext = p.split('.').pop().toLowerCase()
      const rank = extensionPriority[ext] ?? 99
      const info = getVariantInfo(p, 'full', '-large')
      const existing = grouped.get(info.key) || {
        sortPath: info.sortPath,
        folder: info.folder,
        thumb: null,
        thumbRank: 99,
        full: null,
        fullRank: 99
      }

      if (!existing.full || rank < existing.fullRank) {
        existing.full = src
        existing.fullRank = rank
      }

      grouped.set(info.key, existing)
    }

    const ordered = Array.from(grouped.values()).sort((a, b) => a.sortPath.localeCompare(b.sortPath))
    const list = ordered.map((item) => {
      const pathParts = item.sortPath.split('/')
      const parent = pathParts[0] || 'root'
      const child = pathParts[1] || 'root'
      return {
        thumb: item.thumb || item.full,
        full: item.full || item.thumb,
        folder: item.folder,
        parent,
        child
      }
    })
    return list.filter((item) => Boolean(item.thumb && item.full))
  }, [])

  useEffect(() => {
    if (!activeImage) return undefined

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveImage(null)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeImage])

  useEffect(() => {
    let cancelled = false

    const missingThumbs = images
      .map((image) => image.thumb)
      .filter((thumb) => thumb && aspectRatios[thumb] === undefined)

    if (missingThumbs.length === 0) return undefined

    Promise.all(missingThumbs.map((thumb) => loadAspectRatio(thumb))).then((entries) => {
      if (cancelled || entries.length === 0) return

      setAspectRatios((current) => {
        const next = { ...current }

        for (const [src, ratio] of entries) {
          next[src] = ratio
        }

        return next
      })
    })

    return () => {
      cancelled = true
    }
  }, [images, aspectRatios])

  const categories = useMemo(() => {
    const map = new Map()
    for (const img of images) {
      if (!map.has(img.parent)) {
        map.set(img.parent, new Set())
      }
      map.get(img.parent).add(img.child)
    }
    return map
  }, [images])

  const parentFolders = useMemo(() => Array.from(categories.keys()).sort(), [categories])

  const childFolders = useMemo(() => {
    if (parentFilter === 'All') return []
    return Array.from(categories.get(parentFilter) || []).sort()
  }, [categories, parentFilter])

  useEffect(() => {
    if (parentFilter === 'All') {
      setChildFilter(null)
      return
    }

    if (childFolders.length === 0) {
      setChildFilter(null)
      return
    }

    if (!childFilter || !childFolders.includes(childFilter)) {
      setChildFilter(childFolders[0])
    }
  }, [parentFilter, childFolders, childFilter])

  const visible = useMemo(() => {
    if (parentFilter === 'All') return images
    if (!childFilter) return images.filter((i) => i.parent === parentFilter)
    return images.filter((i) => i.parent === parentFilter && i.child === childFilter)
  }, [images, parentFilter, childFilter])

  return (
    <div>
      <div className="filters">
        <button
          className={`filter ${parentFilter === 'All' ? 'active' : ''}`}
          onClick={() => {
            setParentFilter('All')
            setChildFilter('All')
          }}
        >
          All
        </button>
        {parentFolders.map((f) => (
          <button
            key={f}
            className={`filter ${parentFilter === f ? 'active' : ''}`}
            onClick={() => setParentFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {parentFilter !== 'All' ? (
        <div className="filters subfilters">
          {childFolders.map((f) => (
            <button
              key={f}
              className={`filter ${childFilter === f ? 'active' : ''}`}
              onClick={() => setChildFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      ) : null}

      <section className="grid">
        {visible.map((it, i) => (
          <div key={i} className={`item ${getSpanClassWithIndex(aspectRatios[it.thumb], i)}`}>
            <button
              type="button"
              className="item-btn"
              onClick={() => setActiveImage({ src: it.full, alt: `${it.folder}-${i}` })}
              aria-label={`Open ${it.folder} image ${i + 1}`}
            >
              <img src={it.thumb} alt={`${it.folder}-${i}`} loading="lazy" decoding="async" />
            </button>
          </div>
        ))}
      </section>

      {activeImage ? (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setActiveImage(null)}>
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setActiveImage(null)}
            aria-label="Close image"
          >
            Close
          </button>
          <img
            className="lightbox-image"
            src={activeImage.src}
            alt={activeImage.alt}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </div>
  )
}
