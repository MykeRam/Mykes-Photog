import React, { useEffect, useLayoutEffect, useState } from 'react'
import Header from './components/Header/Header'
import About from './components/About/About'
import Coding from './components/Coding/Coding'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import Photography from './components/Photography/Photography'
import { buildHash, getHashRoute, getHashSearchParams } from './lib/hashRoute'

const mainPageRoutes = new Set(['/', '/about', '/coding'])

function scrollToSection(section, behavior = 'smooth') {
  if (section === 'home') {
    window.scrollTo({
      top: 0,
      behavior
    })
    return
  }

  const target =
    section === 'about'
      ? document.querySelector('#about .about-sheet')
      : section === 'coding'
        ? document.querySelector('#coding .page-copy')
        : document.getElementById(section)

  if (!target) return

  const header = document.querySelector('.site-header')
  const headerHeight = header ? header.getBoundingClientRect().height : 0
  const targetTop = window.scrollY + target.getBoundingClientRect().top
  const nextTop =
    section === 'about' || section === 'coding'
      ? Math.max(0, targetTop - headerHeight - 8)
      : Math.max(0, targetTop)

  window.scrollTo({
    top: nextTop,
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

    window.addEventListener('load', scrollToTop)
    window.addEventListener('pageshow', scrollToTop)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('load', scrollToTop)
      window.removeEventListener('pageshow', scrollToTop)

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
        <About sectionId="about" />
        <Coding sectionId="coding" />
      </>
    )

  return (
    <div className="app-shell">
      <Header currentPath={currentPath} currentSection={currentSection} navigate={navigate} />
      <main className="app-main">{page}</main>
      {isPageLoaded && (currentPath !== '/photography' || isPhotographyGridReady) ? <Footer /> : null}
    </div>
  )
}
