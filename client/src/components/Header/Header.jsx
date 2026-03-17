import React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import SocialLinks from '../SocialLinks/SocialLinks'
import { enterAnimation } from '../../lib/enterMotion'
import { buildHash, getHashRoute, getHashSearchParams } from '../../lib/hashRoute'
import './Header.css'

const headerLogoSrc = `${import.meta.env.BASE_URL}myke_logo_vector_header.svg`

function NavLink({ href, label, currentPath, currentSection, navigate, motionProps }) {
  const routeHref = getHashRoute(href)
  const sectionHref = getHashSearchParams(href).get('section')
  const isActive =
    routeHref === '/photography'
      ? currentPath === '/photography'
      : currentPath !== '/photography' && currentSection === (sectionHref || 'home')

  return (
    <motion.a
      href={href}
      className={isActive ? 'is-active' : ''}
      aria-current={isActive ? 'page' : undefined}
      onClick={(event) => {
        event.preventDefault()
        navigate(href)
      }}
      {...motionProps}
    >
      {label}
    </motion.a>
  )
}

export default function Header({ currentPath, currentSection, navigate }) {
  const shouldReduceMotion = useReducedMotion()
  const homeHref = buildHash('/', new URLSearchParams({ section: 'home' }))
  const aboutHref = buildHash('/', new URLSearchParams({ section: 'about' }))
  const codingHref = buildHash('/', new URLSearchParams({ section: 'coding' }))
  const photographyHref = buildHash('/photography')

  return (
    <header className="site-header">
      <div className="container">
        <div className="logo">
          <motion.a
            href={homeHref}
            onClick={(event) => {
              event.preventDefault()
              navigate(homeHref)
            }}
            aria-label="Go to home page"
            {...(!shouldReduceMotion ? enterAnimation(0.08, 1.2) : {})}
          >
            <img src={headerLogoSrc} alt="Myke logo" className="logo-img" />
          </motion.a>
        </div>
        <div className="header-actions">
          <SocialLinks animateOnEnter baseDelay={0.24} stagger={0.1} />
          <nav className="header-nav" aria-label="Main">
            <NavLink
              href={homeHref}
              label="home"
              currentPath={currentPath}
              currentSection={currentSection}
              navigate={navigate}
              motionProps={
                !shouldReduceMotion
                  ? {
                      initial: { opacity: 0, y: -14 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.6, delay: 0.56, ease: [0.22, 1, 0.36, 1] }
                    }
                  : undefined
              }
            />
            <NavLink
              href={aboutHref}
              label="about"
              currentPath={currentPath}
              currentSection={currentSection}
              navigate={navigate}
              motionProps={
                !shouldReduceMotion
                  ? {
                      initial: { opacity: 0, y: 14 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.6, delay: 0.68, ease: [0.22, 1, 0.36, 1] }
                    }
                  : undefined
              }
            />
            <NavLink
              href={codingHref}
              label="coding"
              currentPath={currentPath}
              currentSection={currentSection}
              navigate={navigate}
              motionProps={
                !shouldReduceMotion
                  ? {
                      initial: { opacity: 0, y: -14 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }
                    }
                  : undefined
              }
            />
            <NavLink
              href={photographyHref}
              label="photography"
              currentPath={currentPath}
              currentSection={currentSection}
              navigate={navigate}
              motionProps={
                !shouldReduceMotion
                  ? {
                      initial: { opacity: 0, y: 14 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.6, delay: 0.92, ease: [0.22, 1, 0.36, 1] }
                    }
                  : undefined
              }
            />
          </nav>
        </div>
      </div>
    </header>
  )
}
