import React, { useEffect, useState } from 'react'
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

const heroImagePool = Object.values(thumbModules)

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

function loadImageRatio(src) {
  return new Promise((resolve) => {
    const image = new window.Image()

    image.onload = () => {
      if (!image.naturalWidth || !image.naturalHeight) {
        resolve({ src, ratio: 1 })
        return
      }

      resolve({ src, ratio: image.naturalWidth / image.naturalHeight })
    }

    image.onerror = () => resolve({ src, ratio: 1 })
    image.src = src
  })
}

export default function Home({ sectionId = 'home' }) {
  const shouldReduceMotion = useReducedMotion()
  const [heroImages, setHeroImages] = useState(() =>
    heroImagePool.slice(0, 5).map((src, index) => ({
      src,
      className: index === 0 ? 'home-hero-card home-hero-card--lead' : 'home-hero-card'
    }))
  )

  useEffect(() => {
    let isCancelled = false

    Promise.all(shuffle(heroImagePool).map((src) => loadImageRatio(src))).then((images) => {
      if (isCancelled) return

      const portraitImages = images.filter((image) => image.ratio < 0.96).slice(0, 5)
      const selectedImages = portraitImages.length === 5 ? portraitImages : images.slice(0, 5)

      setHeroImages(
        selectedImages.map((image, index) => ({
          src: image.src,
          className: index === 0 ? 'home-hero-card home-hero-card--lead' : 'home-hero-card'
        }))
      )
    })

    return () => {
      isCancelled = true
    }
  }, [])

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
