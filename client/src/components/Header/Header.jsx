import React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import SocialLinks from '../SocialLinks/SocialLinks'
import { enterAnimation } from '../../lib/enterMotion'
import './Header.css'

function NavLink({ href, label, currentPath, navigate }) {
  const isActive = currentPath === href

  return (
    <a
      href={href}
      className={isActive ? 'is-active' : ''}
      aria-current={isActive ? 'page' : undefined}
      onClick={(event) => {
        event.preventDefault()
        navigate(href)
      }}
    >
      {label}
    </a>
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
            {...(!shouldReduceMotion ? enterAnimation(0.08, 0.85) : {})}
          >
            <img src="/myke_logo_vector_header.svg" alt="Myke logo" className="logo-img" />
          </motion.a>
        </div>
        <div className="header-actions">
          <SocialLinks animateOnEnter baseDelay={0.24} stagger={0.1} />
          <nav className="header-nav" aria-label="Main">
            <NavLink href="/about" label="about" currentPath={currentPath} navigate={navigate} />
            <NavLink href="/coding" label="coding" currentPath={currentPath} navigate={navigate} />
          </nav>
        </div>
      </div>
    </header>
  )
}
