import React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import instagramIcon from '../../assets/social/IG.svg.svg'
import threadsIcon from '../../assets/social/Threads.svg.svg'
import twitchIcon from '../../assets/social/Twitch.svg.svg'
import youtubeIcon from '../../assets/social/YT.svg.svg'
import { enterAnimation } from '../../lib/enterMotion'
import './SocialLinks.css'

const socials = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/myy.ke',
    icon: instagramIcon
  },
  {
    name: 'Threads',
    href: 'https://threads.net/@myy.ke',
    icon: threadsIcon
  },
  {
    name: 'Twitch',
    href: 'https://twitch.tv/q0dzz',
    icon: twitchIcon
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@q0dz',
    icon: youtubeIcon
  }
]

export default function SocialLinks({ animateOnEnter = false, baseDelay = 0, stagger = 0.08 }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="social-links" aria-label="Social links">
      {socials.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.href}
          className="social-link"
          target="_blank"
          rel="noreferrer"
          aria-label={social.name}
          title={social.name}
          {...(animateOnEnter && !shouldReduceMotion ? enterAnimation(baseDelay + index * stagger) : {})}
        >
          <img src={social.icon} alt="" />
        </motion.a>
      ))}
    </div>
  )
}
