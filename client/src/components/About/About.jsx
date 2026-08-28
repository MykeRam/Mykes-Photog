import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import SocialLinks from '../SocialLinks/SocialLinks'
import aboutPortrait from '../../images/full/about-portrait/000001550004-large.webp'
import { buildHash } from '../../lib/hashRoute'
import './About.css'

const aboutParagraphs = [
  "Hi, I'm Michael Ramirez, a New York City-based junior software engineer completing TripleTen's Software Engineering program.",
  'I build responsive front-end and full-stack products with React, TypeScript, Node.js, and PostgreSQL. I care about the details behind a good experience: clear information, reliable data flows, accessible interfaces, and code that another developer can understand.',
  "My work as a flight attendant shaped how I approach engineering. It taught me to stay calm under pressure, adapt quickly, communicate with people from every background, and take responsibility for the small details that keep a larger system running.",
  'Photography remains part of how I see and design, but this portfolio is focused on the software products I am building and the engineering career I am working toward.'
]

const typingSpeedMs = 9

export default function About({ sectionId = 'about', followTrigger = 0, navigate }) {
  const aboutRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(aboutRef, { once: true, amount: 0.3 })
  const [isMobileView, setIsMobileView] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(max-width: 640px)').matches
  })
  const favoriteCameraHref = buildHash('/photography', new URLSearchParams({ camera: 'Canon AF35ML' }))
  const [visibleCharacters, setVisibleCharacters] = useState(() =>
    shouldReduceMotion ? aboutParagraphs.join('').length : 0
  )
  const [hasReachedMobileFollowTarget, setHasReachedMobileFollowTarget] = useState(() => shouldReduceMotion)
  const totalCharacters = useMemo(
    () => aboutParagraphs.reduce((sum, paragraph) => sum + paragraph.length, 0),
    []
  )

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mediaQuery = window.matchMedia('(max-width: 640px)')
    const syncViewport = (event) => {
      setIsMobileView(event.matches)
    }

    setIsMobileView(mediaQuery.matches)
    mediaQuery.addEventListener('change', syncViewport)

    return () => mediaQuery.removeEventListener('change', syncViewport)
  }, [])

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

  useEffect(() => {
    if (shouldReduceMotion) {
      setHasReachedMobileFollowTarget(true)
      return
    }

    if (!isMobileView) return

    if (followTrigger > 0) {
      setHasReachedMobileFollowTarget(true)
    }
  }, [followTrigger, isMobileView, shouldReduceMotion])

  useEffect(() => {
    if (shouldReduceMotion || !isMobileView) return undefined

    const updateMobileFollowTarget = () => {
      const aboutSheet = aboutRef.current?.querySelector('.about-sheet')
      const header = document.querySelector('.site-header')
      if (!aboutSheet || !header) return

      const headerHeight = header.getBoundingClientRect().height
      const targetTop = window.scrollY + aboutSheet.getBoundingClientRect().top - headerHeight - 8

      if (window.scrollY >= targetTop - 2) {
        setHasReachedMobileFollowTarget(true)
      }
    }

    updateMobileFollowTarget()
    window.addEventListener('scroll', updateMobileFollowTarget, { passive: true })
    window.addEventListener('resize', updateMobileFollowTarget)

    return () => {
      window.removeEventListener('scroll', updateMobileFollowTarget)
      window.removeEventListener('resize', updateMobileFollowTarget)
    }
  }, [isMobileView, shouldReduceMotion])

  let characterCursor = 0
  const visibleParagraphs = aboutParagraphs.map((paragraph) => {
    const shown = Math.max(0, Math.min(paragraph.length, visibleCharacters - characterCursor))
    characterCursor += paragraph.length
    return paragraph.slice(0, shown)
  })
  const isTypingComplete = visibleCharacters >= totalCharacters
  const shouldShowFollowPrompt = shouldReduceMotion
    ? true
    : isMobileView
      ? hasReachedMobileFollowTarget
      : isTypingComplete

  const renderTypedParagraph = (paragraph, visibleText, className = '') => (
    <p className={className ? `${className} about-typed-line` : 'about-typed-line'}>
      <span className="sr-only">{paragraph}</span>
      <span className="about-typed-measure" aria-hidden="true">
        {paragraph}
      </span>
      <span className="about-typed-overlay" aria-hidden="true">{visibleText}</span>
    </p>
  )

  return (
    <section id={sectionId} ref={aboutRef} className="about-page" aria-labelledby="about-title">
      <h2 id="about-title" className="about-title-sr-only" tabIndex={-1}>
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
                  alt="Portrait of Michael Ramirez"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>

              <motion.div
                className="about-visual-follow"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={
                  shouldShowFollowPrompt
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 10 }
                }
                transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="about-follow-prompt">
                  <p>Connect with me</p>
                  <div className="about-follow-arrows" aria-hidden="true">
                    <span>&darr;</span>
                    <span>&darr;</span>
                    <span>&darr;</span>
                  </div>
                </div>

                <motion.div
                  className="about-socials"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={
                    shouldShowFollowPrompt
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  transition={{ duration: 0.45, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                >
                  <SocialLinks
                    animateOnEnter
                    baseDelay={0.28}
                    stagger={0.1}
                    hiddenSocials={['Instagram', 'Threads', 'Twitch', 'YouTube']}
                  />
                </motion.div>
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
                onClick={(event) => {
                  if (!navigate) return

                  event.preventDefault()
                  navigate(favoriteCameraHref)
                }}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={
                  shouldReduceMotion || isTypingComplete
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 10 }
                }
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                Visit my separate photography work
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
