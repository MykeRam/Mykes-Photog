import React from 'react'
import Gallery from '../Gallery/Gallery'
import './Photography.css'

export default function Photography() {
  return (
    <section className="photography-page" aria-label="Photography">
      <div className="container">
        <Gallery />
      </div>
    </section>
  )
}
