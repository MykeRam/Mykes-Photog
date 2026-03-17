import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import About from './components/About/About'
import Coding from './components/Coding/Coding'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import { buildHash, getHashRoute } from './lib/hashRoute'

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => getHashRoute())
  const [isPageLoaded, setIsPageLoaded] = useState(() => document.readyState === 'complete')

  useEffect(() => {
    const onHashChange = () => setCurrentPath(getHashRoute())

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (document.readyState === 'complete') {
      setIsPageLoaded(true)
      return undefined
    }

    const onLoad = () => setIsPageLoaded(true)

    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  const navigate = (path) => {
    const nextPath = getHashRoute(path.startsWith('#') ? path : buildHash(path))

    if (nextPath === currentPath) return

    window.location.hash = buildHash(nextPath)
    setCurrentPath(nextPath)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const page = (() => {
    switch (currentPath) {
      case '/about':
        return <About />
      case '/coding':
        return <Coding />
      case '/':
      default:
        return <Home />
    }
  })()

  return (
    <div className="app-shell">
      <Header currentPath={currentPath} navigate={navigate} />
      <main className="app-main">{page}</main>
      {isPageLoaded ? <Footer /> : null}
    </div>
  )
}
