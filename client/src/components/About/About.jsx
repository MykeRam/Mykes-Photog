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
                Hi, I&apos;m Myke - a photographer, TripleTen software engineering student, and flight attendant
                living in New York City and working out of Philadelphia.
              </p>

              <div className="about-divider" aria-hidden="true" />

              <p>
                My interests live at the intersection of creativity and discipline, where visual storytelling
                and technical problem-solving come together. Photography allows me to capture mood, emotion, and
                perspective, while software engineering gives me the tools to build thoughtful, engaging digital
                experiences.
              </p>

              <p>
                Working as a flight attendant has also shaped the way I move through the world. It&apos;s taught
                me adaptability, attention to detail, and how to connect with people from all walks of life.
                Those experiences continue to influence both the way I create and the future I&apos;m building in
                tech.
              </p>

              <p>
                This space brings those worlds together - a place to share my photography, my projects, and the
                path I&apos;m creating for myself.
              </p>

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
