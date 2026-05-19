import React, { useEffect, useRef, useState } from 'react'
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

function ProjectCarousel({ project, shouldReduceMotion }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const swipeStateRef = useRef(null)
  const images = project.images ?? []
  const activeImage = images[activeImageIndex] ?? images[0]
  const hasMultipleImages = images.length > 1

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

  return (
    <div
      className={imageFrameClassName}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={clearSwipeState}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={activeImage.src}
          className="coding-project-carousel-image"
          src={activeImage.src}
          alt={activeImage.alt}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.985 }}
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
            className="coding-project-carousel-button coding-project-carousel-button--prev"
            onClick={goToPreviousImage}
            aria-label={`Show previous image for ${project.name}`}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            className="coding-project-carousel-button coding-project-carousel-button--next"
            onClick={goToNextImage}
            aria-label={`Show next image for ${project.name}`}
          >
            <span aria-hidden="true">›</span>
          </button>
          <div className="coding-project-carousel-counter" aria-hidden="true">
            {activeImageIndex + 1} / {images.length}
          </div>
        </>
      ) : null}
    </div>
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
            <a className="coding-project-link" href={project.liveHref} target="_blank" rel="noreferrer">
              Live Demo
            </a>
          ) : null}
          {project.githubHref ? (
            <a className="coding-project-link" href={project.githubHref} target="_blank" rel="noreferrer">
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
  const isHeadingInView = useInView(headingRef, {
    amount: 0.6,
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
              I&apos;m currently studying software engineering with TripleTen, where I&apos;m building a strong
              foundation in front-end and full-stack development. I enjoy creating clean, responsive, and
              user-focused digital experiences, and I&apos;m especially drawn to the balance between design,
              structure, and problem-solving. I&apos;m especially focused on TypeScript, SQL, and PostgreSQL as I
              keep expanding into full-stack work. This section highlights my technical skills, the tools I work
              with, and the projects I&apos;ve built throughout my learning journey.
            </p>
          </header>

          <div className="coding-overview">
            <section className="coding-section coding-section--skills" aria-labelledby="coding-skills-title">
              <h2 id="coding-skills-title">Technical Skills</h2>

              <div className="coding-skill-group">
                <h3>Frontend</h3>
                <p>
                  HTML5, CSS3, JavaScript (ES6+), React, Responsive Design, Flexbox, CSS Grid, BEM,
                  DOM Manipulation, React Hooks, Component-Based Development, Form Validation
                </p>
              </div>

              <div className="coding-skill-group">
                <h3>Backend</h3>
                <p>
                  Node.js, Express.js, REST API Integration, JSON, Server Routing, Basic Backend
                  Development
                </p>
              </div>

              <div className="coding-skill-group">
                <h3>Tools &amp; Workflow</h3>
                <p>
                  Git, GitHub, VS Code, Vite, npm, GitHub Pages, Command Line, Chrome DevTools,
                  Figma
                </p>
              </div>

              <div className="coding-skill-group">
                <h3>Programming Concepts</h3>
                <p>
                  Object-Oriented Programming (OOP), Asynchronous JavaScript, Modular Code Structure,
                  State Management Basics, Debugging, API-Driven Development
                </p>
              </div>

              <div className="coding-skill-group">
                <h3>Building Through TripleTen</h3>
                <p>
                  Advanced React Patterns, Full-Stack Development, Database Fundamentals,
                  Authentication &amp; Authorization, Backend Architecture, Deployment Practices,
                  Software Engineering Best Practices
                </p>
              </div>

              <div className="coding-skill-group">
                <h3>Learning Independently</h3>
                <p>TypeScript</p>
              </div>
            </section>

            <section className="coding-section coding-section--approach" aria-labelledby="coding-approach-title">
              <h2 id="coding-approach-title">Approach</h2>
              <p>
                I enjoy building interfaces that are both functional and visually polished. As I continue growing
                as a developer, I&apos;m focused on writing clean code, improving the way I structure projects, and
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

          <section className="coding-section coding-projects" aria-labelledby="coding-projects-title">
            <h2 id="coding-projects-title">Projects</h2>
            <p className="coding-projects-intro">
              This section features projects I&apos;ve built while studying software engineering and developing my
              skills in modern web development. Each project reflects a different stage of my growth and shows
              how I&apos;m applying TypeScript, SQL, PostgreSQL, and other tools to real products.
            </p>

            <div className="coding-project-list">
              {projectCards.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  shouldReduceMotion={shouldReduceMotion}
                  shouldRevealOnEnter={isSectionActive}
                  navigate={navigate}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
