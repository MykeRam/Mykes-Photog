import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import About from './components/About/About'
import Coding from './components/Coding/Coding'
import Home from './components/Home/Home'
import { normalizeRoute, withBase } from './lib/routes'

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizeRoute(window.location.pathname))

  useEffect(() => {
    const onPopState = () => setCurrentPath(normalizeRoute(window.location.pathname))

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (path) => {
    const nextPath = normalizeRoute(path)

    if (nextPath === currentPath) return

    window.history.pushState({}, '', withBase(nextPath))
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
    <div>
      <Header currentPath={currentPath} navigate={navigate} />
      <main>{page}</main>
    </div>
  )
}
