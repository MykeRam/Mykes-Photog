import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Header from './components/Header/Header'
import About from './components/About/About'
import Coding from './components/Coding/Coding'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import Photography from './components/Photography/Photography'
import ProjectDetail from './components/ProjectDetail/ProjectDetail'
import { projectBySlug } from './data/projects'
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
    ? document.getElementById('about')
    : section === 'coding'
      ? document.querySelector('#coding-title')
      : document.getElementById(section)
}

function getSectionScrollTop(section) {
  if (section === 'home') return 0

  const target = getSectionTarget(section)
  if (!target) return 0

  const headerHeight = getHeaderHeight()
  const targetTop = window.scrollY + target.getBoundingClientRect().top

  if (section === 'about') return Math.max(0, targetTop - headerHeight)
  if (section === 'coding') return Math.max(0, targetTop - headerHeight - 8)

  return Math.max(0, targetTop)
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
  if (path === '/coding' || path.startsWith('/coding/')) return 'coding'

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
  const [navigationAnnouncement, setNavigationAnnouncement] = useState('')
  const hasMountedRef = useRef(false)

  useLayoutEffect(() => {
    const hasManualScrollRestoration = 'scrollRestoration' in window.history
    const previousScrollRestoration = hasManualScrollRestoration
      ? window.history.scrollRestoration
      : undefined

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

  useEffect(() => {
    const shouldMoveFocus = hasMountedRef.current
    hasMountedRef.current = true

    if (currentPath === '/photography') {
      document.title = 'Photography | Michael Ramirez'
      return undefined
    }

    const project = currentPath.startsWith('/coding/')
      ? projectBySlug.get(currentPath.replace('/coding/', ''))
      : null
    const pageName = project?.name
      ? `${project.name} project`
      : currentSection === 'about'
        ? 'About'
        : currentSection === 'coding'
          ? 'Coding and projects'
          : 'Home'
    const headingSelector = project
      ? '#project-detail-title'
      : currentSection === 'about'
        ? '#about-title'
        : currentSection === 'coding'
          ? '#coding-title'
          : '#home-title'

    document.title =
      pageName === 'Home' ? 'Michael Ramirez | Software Engineer' : `${pageName} | Michael Ramirez`
    if (!shouldMoveFocus) return undefined

    setNavigationAnnouncement(`${pageName} section`)
    const frameId = window.requestAnimationFrame(() => {
      document.querySelector(headingSelector)?.focus({ preventScroll: true })
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [currentPath, currentSection])

  useEffect(() => {
    if (mainPageRoutes.has(currentPath)) return undefined

    const frameId = window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      })
    })

    return () => window.cancelAnimationFrame(frameId)
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

  const projectSlug = currentPath.startsWith('/coding/') ? currentPath.replace('/coding/', '') : ''
  const page = currentPath.startsWith('/coding/') ? (
    <ProjectDetail project={projectBySlug.get(projectSlug)} navigate={navigate} />
  ) : currentPath === '/photography' ? (
    <Photography onGridReadyChange={setIsPhotographyGridReady} />
  ) : (
    <>
      <Home sectionId="home" navigate={navigate} />
      <About sectionId="about" navigate={navigate} />
      <Coding
        sectionId="coding"
        isSectionTargeted={currentSection === 'coding'}
        navigate={navigate}
      />
    </>
  )

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {navigationAnnouncement}
      </div>
      <Header
        currentPath={currentPath}
        currentSection={mainPageRoutes.has(currentPath) ? activeSection : currentSection}
        navigate={navigate}
      />
      <main id="main-content" className="app-main" tabIndex={-1}>
        {page}
      </main>
      {isPageLoaded && (currentPath !== '/photography' || isPhotographyGridReady) ? (
        <Footer />
      ) : null}
    </div>
  )
}
