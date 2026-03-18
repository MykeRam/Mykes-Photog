import React, { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import './Home.css'

const thumbModules = import.meta.glob(
  ['../../images/thumbs/**/*.{webp,jpg,jpeg,png,svg,gif}', '!../../images/thumbs/about-portrait/**/*'],
  {
    eager: true,
    query: '?url',
    import: 'default'
  }
)

const homeHeroPortraitPaths = new Set([
  '../../images/thumbs/Olympus Trip AF 50/FujiFilm 400/88760008-thumb.webp',
  '../../images/thumbs/Olympus Trip AF 50/FujiFilm 400/88760023-thumb.webp',
  '../../images/thumbs/Olympus Trip AF 50/FujiFilm 400/88760005-thumb.webp',
  '../../images/thumbs/Olympus Trip AF 50/FujiFilm 400/88760011-thumb.webp',
  '../../images/thumbs/Olympus Trip AF 50/FujiFilm 400/88760030-thumb.webp',
  '../../images/thumbs/Olympus Trip AF 50/FujiFilm 400/88760007-thumb.webp',
  '../../images/thumbs/Olympus Trip AF 50/FujiFilm 400/88760035-thumb.webp',
  '../../images/thumbs/Olympus Trip AF 50/FujiFilm 400/88760024-thumb.webp',
  '../../images/thumbs/Olympus Trip AF 50/FujiFilm 400/88760013-thumb.webp',
  '../../images/thumbs/Olympus Trip AF 50/FujiFilm 400/88760038-thumb.webp',
  '../../images/thumbs/Olympus Trip AF 50/FujiFilm 400/88760001-thumb.webp',
  '../../images/thumbs/Olympus Trip AF 50/FujiFilm 400/88760010-thumb.webp',
  '../../images/thumbs/Olympus Trip AF 50/FujiFilm 400/88760009-thumb.webp',
  '../../images/thumbs/Olympus Trip AF 50/FujiFilm 400/88760015-thumb.webp',
  '../../images/thumbs/FujiFilm Disposable/FujiFilm 400/000003060023-thumb.webp',
  '../../images/thumbs/FujiFilm Disposable/FujiFilm 400/000003060014-thumb.webp',
  '../../images/thumbs/FujiFilm Disposable/FujiFilm 400/000003060008-thumb.webp',
  '../../images/thumbs/FujiFilm Disposable/FujiFilm 400/000003060005-thumb.webp',
  '../../images/thumbs/FujiFilm Disposable/FujiFilm 400/000003060011-thumb.webp',
  '../../images/thumbs/FujiFilm Disposable/FujiFilm 400/000003060026-thumb.webp'
])

const heroImagePool = Object.entries(thumbModules)
  .filter(([path]) => homeHeroPortraitPaths.has(path))
  .map(([, src]) => src)

function buildHeroImages() {
  return shuffle(heroImagePool)
    .slice(0, 5)
    .map((src, index) => ({
      src,
      className: index === 0 ? 'home-hero-card home-hero-card--lead' : 'home-hero-card'
    }))
}

function shuffle(items) {
  const next = [...items]

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const temp = next[index]
    next[index] = next[swapIndex]
    next[swapIndex] = temp
  }

  return next
}

export default function Home({ sectionId = 'home' }) {
  const shouldReduceMotion = useReducedMotion()
  const [heroImages] = useState(() => buildHeroImages())

  return (
    <section id={sectionId} className="home-page" aria-labelledby="home-title">
      <div className="container">
        <div className="home-showcase">
          <div className="home-hero-grid">
            {heroImages.map((image, index) => (
              <motion.figure
                key={image.src}
                className={image.className}
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1 }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        duration: 0.75,
                        delay: 0.14 + index * 0.16,
                        ease: [0.22, 1, 0.36, 1]
                      }
                }
              >
                <img
                  src={image.src}
                  alt={`Selected photography preview ${index + 1}`}
                  loading={index < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </motion.figure>
            ))}
          </div>

          <div className="home-copy">
            <h1 id="home-title" className="home-title">
              <span className="home-title-primary">
                <span className="home-title-role">Software Engineer |</span>
                <span className="home-subtitle">Student @ TripleTen</span>
              </span>
              <span className="home-title-secondary">Photographer</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}
