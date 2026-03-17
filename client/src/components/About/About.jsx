import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import SocialLinks from '../SocialLinks/SocialLinks'
import aboutPortrait from '../../images/full/about-portrait/000001550004-large.webp'
import { buildHash } from '../../lib/hashRoute'
import './About.css'

const aboutParagraphs = [
  "Hi, I'm Myke - a photographer, TripleTen software engineering student, and flight attendant living in New York City and working out of Philadelphia.",
  'My interests live at the intersection of creativity and discipline, where visual storytelling and technical problem-solving come together. Photography allows me to capture mood, emotion, and perspective, while software engineering gives me the tools to build thoughtful, engaging digital experiences.',
  "Working as a flight attendant has also shaped the way I move through the world. It's taught me adaptability, attention to detail, and how to connect with people from all walks of life. Those experiences continue to influence both the way I create and the future I'm building in tech.",
  "This space brings those worlds together - a place to share my photography, my projects, and the path I'm creating for myself."
]

const typingSpeedMs = 9

export default function About({ sectionId = 'about' }) {
  const aboutRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(aboutRef, { once: true, amount: 0.3 })
  const favoriteCameraHref = buildHash('/photography', new URLSearchParams({ camera: 'Canon AF35ML' }))
  const [visibleCharacters, setVisibleCharacters] = useState(() =>
    shouldReduceMotion ? aboutParagraphs.join('').length : 0
  )
  const totalCharacters = useMemo(
    () => aboutParagraphs.reduce((sum, paragraph) => sum + paragraph.length, 0),
    []
  )

  useEffect(() => {
    if (shouldReduceMotion) {
      setVisibleCharacters(totalCharacters)
      return undefined
    }

    if (!isInView || visibleCharacters >= totalCharacters) return undefined

    const timerId = window.setInterval(() => {
      setVisibleCharacters((current) => {
        if (current >= totalCharacters) {
          window.clearInterval(timerId)
          return current
        }

        const next = current + 3
        return next > totalCharacters ? totalCharacters : next
      })
    }, typingSpeedMs)

    return () => window.clearInterval(timerId)
  }, [isInView, shouldReduceMotion, totalCharacters, visibleCharacters])

  let characterCursor = 0
  const visibleParagraphs = aboutParagraphs.map((paragraph) => {
    const shown = Math.max(0, Math.min(paragraph.length, visibleCharacters - characterCursor))
    characterCursor += paragraph.length
    return paragraph.slice(0, shown)
  })
  const isTypingComplete = visibleCharacters >= totalCharacters

  const renderTypedParagraph = (paragraph, visibleText, className = '') => (
    <p className={className ? `${className} about-typed-line` : 'about-typed-line'}>
      <span className="about-typed-measure" aria-hidden="true">
        {paragraph}
      </span>
      <span className="about-typed-overlay">{visibleText}</span>
    </p>
  )

  return (
    <section id={sectionId} ref={aboutRef} className="about-page" aria-labelledby="about-title">
      <h2 id="about-title" className="about-title-sr-only">
        About
      </h2>
      <div className="container">
        <div className="about-sheet">
          <div className="about-layout">
            <figure className="about-visual">
              <motion.div
                className="about-portrait-frame"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 26, scale: 0.97 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        duration: 1.35,
                        delay: 0.08,
                        ease: [0.22, 1, 0.36, 1]
                      }
                }
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
              {renderTypedParagraph(aboutParagraphs[0], visibleParagraphs[0], 'about-intro')}

              <div className="about-divider" aria-hidden="true" />

              {renderTypedParagraph(aboutParagraphs[1], visibleParagraphs[1])}

              {renderTypedParagraph(aboutParagraphs[2], visibleParagraphs[2])}

              {renderTypedParagraph(aboutParagraphs[3], visibleParagraphs[3])}

              <motion.a
                className="about-link"
                href={favoriteCameraHref}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={
                  shouldReduceMotion || isTypingComplete
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 10 }
                }
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                Browse photos I took with my favorite camera
              </motion.a>

              <motion.div
                className="about-follow-prompt"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={
                  shouldReduceMotion || isTypingComplete
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 10 }
                }
                transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <p>Keep up with me here</p>
                <div className="about-follow-arrows" aria-hidden="true">
                  <span>&darr;</span>
                  <span>&darr;</span>
                  <span>&darr;</span>
                </div>
              </motion.div>

              <motion.div
                className="about-socials"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={
                  shouldReduceMotion || isTypingComplete
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 10 }
                }
                transition={{ duration: 0.45, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              >
                <SocialLinks />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
