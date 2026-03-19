import React, { useEffect, useLayoutEffect, useState } from 'react'
import Header from './components/Header/Header'
import About from './components/About/About'
import Coding from './components/Coding/Coding'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import Photography from './components/Photography/Photography'
import { buildHash, getHashRoute, getHashSearchParams } from './lib/hashRoute'

const mainPageRoutes = new Set(['/', '/about', '/coding'])
const activeSectionLeadPx = 96

function getHeaderHeight() {
  const header = document.querySelector('.site-header')
  return header ? header.getBoundingClientRect().height : 0
}

function getSectionTarget(section) {
  if (section === 'home') return null

  return section === 'about'
    ? document.querySelector('#about .about-sheet')
    : section === 'coding'
      ? document.querySelector('#coding .page-copy')
      : document.getElementById(section)
}

function getSectionScrollTop(section) {
  if (section === 'home') return 0

  const target = getSectionTarget(section)
  if (!target) return 0

  const headerHeight = getHeaderHeight()
  const targetTop = window.scrollY + target.getBoundingClientRect().top

  return section === 'about' || section === 'coding'
    ? Math.max(0, targetTop - headerHeight - 8)
    : Math.max(0, targetTop)
}

function scrollToSection(section, behavior = 'smooth') {
  if (section === 'home') {
    window.scrollTo({
      top: 0,
      behavior
    })
    return
  }

  window.scrollTo({
    top: getSectionScrollTop(section),
    behavior
  })
}

function getCurrentSection(path = getHashRoute(), hash = window.location.hash) {
  if (path === '/about') return 'about'
  if (path === '/coding') return 'coding'

  const section = getHashSearchParams(hash).get('section')
  return section === 'about' || section === 'coding' ? section : 'home'
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => getHashRoute())
  const [currentSection, setCurrentSection] = useState(() => getCurrentSection())
  const [activeSection, setActiveSection] = useState(() => getCurrentSection())
  const [isPageLoaded, setIsPageLoaded] = useState(() => document.readyState === 'complete')
  const [hasHandledInitialScroll, setHasHandledInitialScroll] = useState(false)
  const [isPhotographyGridReady, setIsPhotographyGridReady] = useState(false)

  useLayoutEffect(() => {
    const hasManualScrollRestoration = 'scrollRestoration' in window.history
    const previousScrollRestoration = hasManualScrollRestoration ? window.history.scrollRestoration : undefined

    if (hasManualScrollRestoration) {
      window.history.scrollRestoration = 'manual'
    }

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      })
    }

    scrollToTop()

    const frameId = window.requestAnimationFrame(() => {
      scrollToTop()
      setHasHandledInitialScroll(true)
    })

    return () => {
      window.cancelAnimationFrame(frameId)

      if (hasManualScrollRestoration && previousScrollRestoration) {
        window.history.scrollRestoration = previousScrollRestoration
      }
    }
  }, [])

  useEffect(() => {
    const onHashChange = () => {
      const nextPath = getHashRoute()
      setCurrentPath(nextPath)
      setCurrentSection(getCurrentSection(nextPath))
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (!mainPageRoutes.has(currentPath) || !hasHandledInitialScroll) return undefined

    let frameId = 0
    let isTicking = false

    const updateActiveSection = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0
      const aboutTop = getSectionScrollTop('about')
      const codingTop = getSectionScrollTop('coding')
      const nextSection =
        scrollTop >= codingTop - activeSectionLeadPx
          ? 'coding'
          : scrollTop >= aboutTop - activeSectionLeadPx
            ? 'about'
            : 'home'

      setActiveSection((current) => (current === nextSection ? current : nextSection))
      isTicking = false
    }

    const requestSectionUpdate = () => {
      if (isTicking) return

      isTicking = true
      frameId = window.requestAnimationFrame(updateActiveSection)
    }

    requestSectionUpdate()
    window.addEventListener('scroll', requestSectionUpdate, { passive: true })
    window.addEventListener('resize', requestSectionUpdate)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', requestSectionUpdate)
      window.removeEventListener('resize', requestSectionUpdate)
    }
  }, [currentPath, hasHandledInitialScroll])

  useEffect(() => {
    if (!mainPageRoutes.has(currentPath)) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const frameId = window.requestAnimationFrame(() => {
      if (!hasHandledInitialScroll) return

      scrollToSection(currentSection, prefersReducedMotion ? 'auto' : 'smooth')
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [currentPath, currentSection, hasHandledInitialScroll])

  useEffect(() => {
    if (document.readyState === 'complete') {
      setIsPageLoaded(true)
      return undefined
    }

    const onLoad = () => setIsPageLoaded(true)

    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  useEffect(() => {
    if (currentPath === '/photography') {
      setIsPhotographyGridReady(false)
    }
  }, [currentPath])

  const navigate = (path) => {
    const nextHash = path.startsWith('#') ? path : buildHash(path)
    const nextPath = getHashRoute(nextHash)
    const nextSection = getCurrentSection(nextPath, nextHash)

    if (window.location.hash === nextHash) {
      if (mainPageRoutes.has(nextPath)) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        scrollToSection(nextSection, prefersReducedMotion ? 'auto' : 'smooth')
      }

      return
    }

    setCurrentPath(nextPath)
    setCurrentSection(nextSection)
    window.location.hash = nextHash
  }

  const page =
    currentPath === '/photography' ? (
      <Photography onGridReadyChange={setIsPhotographyGridReady} />
    ) : (
      <>
        <Home sectionId="home" />
        <About sectionId="about" navigate={navigate} />
        <Coding sectionId="coding" />
      </>
    )

  return (
    <div className="app-shell">
      <Header currentPath={currentPath} currentSection={activeSection} navigate={navigate} />
      <main className="app-main">{page}</main>
      {isPageLoaded && (currentPath !== '/photography' || isPhotographyGridReady) ? <Footer /> : null}
    </div>
  )
}
