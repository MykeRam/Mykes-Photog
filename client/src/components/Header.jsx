import React from 'react'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="logo">
          <img src="/logo.png" alt="Myke logo" className="logo-img" />
        </div>
        <nav className="header-nav" aria-label="Main">
          <a href="#about">about</a>
          <a href="#coding">coding</a>
        </nav>
      </div>
    </header>
  )
}
