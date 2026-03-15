import React from 'react'
import SocialLinks from '../SocialLinks/SocialLinks'
import './About.css'

export default function About() {
  return (
    <section className="about-page" aria-labelledby="about-title">
      <h1 id="about-title" className="about-title-sr-only">
        About
      </h1>
      <div className="container">
        <div className="about-sheet">
          <div className="about-layout">
            <figure className="about-visual">
              <div className="about-portrait-frame" aria-label="Portrait placeholder">
                <div className="about-portrait-placeholder">
                  <span>Add your portrait here</span>
                </div>
              </div>
            </figure>

            <div className="about-story">
              <p className="about-intro">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis
                dapibus posuere velit aliquet.
              </p>

              <div className="about-divider" aria-hidden="true" />

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel
                scelerisque nisl consectetur et. Donec ullamcorper nulla non metus auctor fringilla.
              </p>

              <p>
                Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum.
                Sed posuere consectetur est at lobortis.
              </p>

              <p>Maecenas faucibus mollis interdum. Vivamus sagittis lacus vel augue laoreet rutrum.</p>

              <a className="about-link" href="/">
                Browse gallery
              </a>

              <div className="about-socials">
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
