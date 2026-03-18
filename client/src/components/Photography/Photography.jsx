import React from 'react'
import Gallery from '../Gallery/Gallery'
import './Photography.css'

export default function Photography({ onGridReadyChange }) {
  return (
    <section className="photography-page" aria-label="Photography">
      <div className="container">
        <Gallery onGridReadyChange={onGridReadyChange} />
      </div>
    </section>
  )
}
