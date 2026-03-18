import React, { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import './Coding.css'

const projectCards = [
  {
    id: 1,
    name: 'Project Name',
    description: 'Short one- or two-line description of what it is.',
    stack: 'React • JavaScript • CSS • Vite'
  },
  {
    id: 2,
    name: 'Project Name',
    description: 'Short one- or two-line description of what it is.',
    stack: 'React • JavaScript • CSS • Vite'
  },
  {
    id: 3,
    name: 'Project Name',
    description: 'Short one- or two-line description of what it is.',
    stack: 'React • JavaScript • CSS • Vite'
  }
]

export default function Coding({ sectionId = 'coding', cueTrigger = 0 }) {
  const shouldReduceMotion = useReducedMotion()
  const [isProjectCueVisible, setIsProjectCueVisible] = useState(shouldReduceMotion)
  const sectionRef = useRef(null)

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsProjectCueVisible(true)
      return undefined
    }

    if (!cueTrigger) return undefined

    setIsProjectCueVisible(false)

    const frameId = window.requestAnimationFrame(() => {
      setIsProjectCueVisible(true)
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [cueTrigger, shouldReduceMotion])

  useEffect(() => {
    if (shouldReduceMotion || isProjectCueVisible) return undefined

    let frameId = 0

    const checkCueThreshold = () => {
      const section = sectionRef.current
      const pageCopy = section?.querySelector('.page-copy')
      const header = document.querySelector('.site-header')

      if (!pageCopy) return

      const headerHeight = header ? header.getBoundingClientRect().height : 0
      const triggerTop = window.scrollY + pageCopy.getBoundingClientRect().top - headerHeight - 8

      if (window.scrollY >= triggerTop) {
        setIsProjectCueVisible(true)
      }
    }

    const onScroll = () => {
      window.cancelAnimationFrame(frameId)
      frameId = window.requestAnimationFrame(checkCueThreshold)
    }

    checkCueThreshold()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isProjectCueVisible, shouldReduceMotion])

  const scrollToProjects = () => {
    const projectsHeading = document.getElementById('coding-projects-title')
    if (!projectsHeading) return

    projectsHeading.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
      block: 'start'
    })
  }

  return (
    <section id={sectionId} ref={sectionRef} className="page-shell" aria-labelledby="coding-title">
      <div className="container">
        <div className="page-copy">
          <header className="coding-intro">
            <h2 id="coding-title" className="coding-intro-title">
              Building thoughtful, responsive experiences through software engineering.
            </h2>
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
                initial={false}
                animate={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : isProjectCueVisible
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 12 }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.9,
                        ease: [0.22, 1, 0.36, 1]
                      }
                }
              >
                <p>Projects</p>
                <motion.span
                  className="coding-project-cue-arrow"
                  animate={
                    shouldReduceMotion || !isProjectCueVisible
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
                  <div className="coding-project-image" aria-hidden="true">
                    <span>Project image / screenshot</span>
                  </div>

                  <div className="coding-project-body">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <p className="coding-project-stack">{project.stack}</p>

                    <div className="coding-project-links" aria-label={`${project.name} links`}>
                      <span className="coding-project-link">Live Demo</span>
                      <span className="coding-project-link">GitHub</span>
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
