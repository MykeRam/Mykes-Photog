import React, { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import SocialLinks from '../SocialLinks/SocialLinks'
import { enterAnimation } from '../../lib/enterMotion'
import { buildHash, getHashRoute, getHashSearchParams } from '../../lib/hashRoute'
import './Header.css'

const headerLogoSrc = `${import.meta.env.BASE_URL}myke_logo_vector_header.svg`
const underlineRevealDelayMs = 5000

function NavLink({ href, label, currentPath, currentSection, navigate, motionProps, linkRef }) {
  const routeHref = getHashRoute(href)
  const sectionHref = getHashSearchParams(href).get('section')
  const isActive =
    routeHref === '/photography'
      ? currentPath === '/photography'
      : currentPath !== '/photography' && currentSection === (sectionHref || 'home')

  return (
    <motion.a
      ref={linkRef}
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
  const navRef = useRef(null)
  const linkRefs = useRef(new Map())
  const [underlineStyle, setUnderlineStyle] = useState({ x: 0, width: 0, opacity: 0 })
  const [isUnderlineReady, setIsUnderlineReady] = useState(() => shouldReduceMotion)
  const homeHref = buildHash('/', new URLSearchParams({ section: 'home' }))
  const aboutHref = buildHash('/', new URLSearchParams({ section: 'about' }))
  const codingHref = buildHash('/', new URLSearchParams({ section: 'coding' }))
  const photographyHref = buildHash('/photography')
  const activeKey = currentPath === '/photography' ? 'photography' : currentSection

  useLayoutEffect(() => {
    if (shouldReduceMotion) {
      setIsUnderlineReady(true)
      return undefined
    }

    const timerId = window.setTimeout(() => {
      setIsUnderlineReady(true)
    }, underlineRevealDelayMs)

    return () => window.clearTimeout(timerId)
  }, [shouldReduceMotion])

  useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav) return undefined

    const measureUnderline = () => {
      const activeLink = linkRefs.current.get(activeKey)

      if (!activeLink) {
        setUnderlineStyle((current) => ({ ...current, opacity: 0 }))
        return
      }

      const navBounds = nav.getBoundingClientRect()
      const linkBounds = activeLink.getBoundingClientRect()

      setUnderlineStyle({
        x: linkBounds.left - navBounds.left,
        width: linkBounds.width,
        opacity: 1
      })
    }

    const frameId = window.requestAnimationFrame(measureUnderline)
    const resizeObserver =
      typeof ResizeObserver === 'function'
        ? new ResizeObserver(() => {
            measureUnderline()
          })
        : null

    resizeObserver?.observe(nav)
    linkRefs.current.forEach((link) => resizeObserver?.observe(link))
    window.addEventListener('resize', measureUnderline)

    return () => {
      window.cancelAnimationFrame(frameId)
      resizeObserver?.disconnect()
      window.removeEventListener('resize', measureUnderline)
    }
  }, [activeKey])

  const registerLink = (key) => (node) => {
    if (node) {
      linkRefs.current.set(key, node)
      return
    }

    linkRefs.current.delete(key)
  }

  const animatedUnderlineStyle = isUnderlineReady
    ? underlineStyle
    : {
        x: underlineStyle.x,
        width: 0,
        opacity: 0
      }

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
          <SocialLinks
            animateOnEnter
            baseDelay={0.24}
            stagger={0.1}
            showVideoLinks={false}
            hiddenSocials={['Instagram', 'Threads']}
          />
          <nav ref={navRef} className="header-nav" aria-label="Main">
            <NavLink
              href={homeHref}
              label="home"
              currentPath={currentPath}
              currentSection={currentSection}
              navigate={navigate}
              linkRef={registerLink('home')}
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
              linkRef={registerLink('about')}
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
              linkRef={registerLink('coding')}
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
              linkRef={registerLink('photography')}
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
            <motion.span
              className="header-nav-underline"
              aria-hidden="true"
              initial={false}
              animate={animatedUnderlineStyle}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
              }
            />
          </nav>
        </div>
      </div>
    </header>
  )
}
