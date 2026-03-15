import React from 'react'
import './About.css'

export default function About() {
  return (
    <section className="page-shell" aria-labelledby="about-title">
      <div className="container">
        <div className="page-copy">
          <p className="page-eyebrow">About</p>
          <h1 id="about-title">Film frames, quiet moments, and everyday texture.</h1>
          <p>
            Myke&apos;s Photog is a running collection of 35mm experiments, street details, and the kinds of
            scenes that feel easy to miss until they are frozen in a frame.
          </p>
          <p>
            The goal is simple: keep the work front and center, make it easy to browse, and let each set speak
            for itself without a lot of noise around it.
          </p>
        </div>
      </div>
    </section>
  )
}
