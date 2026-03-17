import React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import SocialLinks from '../SocialLinks/SocialLinks'
import aboutPortrait from '../../images/full/about-portrait/000001550004-large.webp'
import { enterAnimation } from '../../lib/enterMotion'
import { buildHash } from '../../lib/hashRoute'
import './About.css'

export default function About() {
  const shouldReduceMotion = useReducedMotion()
  const favoriteCameraHref = buildHash('/', new URLSearchParams({ camera: 'Canon AF35ML' }))

  return (
    <section className="about-page" aria-labelledby="about-title">
      <h1 id="about-title" className="about-title-sr-only">
        About
      </h1>
      <div className="container">
        <div className="about-sheet">
          <div className="about-layout">
            <figure className="about-visual">
              <motion.div
                className="about-portrait-frame"
                {...(!shouldReduceMotion ? enterAnimation(0.18, 0.95) : {})}
              >
                <img
                  className="about-portrait-image"
                  src={aboutPortrait}
                  alt="Portrait"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
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

              <a className="about-link" href={favoriteCameraHref}>
                Browse photos I took with my favorite camera
              </a>

              <div className="about-follow-prompt">
                <p>Keep up with me here</p>
                <div className="about-follow-arrows" aria-hidden="true">
                  <span>&darr;</span>
                  <span>&darr;</span>
                  <span>&darr;</span>
                </div>
              </div>

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
