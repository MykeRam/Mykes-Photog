import React from 'react'
import SocialLinks from './SocialLinks'

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
  return (
    <header className="site-header">
      <div className="container">
        <div className="logo">
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault()
              navigate('/')
            }}
            aria-label="Go to home page"
          >
            <img src="/logo.png" alt="Myke logo" className="logo-img" />
          </a>
        </div>
        <div className="header-actions">
          <SocialLinks />
          <nav className="header-nav" aria-label="Main">
            <NavLink href="/about" label="about" currentPath={currentPath} navigate={navigate} />
            <NavLink href="/coding" label="coding" currentPath={currentPath} navigate={navigate} />
          </nav>
        </div>
      </div>
    </header>
  )
}
