import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { buildHash, getHashSearchParams } from '../../lib/hashRoute'
import './Gallery.css'

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

const thumbModules = import.meta.glob([
  '../../images/thumbs/**/*.{webp,jpg,jpeg,png,svg,gif}',
  '!../../images/thumbs/about-portrait/**/*'
], {
  eager: true,
  query: '?url',
  import: 'default'
})

const fullModules = import.meta.glob([
  '../../images/full/**/*.{webp,jpg,jpeg,png,svg,gif}',
  '!../../images/full/about-portrait/**/*'
], {
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

const excludedParents = new Set(['about-portrait'])

function stripExt(p) {
  return p.replace(/\.[^/.]+$/, '')
}

function getVariantInfo(filePath, rootSegment, suffix) {
  const prefix = `../../images/${rootSegment}/`
  const relative = filePath.startsWith(prefix) ? filePath.slice(prefix.length) : filePath
  const base = stripExt(relative).replace(new RegExp(`${suffix}$`), '')
  const parts = base.split('/')
  const folder = parts[parts.length - 2] || 'root'
  return { key: base.toLowerCase(), sortPath: base, folder }
}

function getInitialParentFilter() {
  const camera = getHashSearchParams().get('camera')
  return camera || 'All'
}

export default function Gallery() {
  const shouldReduceMotion = useReducedMotion()
  const [parentFilter, setParentFilter] = useState(() => getInitialParentFilter())
  const [childFilter, setChildFilter] = useState(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const [aspectRatios, setAspectRatios] = useState({})
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showLightboxNav, setShowLightboxNav] = useState(() => !window.matchMedia('(max-width: 1100px), (pointer: coarse)').matches)
  const touchStartRef = useRef({ x: 0, y: 0 })

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
    return list.filter((item) => Boolean(item.thumb && item.full) && !excludedParents.has(item.parent))
  }, [])

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

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const threshold = 48

      setShowBackToTop(scrollTop > threshold)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1100px), (pointer: coarse)')
    const syncLightboxNav = (event) => setShowLightboxNav(!event.matches)

    setShowLightboxNav(!mediaQuery.matches)
    mediaQuery.addEventListener('change', syncLightboxNav)

    return () => mediaQuery.removeEventListener('change', syncLightboxNav)
  }, [])

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

  useEffect(() => {
    if (parentFilter === 'All') return

    if (!categories.has(parentFilter)) {
      setParentFilter('All')
    }
  }, [categories, parentFilter])

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

  useEffect(() => {
    const nextSearchParams = new URLSearchParams()

    if (parentFilter !== 'All') {
      nextSearchParams.set('camera', parentFilter)
    }

    window.history.replaceState(window.history.state, '', buildHash('/', nextSearchParams))
  }, [parentFilter])

  const visible = useMemo(() => {
    if (parentFilter === 'All') return images
    if (!childFilter) return images.filter((i) => i.parent === parentFilter)
    return images.filter((i) => i.parent === parentFilter && i.child === childFilter)
  }, [images, parentFilter, childFilter])

  useEffect(() => {
    if (activeIndex === null) return undefined

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveIndex(null)
        return
      }

      if (event.key === 'ArrowRight' && visible.length > 1) {
        setActiveIndex((current) => (current === null ? current : (current + 1) % visible.length))
        return
      }

      if (event.key === 'ArrowLeft' && visible.length > 1) {
        setActiveIndex((current) =>
          current === null ? current : (current - 1 + visible.length) % visible.length
        )
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, visible.length])

  const isGridReady = useMemo(
    () => images.length === 0 || images.every((image) => aspectRatios[image.thumb] !== undefined),
    [images, aspectRatios]
  )

  useEffect(() => {
    if (activeIndex === null) return

    if (visible.length === 0 || activeIndex >= visible.length) {
      setActiveIndex(null)
    }
  }, [activeIndex, visible])

  const activeImage = activeIndex === null ? null : visible[activeIndex] || null
  const hasMultipleVisibleImages = visible.length > 1
  const shouldShowLightboxNav = hasMultipleVisibleImages && showLightboxNav

  function showNextImage() {
    setActiveIndex((current) => (current === null ? current : (current + 1) % visible.length))
  }

  function showPreviousImage() {
    setActiveIndex((current) => (current === null ? current : (current - 1 + visible.length) % visible.length))
  }

  function handleLightboxTouchStart(event) {
    const touch = event.touches[0]
    if (!touch) return

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY
    }
  }

  function handleLightboxTouchEnd(event) {
    if (!hasMultipleVisibleImages) return

    const touch = event.changedTouches[0]
    if (!touch) return

    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY)) return

    if (deltaX < 0) {
      showNextImage()
      return
    }

    showPreviousImage()
  }

  return (
    <div>
      <AnimatePresence>
        {showBackToTop ? (
          <motion.button
            type="button"
            className="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            whileHover={!shouldReduceMotion ? { scale: 1.08, y: -2 } : undefined}
            whileTap={!shouldReduceMotion ? { scale: 0.94 } : undefined}
            {...(!shouldReduceMotion
              ? {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
                }
              : {})}
          >
            <span className="back-to-top-arrow" aria-hidden="true">
              &uarr;
            </span>
          </motion.button>
        ) : null}
      </AnimatePresence>

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

      {isGridReady ? (
        <motion.section
          className="grid"
          {...(!shouldReduceMotion
            ? {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }
              }
            : {})}
        >
          {visible.map((it, i) => (
            <div key={i} className={`item ${getSpanClassWithIndex(aspectRatios[it.thumb], i)}`}>
              <button
                type="button"
                className="item-btn"
                onClick={() => setActiveIndex(i)}
                aria-label={`Open ${it.folder} image ${i + 1}`}
              >
                <img src={it.thumb} alt={`${it.folder}-${i}`} loading="lazy" decoding="async" />
              </button>
            </div>
          ))}
        </motion.section>
      ) : null}

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            onClick={() => setActiveIndex(null)}
            {...(!shouldReduceMotion
              ? {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
                }
              : {})}
          >
            {shouldShowLightboxNav ? (
              <motion.button
                type="button"
                className="lightbox-nav lightbox-nav--prev"
                onClick={(event) => {
                  event.stopPropagation()
                  showPreviousImage()
                }}
                aria-label="Show previous image"
                {...(!shouldReduceMotion
                  ? {
                      initial: { opacity: 0, x: -10 },
                      animate: { opacity: 1, x: 0 },
                      exit: { opacity: 0, x: -10 },
                      transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
                    }
                  : {})}
              >
                &larr;
              </motion.button>
            ) : null}
            <motion.button
              type="button"
              className="lightbox-close"
              onClick={() => setActiveIndex(null)}
              aria-label="Close image"
              {...(!shouldReduceMotion
                ? {
                    initial: { opacity: 0, y: -8 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -8 },
                    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
                  }
                : {})}
            >
              Close
            </motion.button>
            <motion.img
              className="lightbox-image"
              src={activeImage.full}
              alt={`${activeImage.folder}-${activeIndex + 1}`}
              onClick={(event) => event.stopPropagation()}
              onTouchStart={handleLightboxTouchStart}
              onTouchEnd={handleLightboxTouchEnd}
              {...(!shouldReduceMotion
                ? {
                    initial: { opacity: 0, scale: 0.97, y: 12 },
                    animate: { opacity: 1, scale: 1, y: 0 },
                    exit: { opacity: 0, scale: 0.98, y: 10 },
                    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
                  }
                : {})}
            />
            {shouldShowLightboxNav ? (
              <motion.button
                type="button"
                className="lightbox-nav lightbox-nav--next"
                onClick={(event) => {
                  event.stopPropagation()
                  showNextImage()
                }}
                aria-label="Show next image"
                {...(!shouldReduceMotion
                  ? {
                      initial: { opacity: 0, x: 10 },
                      animate: { opacity: 1, x: 0 },
                      exit: { opacity: 0, x: 10 },
                      transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
                    }
                  : {})}
              >
                &rarr;
              </motion.button>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
