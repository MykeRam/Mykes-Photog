import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import './Coding.css'

const portfolioPreviewSrc = `${import.meta.env.BASE_URL}logo.png`
const wtwrPreviewSrc = `${import.meta.env.BASE_URL}wtwr-home.png`
const triplePeaksPreviewSrc = `${import.meta.env.BASE_URL}TriplePeaksLibrary.png`
const triplePeaksCoffeePreviewSrc = `${import.meta.env.BASE_URL}TriplePeaksCoffee.png`
const aboutMePreviewSrc = `${import.meta.env.BASE_URL}1stSiteMR.png`

const projectCards = [
  {
    id: 1,
    name: 'Personal Portfolio',
    description:
      'A responsive portfolio site that brings together my software engineering work and photography with custom motion, smooth section navigation, and a dedicated gallery experience.',
    stack:
      'React • React DOM • JavaScript • CSS • Motion • Vite • Vite Plugin React • Node.js • npm • GitHub Actions • Sharp',
    imageSrc: portfolioPreviewSrc,
    imageAlt: 'Preview of Myke portfolio project branding',
    imageLabel: 'Portfolio Project',
    imageClassName: 'coding-project-image--logo',
    liveHref: 'https://mykeram.github.io/Mykes-Photog/',
    githubHref: 'https://github.com/MykeRam/Mykes-Photog'
  },
  {
    id: 2,
    name: 'WTWR (What to Wear?)',
    description:
      'A React weather app that helps users choose clothing based on current conditions, recommends items for the forecast, and supports item preview modals for a more interactive experience.',
    stack:
      'React • JavaScript (ES6+) • CSS • BEM • Vite • OpenWeatherMap API • Conditional Rendering',
    imageSrc: wtwrPreviewSrc,
    imageAlt: 'Screenshot of the WTWR clothing recommendation application',
    githubHref: 'https://github.com/MykeRam/se_project_react'
  },
  {
    id: 3,
    name: 'Triple Peaks Library',
    description:
      'A library landing page built from a design brief as part of the TripleTen software engineering program, focused on clean structure, layout accuracy, and foundational front-end styling techniques.',
    stack: 'HTML5 • CSS • Semantic HTML • Flexbox • Positioning • Z-Index',
    imageSrc: triplePeaksPreviewSrc,
    imageAlt: 'Screenshot of the Triple Peaks Library webpage',
    liveHref: 'https://mykeram.github.io/TriplePeaksLibrary/',
    githubHref: 'https://github.com/MykeRam/TriplePeaksLibrary'
  },
  {
    id: 4,
    name: 'Triple Peaks Coffee Shop',
    description:
      'A coffee shop site built from a TripleTen design brief with a structured multi-section layout, custom form work, and motion-focused touches using CSS animation and transforms.',
    stack:
      'HTML5 • CSS • Semantic HTML • Flexbox • Positioning • BEM • Custom Forms • CSS Animation • Transform',
    imageSrc: triplePeaksCoffeePreviewSrc,
    imageAlt: 'Screenshot of the Triple Peaks Coffee Shop webpage',
    liveHref: 'https://mykeram.github.io/se_project_coffeeshop/#menu',
    githubHref: 'https://github.com/MykeRam/se_project_coffeeshop'
  },
  {
    id: 0,
    name: 'About Me',
    description:
      'A simple landing page created as the first demo project in the TripleTen software engineering program, focused on core page structure and foundational front-end layout work.',
    stack: 'HTML5 • CSS • Semantic HTML • Flexbox',
    imageSrc: aboutMePreviewSrc,
    imageAlt: 'Screenshot of the About Me landing page project',
    liveHref: 'https://mykeram.github.io/About-me-TT/',
    githubHref: 'https://github.com/MykeRam/About-me-TT'
  }
]

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

export default function Coding({ sectionId = 'coding' }) {
  const shouldReduceMotion = useReducedMotion()
  const [isResponsiveHoverEnabled, setIsResponsiveHoverEnabled] = useState(false)
  const [isResponsiveHovered, setIsResponsiveHovered] = useState(false)
  const headingRef = useRef(null)
  const isHeadingInView = useInView(headingRef, {
    amount: 0.6,
    margin: '0px 0px -18% 0px'
  })

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
              structure, and problem-solving. This section highlights my technical skills, the tools I work with,
              and the projects I&apos;ve built throughout my learning journey.
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
                type="button"
                className="coding-project-cue"
                onClick={scrollToProjects}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                animate={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 1, y: 0 }
                }
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 1.45,
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
                      : { y: [0, 6, 0], opacity: [0.65, 1, 0.65] }
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
              skills in modern web development. Each project reflects a different stage of my growth and
              highlights the tools, concepts, and problem-solving approaches used throughout the process.
            </p>

            <div className="coding-project-list">
              {projectCards.map((project, index) => (
                <motion.article
                  key={project.id}
                  className="coding-project-card"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.65,
                          delay: 0.12 + index * 0.18,
                          ease: [0.22, 1, 0.36, 1]
                        }
                  }
                >
                  <div
                    className={['coding-project-image', project.imageClassName].filter(Boolean).join(' ')}
                  >
                    {project.imageSrc ? (
                      <img src={project.imageSrc} alt={project.imageAlt || `${project.name} preview`} />
                    ) : (
                      <span aria-hidden="true">{project.imageLabel || 'Project image / screenshot'}</span>
                    )}
                  </div>

                  <div className="coding-project-body">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <p className="coding-project-stack">{project.stack}</p>

                    <div className="coding-project-links" aria-label={`${project.name} links`}>
                      {project.liveHref ? (
                        <a
                          className="coding-project-link"
                          href={project.liveHref}
                          target="_blank"
                          rel="noreferrer"
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
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
