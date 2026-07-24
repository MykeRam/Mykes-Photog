import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { projectCards } from '../../data/projects'
import { buildHash } from '../../lib/hashRoute'
import './Coding.css'

const headingAnimations = {
  thoughtful: {
    initial: { opacity: 0, filter: 'blur(8px)' },
    whileInView: { opacity: 1, filter: 'blur(0px)' },
    transition: {
      duration: 1.05,
      delay: 0.08,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  responsive: {
    initial: { opacity: 0, x: 28 },
    whileInView: { opacity: 1, x: 0 },
    transition: {
      duration: 0.72,
      delay: 0.26,
      ease: [0.22, 1, 0.36, 1]
    },
    hover: {
      rotate: [0, -2.1, 2.1],
      x: [0, -1.5, 1.5],
      transition: {
        duration: 0.82,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'mirror'
      }
    }
  },
  softwareEngineering: {
    initial: { y: '102%' },
    whileInView: { y: '0%' },
    transition: {
      duration: 0.82,
      delay: 0.46,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const headingActivationDelayMs = 140

const skillCategories = [
  {
    title: 'Frontend',
    items: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'TypeScript',
      'React',
      'Responsive Design',
      'Flexbox',
      'CSS Grid',
      'BEM',
      'DOM Manipulation',
      'React Hooks',
      'Component-Based Development',
      'Form Validation'
    ]
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express.js', 'JSON', 'Server Routing', 'Basic Backend Development', 'Authentication & Authorization']
  },
  {
    title: 'Databases',
    items: ['SQL', 'PostgreSQL', 'MongoDB', 'Database Fundamentals']
  },
  {
    title: 'APIs',
    items: ['REST API Integration', 'API-Driven Development', 'OpenWeatherMap API', 'Google Maps API', 'Google Places API']
  },
  {
    title: 'Tools / Deployment',
    items: ['Git', 'GitHub', 'VS Code', 'Vite', 'npm', 'GitHub Pages', 'GitHub Actions', 'Command Line', 'Chrome DevTools', 'Figma', 'Deployment Practices']
  }
]

const projectSections = [
  {
    title: 'Projects',
    intro:
      "This section features projects I've built while studying software engineering and developing my skills in modern web development. Each project reflects a different stage of my growth and shows how I'm applying TypeScript, SQL, PostgreSQL, and other tools to real products.",
    projects: projectCards.filter((project) => project.group !== 'Foundational Projects')
  },
  {
    title: 'Foundational Projects',
    intro:
      'These earlier TripleTen projects established the core habits behind the rest of my work: clean structure, responsive layout, semantic HTML, and maintainable CSS. They show the foundation I kept building on as I moved into more advanced full-stack projects.',
    projects: projectCards.filter((project) => project.group === 'Foundational Projects')
  }
]

function ProjectCarousel({ project, shouldReduceMotion }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const swipeStateRef = useRef(null)
  const previewTriggerRef = useRef(null)
  const previewModalRef = useRef(null)
  const previewCloseButtonRef = useRef(null)
  const images = project.images ?? []
  const activeImage = images[activeImageIndex] ?? images[0]
  const hasMultipleImages = images.length > 1

  useEffect(() => {
    if (!hasMultipleImages) return

    const adjacentImageIndexes = [
      (activeImageIndex - 1 + images.length) % images.length,
      (activeImageIndex + 1) % images.length
    ]

    adjacentImageIndexes.forEach((imageIndex) => {
      const image = new Image()
      image.src = images[imageIndex].src
    })
  }, [activeImageIndex, hasMultipleImages, images])

  useEffect(() => {
    if (!isPreviewOpen) return undefined

    const scrollPosition = {
      x: window.scrollX,
      y: window.scrollY
    }
    const appShell = document.querySelector('.app-shell')
    const previousAppShellAriaHidden = appShell?.getAttribute('aria-hidden')
    const wasAppShellInert = appShell?.inert ?? false

    previewCloseButtonRef.current?.focus({ preventScroll: true })

    if (appShell) {
      appShell.inert = true
      appShell.setAttribute('aria-hidden', 'true')
    }

    const preventBackgroundScroll = (event) => {
      event.preventDefault()
    }

    const handlePreviewKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsPreviewOpen(false)
        return
      }

      if (event.key === 'Tab') {
        const focusableElements = Array.from(
          previewModalRef.current?.querySelectorAll('button:not([disabled])') ?? []
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements.at(-1)

        if (!firstElement || !lastElement) return

        if (event.shiftKey && (document.activeElement === firstElement || !previewModalRef.current?.contains(document.activeElement))) {
          event.preventDefault()
          lastElement.focus()
          return
        }

        if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }

        return
      }

      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(event.key)) {
        event.preventDefault()
        return
      }

      if (!hasMultipleImages) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setActiveImageIndex((currentIndex) => (currentIndex - 1 + images.length) % images.length)
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        setActiveImageIndex((currentIndex) => (currentIndex + 1) % images.length)
      }
    }

    window.addEventListener('keydown', handlePreviewKeyDown)
    window.addEventListener('wheel', preventBackgroundScroll, { passive: false })
    window.addEventListener('touchmove', preventBackgroundScroll, { passive: false })

    return () => {
      window.scrollTo(scrollPosition.x, scrollPosition.y)
      window.removeEventListener('keydown', handlePreviewKeyDown)
      window.removeEventListener('wheel', preventBackgroundScroll)
      window.removeEventListener('touchmove', preventBackgroundScroll)

      if (appShell) {
        appShell.inert = wasAppShellInert

        if (previousAppShellAriaHidden === null) {
          appShell.removeAttribute('aria-hidden')
        } else {
          appShell.setAttribute('aria-hidden', previousAppShellAriaHidden)
        }
      }

      previewTriggerRef.current?.focus({ preventScroll: true })
    }
  }, [hasMultipleImages, images.length, isPreviewOpen])

  const goToPreviousImage = () => {
    setActiveImageIndex((currentIndex) => (currentIndex - 1 + images.length) % images.length)
  }

  const goToNextImage = () => {
    setActiveImageIndex((currentIndex) => (currentIndex + 1) % images.length)
  }

  const handlePointerDown = (event) => {
    if (shouldReduceMotion || !hasMultipleImages || event.pointerType === 'mouse') {
      return
    }

    if (event.target instanceof Element && event.target.closest('button')) {
      return
    }

    swipeStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startTime: window.performance.now()
    }

    if (event.currentTarget.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId)
    }
  }

  const handlePointerUp = (event) => {
    const swipeState = swipeStateRef.current

    if (!swipeState || swipeState.pointerId !== event.pointerId) {
      return
    }

    swipeStateRef.current = null

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    const deltaX = event.clientX - swipeState.startX
    const deltaY = event.clientY - swipeState.startY
    const elapsed = window.performance.now() - swipeState.startTime
    const isHorizontalSwipe = Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2
    const isQuickEnough = elapsed <= 700

    if (!isHorizontalSwipe || !isQuickEnough) {
      return
    }

    if (deltaX < 0) {
      goToNextImage()
      return
    }

    goToPreviousImage()
  }

  const clearSwipeState = (event) => {
    const swipeState = swipeStateRef.current

    if (!swipeState || swipeState.pointerId !== event.pointerId) {
      return
    }

    swipeStateRef.current = null
  }

  if (!activeImage) {
    return null
  }

  const imageFrameClassName = ['coding-project-image', activeImage.className].filter(Boolean).join(' ')
  const openPreview = (event) => {
    previewTriggerRef.current = event.currentTarget
    setIsPreviewOpen(true)
  }

  const previewModal = isPreviewOpen ? (
    <motion.div
      ref={previewModalRef}
      className="coding-project-preview"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} image preview`}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.24 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setIsPreviewOpen(false)
        }
      }}
    >
      <button
        ref={previewCloseButtonRef}
        type="button"
        className="coding-project-preview-close"
        onClick={() => setIsPreviewOpen(false)}
        aria-label={`Close ${project.name} image preview`}
      >
        <span aria-hidden="true">×</span>
      </button>

      <div className="coding-project-preview-stage">
        <AnimatePresence initial={false}>
          <motion.img
            key={activeImage.src}
            className="coding-project-preview-image"
            src={activeImage.src}
            alt={activeImage.alt}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </div>

      {hasMultipleImages ? (
        <>
          <button
            type="button"
            className="coding-project-preview-button coding-project-preview-button--prev"
            onClick={goToPreviousImage}
            aria-label={`Show previous image for ${project.name}`}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="coding-project-preview-button coding-project-preview-button--next"
            onClick={goToNextImage}
            aria-label={`Show next image for ${project.name}`}
          >
            <span aria-hidden="true">→</span>
          </button>
          <div className="coding-project-preview-counter" aria-hidden="true">
            {activeImageIndex + 1} / {images.length}
          </div>
        </>
      ) : null}
    </motion.div>
  ) : null

  return (
    <>
      <div
        className={imageFrameClassName}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={clearSwipeState}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.button
            key={activeImage.src}
            type="button"
            className="coding-project-image-trigger"
            aria-label={`Open larger preview of ${activeImage.alt}`}
            onClick={openPreview}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.42,
                    ease: 'easeInOut'
                  }
            }
          >
            <img
              className="coding-project-carousel-image"
              src={activeImage.src}
              alt={activeImage.alt}
            />
          </motion.button>
        </AnimatePresence>

        {hasMultipleImages ? (
          <>
            <button
              type="button"
              className="coding-project-carousel-button coding-project-carousel-button--prev"
              onClick={goToPreviousImage}
              aria-label={`Show previous image for ${project.name}`}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              className="coding-project-carousel-button coding-project-carousel-button--next"
              onClick={goToNextImage}
              aria-label={`Show next image for ${project.name}`}
            >
              <span aria-hidden="true">→</span>
            </button>
            <div className="coding-project-carousel-counter" aria-hidden="true">
              {activeImageIndex + 1} / {images.length}
            </div>
          </>
        ) : null}
        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {project.name}: Image {activeImageIndex + 1} of {images.length}. {activeImage.alt}
        </div>
      </div>

      {createPortal(<AnimatePresence>{previewModal}</AnimatePresence>, document.body)}
    </>
  )
}

function ProjectCard({ project, index, shouldReduceMotion, shouldRevealOnEnter, navigate }) {
  const projectHref = buildHash(`/coding/${project.slug}`)

  return (
    <motion.article
      className="coding-project-card"
      initial={shouldReduceMotion || shouldRevealOnEnter ? false : { opacity: 0, y: 24 }}
      animate={
        shouldReduceMotion || shouldRevealOnEnter
          ? { opacity: 1, y: 0 }
          : undefined
      }
      whileInView={
        shouldReduceMotion || shouldRevealOnEnter ? undefined : { opacity: 1, y: 0 }
      }
      viewport={shouldReduceMotion || shouldRevealOnEnter ? undefined : { once: true, amount: 0.25 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration: 0.65,
              delay: shouldRevealOnEnter ? 0.05 + index * 0.06 : 0.12 + index * 0.18,
              ease: [0.22, 1, 0.36, 1]
            }
      }
    >
      <ProjectCarousel project={project} shouldReduceMotion={shouldReduceMotion} />

      <div className="coding-project-body">
        <h3>
          <a
            className="coding-project-title-link"
            href={projectHref}
            onClick={(event) => {
              event.preventDefault()
              navigate(projectHref)
            }}
          >
            {project.name}
          </a>
        </h3>
        <p>{project.description}</p>
        <p className="coding-project-stack">{project.cardStack ?? project.stack}</p>

        <div className="coding-project-links" aria-label={`${project.name} links`}>
          {project.liveHref ? (
            <a
              className="coding-project-link"
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
              className="coding-project-link"
              href={project.githubHref}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.name} GitHub repository (opens in a new tab)`}
            >
              GitHub
            </a>
          ) : null}
          {!project.liveHref && !project.githubHref ? (
            <>
              <span className="coding-project-link">Live Demo</span>
              <span className="coding-project-link">GitHub</span>
            </>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}

export default function Coding({
  sectionId = 'coding',
  isSectionActive = false,
  isSectionTargeted = false,
  navigate
}) {
  const shouldReduceMotion = useReducedMotion()
  const [isResponsiveHoverEnabled, setIsResponsiveHoverEnabled] = useState(false)
  const [isResponsiveHovered, setIsResponsiveHovered] = useState(false)
  const headingRef = useRef(null)
  const projectCueRef = useRef(null)
  const projectsHeadingRef = useRef(null)
  const isHeadingInView = useInView(headingRef, {
    amount: 0.6,
    margin: '0px 0px -18% 0px'
  })
  const isProjectsHeadingInView = useInView(projectsHeadingRef, {
    amount: 0.45,
    margin: '0px 0px -18% 0px'
  })
  const isProjectCueInView = useInView(projectCueRef, {
    amount: 0.15,
    margin: '0px 0px -8% 0px'
  })
  const isProjectCueVisible = shouldReduceMotion || isProjectCueInView
  const projectCueRevealDelay = isSectionTargeted ? 0.24 : 0.08

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsResponsiveHoverEnabled(true)
      return undefined
    }

    if (!isHeadingInView) {
      setIsResponsiveHoverEnabled(false)
      setIsResponsiveHovered(false)
      return undefined
    }

    const timerId = window.setTimeout(() => {
      setIsResponsiveHoverEnabled(true)
    }, headingActivationDelayMs)

    return () => window.clearTimeout(timerId)
  }, [isHeadingInView, shouldReduceMotion])
  const scrollToProjects = () => {
    const projectsHeading = document.getElementById('coding-projects-title')
    if (!projectsHeading) return

    projectsHeading.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
      block: 'start'
    })
  }

  return (
    <section id={sectionId} className="page-shell" aria-labelledby="coding-title">
      <div className="container">
        <div className="page-copy">
          <header className="coding-intro">
            <motion.h2
              ref={headingRef}
              tabIndex={-1}
              id="coding-title"
              className="coding-intro-title"
              initial={false}
            >
              Building{' '}
              <motion.span
                className="coding-title-emphasis coding-title-emphasis--thoughtful"
                initial={shouldReduceMotion ? false : headingAnimations.thoughtful.initial}
                animate={
                  shouldReduceMotion || isHeadingInView
                    ? headingAnimations.thoughtful.whileInView
                    : headingAnimations.thoughtful.initial
                }
                transition={shouldReduceMotion ? { duration: 0 } : headingAnimations.thoughtful.transition}
              >
                thoughtful,
              </motion.span>
              {' '}
              <motion.span
                className="coding-title-emphasis coding-title-emphasis--responsive"
                initial={shouldReduceMotion ? false : headingAnimations.responsive.initial}
                animate={
                  shouldReduceMotion
                    ? { ...headingAnimations.responsive.whileInView, rotate: 0 }
                    : !isHeadingInView
                      ? headingAnimations.responsive.initial
                      : isResponsiveHoverEnabled && isResponsiveHovered
                        ? {
                            ...headingAnimations.responsive.whileInView,
                            rotate: headingAnimations.responsive.hover.rotate,
                            x: headingAnimations.responsive.hover.x
                          }
                        : {
                            ...headingAnimations.responsive.whileInView,
                            rotate: 0
                          }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : !isHeadingInView
                      ? {
                          duration: 0.18,
                          ease: [0.22, 1, 0.36, 1]
                        }
                      : isResponsiveHoverEnabled && isResponsiveHovered
                        ? {
                            opacity: { duration: 0.18 },
                            x: headingAnimations.responsive.hover.transition,
                            rotate: headingAnimations.responsive.hover.transition
                          }
                        : isResponsiveHoverEnabled
                          ? {
                              duration: 0.22,
                              ease: [0.22, 1, 0.36, 1]
                            }
                          : headingAnimations.responsive.transition
                }
                onHoverStart={() => {
                  if (!shouldReduceMotion && isResponsiveHoverEnabled) {
                    setIsResponsiveHovered(true)
                  }
                }}
                onHoverEnd={() => {
                  setIsResponsiveHovered(false)
                }}
              >
                responsive
              </motion.span>{' '}
              experiences{' '}
              <span className="coding-title-cluster">
                <span className="coding-title-prefix">through</span>
                <span className="coding-title-software-stack">
                  <span className="coding-title-mask">
                    <motion.span
                      className="coding-title-emphasis coding-title-emphasis--software"
                      initial={shouldReduceMotion ? false : headingAnimations.softwareEngineering.initial}
                      animate={
                        shouldReduceMotion || isHeadingInView
                          ? headingAnimations.softwareEngineering.whileInView
                          : headingAnimations.softwareEngineering.initial
                      }
                      transition={
                        shouldReduceMotion ? { duration: 0 } : headingAnimations.softwareEngineering.transition
                      }
                    >
                      software
                    </motion.span>
                  </span>
                  <span className="coding-title-mask">
                    <motion.span
                      className="coding-title-emphasis coding-title-emphasis--software"
                      initial={shouldReduceMotion ? false : headingAnimations.softwareEngineering.initial}
                      animate={
                        shouldReduceMotion || isHeadingInView
                          ? headingAnimations.softwareEngineering.whileInView
                          : headingAnimations.softwareEngineering.initial
                      }
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : {
                              ...headingAnimations.softwareEngineering.transition,
                              delay: headingAnimations.softwareEngineering.transition.delay + 0.06
                            }
                      }
                    >
                      engineering.
                    </motion.span>
                  </span>
                </span>
              </span>
            </motion.h2>
            <p className="coding-intro-text">
              I'm currently studying software engineering with TripleTen, where I'm building a strong
              foundation in front-end and full-stack development. I enjoy creating clean, responsive, and
              user-focused digital experiences, and I&apos;m especially drawn to the balance between design,
              structure, and problem-solving. I'm especially focused on TypeScript, SQL, and PostgreSQL as I
              keep expanding into full-stack work. This section highlights my technical skills, the tools I work
              with, and the projects I've built throughout my learning journey.
            </p>
          </header>

          <div className="coding-overview">
            <section className="coding-section coding-section--skills" aria-labelledby="coding-skills-title">
              <h2 id="coding-skills-title">Technical Skills</h2>

              <div className="coding-skill-grid">
                {skillCategories.map((category) => (
                  <div key={category.title} className="coding-skill-group">
                    <h3>{category.title}</h3>
                    <ul className="coding-skill-list">
                      {category.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="coding-section coding-section--approach" aria-labelledby="coding-approach-title">
              <h2 id="coding-approach-title">Approach</h2>
              <p>
                I enjoy building interfaces that are both functional and visually polished. As I continue growing
                as a developer, I'm focused on writing clean code, improving the way I structure projects, and
                building applications that feel intuitive and purposeful. My goal is not only to strengthen my
                technical knowledge, but also to create work that reflects both precision and creativity.
              </p>

              <motion.button
                ref={projectCueRef}
                type="button"
                className="coding-project-cue"
                onClick={scrollToProjects}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : isProjectCueVisible
                      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                      : { opacity: 0, y: 18, filter: 'blur(8px)' }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.82,
                        delay: isProjectCueVisible ? projectCueRevealDelay : 0,
                        ease: [0.22, 1, 0.36, 1]
                      }
                }
              >
                <p>Projects</p>
                <motion.span
                  className="coding-project-cue-arrow"
                  animate={
                    shouldReduceMotion
                      ? {}
                      : isProjectCueVisible
                        ? { y: [0, 6, 0], opacity: [0.65, 1, 0.65] }
                        : { y: 0, opacity: 0.65 }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 2.6,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }
                  }
                >
                  ↓
                </motion.span>
              </motion.button>
            </section>
          </div>

          {projectSections.map((section, sectionIndex) => (
            <section
              key={section.title}
              className={`coding-section coding-projects${sectionIndex === 1 ? ' coding-projects--foundational' : ''}`}
              aria-labelledby={sectionIndex === 0 ? 'coding-projects-title' : 'coding-foundational-projects-title'}
            >
              <h2
                id={sectionIndex === 0 ? 'coding-projects-title' : 'coding-foundational-projects-title'}
                ref={sectionIndex === 0 ? projectsHeadingRef : undefined}
              >
                {section.title}
              </h2>
              <p className="coding-projects-intro">{section.intro}</p>

              <div className="coding-project-list">
                {section.projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    shouldReduceMotion={shouldReduceMotion}
                    shouldRevealOnEnter={sectionIndex === 0 ? isProjectsHeadingInView : false}
                    navigate={navigate}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
