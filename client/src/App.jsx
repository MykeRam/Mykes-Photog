import React from 'react'
import Header from './components/Header'
import Gallery from './components/Gallery'

export default function App() {
  return (
    <div>
      <Header />
      <main className="gallery-wrap">
        <div className="container">
          <Gallery />
        </div>
      </main>
    </div>
  )
}
