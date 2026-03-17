import React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import SocialLinks from '../SocialLinks/SocialLinks'
import { enterAnimation } from '../../lib/enterMotion'
import './Header.css'

const headerLogoSrc = `${import.meta.env.BASE_URL}myke_logo_vector_header.svg`

function NavLink({ href, label, currentPath, navigate, motionProps }) {
  const isActive = currentPath === href

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

export default function Header({ currentPath, navigate }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <header className="site-header">
      <div className="container">
        <div className="logo">
          <motion.a
            href="/"
            onClick={(event) => {
              event.preventDefault()
              navigate('/')
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
              href="/about"
              label="about"
              currentPath={currentPath}
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
              href="/coding"
              label="coding"
              currentPath={currentPath}
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
          </nav>
        </div>
      </div>
    </header>
  )
}
