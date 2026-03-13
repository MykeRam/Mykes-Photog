import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import About from './components/About'
import Coding from './components/Coding'
import Home from './components/Home'

function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/'
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname))

  useEffect(() => {
    const onPopState = () => setCurrentPath(normalizePath(window.location.pathname))

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (path) => {
    const nextPath = normalizePath(path)

    if (nextPath === currentPath) return

    window.history.pushState({}, '', nextPath)
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
