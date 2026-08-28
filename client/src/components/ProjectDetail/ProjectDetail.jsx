import React, { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { buildHash } from '../../lib/hashRoute'
import './ProjectDetail.css'

function ProjectLinks({ project }) {
  if (!project.liveHref && !project.githubHref) return null

  return (
    <div className="project-detail-links" aria-label={`${project.name} links`}>
      {project.liveHref ? (
        <a
          className="project-detail-link"
          href={project.liveHref}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.name} live demo (opens in a new tab)`}
        >
          Live Demo
        </a>
      ) : null}
      {project.githubHref ? (
        <a
          className="project-detail-link"
          href={project.githubHref}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.name} GitHub repository (opens in a new tab)`}
        >
          GitHub
        </a>
      ) : null}
    </div>
  )
}

function ProjectImageCarousel({ project, shouldReduceMotion }) {
  const [activeImageIndex, setActiveImageIndex] = useState(project.featuredImageIndex ?? 0)
  const images = project.images ?? []
  const activeImage = images[activeImageIndex] ?? images[0]
  const hasMultipleImages = images.length > 1
  const isMobileTriptych = project.presentation === 'mobile-triptych'

  if (!activeImage) return null

  if (isMobileTriptych) {
    return (
      <div className="project-detail-mobile-showcase" aria-label={`${project.name} mobile screens`}>
        {images.map((image, imageIndex) => (
          <img
            key={image.src}
            className={`project-detail-mobile-screen${imageIndex === project.featuredImageIndex ? ' project-detail-mobile-screen--featured' : ''}`}
            src={image.src}
            alt={image.alt}
            loading={imageIndex === project.featuredImageIndex ? 'eager' : 'lazy'}
            decoding="async"
          />
        ))}
      </div>
    )
  }

  const goToPreviousImage = () => {
    setActiveImageIndex((currentIndex) => (currentIndex - 1 + images.length) % images.length)
  }

  const goToNextImage = () => {
    setActiveImageIndex((currentIndex) => (currentIndex + 1) % images.length)
  }

  return (
    <div className={`project-detail-carousel ${activeImage.className || ''}`}>
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.99 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: 0.32,
                  ease: [0.22, 1, 0.36, 1]
                }
          }
        />
      </AnimatePresence>

      {hasMultipleImages ? (
        <>
          <button
            type="button"
            className="project-detail-carousel-button project-detail-carousel-button--prev"
            onClick={goToPreviousImage}
            aria-label={`Show previous image for ${project.name}`}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            className="project-detail-carousel-button project-detail-carousel-button--next"
            onClick={goToNextImage}
            aria-label={`Show next image for ${project.name}`}
          >
            <span aria-hidden="true">›</span>
          </button>
          <div className="project-detail-carousel-counter" aria-hidden="true">
            {activeImageIndex + 1} / {images.length}
          </div>
        </>
      ) : null}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {project.name}: Image {activeImageIndex + 1} of {images.length}. {activeImage.alt}
      </div>
    </div>
  )
}

export default function ProjectDetail({ project, navigate }) {
  const shouldReduceMotion = useReducedMotion()
  const codingHref = buildHash('/', new URLSearchParams({ section: 'coding' }))

  if (!project) {
    return (
      <section className="project-detail-page project-detail-page--empty" aria-labelledby="project-detail-title">
        <div className="container">
          <a
            className="project-detail-back"
            href={codingHref}
            onClick={(event) => {
              event.preventDefault()
              navigate(codingHref)
            }}
          >
            Back to projects
          </a>
          <h1 id="project-detail-title" tabIndex={-1}>Project not found</h1>
        </div>
      </section>
    )
  }

  return (
    <section className="project-detail-page" aria-labelledby="project-detail-title">
      <div className="container">
        <a
          className="project-detail-back"
          href={codingHref}
          onClick={(event) => {
            event.preventDefault()
            navigate(codingHref)
          }}
        >
          Back to projects
        </a>

        <motion.header
          className="project-detail-hero"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 id="project-detail-title" tabIndex={-1}>{project.name}</h1>
        </motion.header>

        <section className="project-detail-showcase" aria-label={`${project.name} project details`}>
          <ProjectImageCarousel project={project} shouldReduceMotion={shouldReduceMotion} />

          <div className="project-detail-copy">
            <section className="project-detail-section" aria-labelledby="project-detail-overview">
              <h2 id="project-detail-overview">Overview</h2>
              <p className="project-detail-summary">{project.description}</p>
              {(project.detailDescription ?? []).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>

            {project.highlights?.length ? (
              <section className="project-detail-section" aria-labelledby="project-detail-highlights">
                <h2 id="project-detail-highlights">Highlights</h2>
                <ul className="project-detail-highlights">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            <ProjectLinks project={project} />
          </div>
        </section>

        <section className="project-detail-stack-section" aria-labelledby="project-detail-stack">
          <h2 id="project-detail-stack">Tech Stack</h2>
          <p className="project-detail-stack">{project.stack}</p>
        </section>
      </div>
    </section>
  )
}
