import { motion, useReducedMotion } from 'motion/react'
import { buildHash } from '../../lib/hashRoute'
import './Home.css'

const selectedWork = [
  {
    name: 'NextStep',
    label: 'Full-stack job application tracker',
    slug: 'nextstep'
  },
  {
    name: 'Color Dash',
    label: 'Shared leaderboard game',
    slug: 'color-dash'
  },
  {
    name: 'Film Roll Tracker',
    label: 'Authenticated PostgreSQL dashboard',
    slug: 'film-roll-tracker'
  }
]

const homeEntryDelay = 1.35
const homeCopyDuration = 1.25
const homeWorkDelay = homeEntryDelay + homeCopyDuration

export default function Home({ sectionId = 'home', navigate }) {
  const shouldReduceMotion = useReducedMotion()
  const projectsHref = buildHash('/', new URLSearchParams({ section: 'coding' }))

  const handleInternalNavigation = (href) => (event) => {
    if (!navigate) return

    event.preventDefault()
    navigate(href)
  }

  return (
    <section id={sectionId} className="home-page" aria-labelledby="home-title">
      <div className="container">
        <div className="home-hero">
          <motion.header
            className="home-copy"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: homeCopyDuration, delay: homeEntryDelay, ease: 'easeOut' }
            }
          >
            <p className="home-eyebrow">
              Michael Ramirez <span aria-hidden="true">•</span> New York City
            </p>
            <h1 id="home-title" className="home-title" tabIndex={-1}>
              Software engineer building polished, accessible products.
            </h1>
            <p className="home-summary">
              I build responsive front-end and full-stack applications with React, TypeScript,
              Node.js, and PostgreSQL, combining reliable engineering with an eye for intuitive
              product design.
            </p>

            <div className="home-availability">
              Software Engineering student completing TripleTen&apos;s program · Open to junior
              frontend and full-stack roles
            </div>

            <div className="home-actions" aria-label="Portfolio actions">
              <a
                className="home-action home-action--primary"
                href={projectsHref}
                onClick={handleInternalNavigation(projectsHref)}
              >
                View projects
              </a>
              <a
                className="home-action home-action--secondary"
                href={`${import.meta.env.BASE_URL}latest_michael_ramirez_resume.pdf`}
                download="Michael-Ramirez-Resume.pdf"
              >
                Resume
              </a>
              <a
                className="home-action home-action--secondary"
                href="https://github.com/MykeRam"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a className="home-action home-action--text" href="mailto:me@myke.nyc">
                Email me <span aria-hidden="true">↗</span>
              </a>
            </div>
          </motion.header>

          <motion.aside
            className="home-work-panel"
            aria-labelledby="home-work-title"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 72 }}
            animate={{ opacity: 1, x: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 1.35, delay: homeWorkDelay, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <div className="home-work-heading">
              <p id="home-work-title">Selected work</p>
              <span>Frontend + full stack</span>
            </div>

            <ol className="home-work-list">
              {selectedWork.map((project, index) => {
                const projectHref = buildHash(`/coding/${project.slug}`)

                return (
                  <li key={project.slug}>
                    <a href={projectHref} onClick={handleInternalNavigation(projectHref)}>
                      <span className="home-work-number">0{index + 1}</span>
                      <span className="home-work-copy">
                        <strong>{project.name}</strong>
                        <span>{project.label}</span>
                      </span>
                      <span className="home-work-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </li>
                )
              })}
            </ol>

            <div className="home-work-footer">
              <span>React</span>
              <span>TypeScript</span>
              <span>PostgreSQL</span>
              <span>Testing</span>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
