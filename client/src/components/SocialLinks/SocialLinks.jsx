import React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import instagramIcon from '../../assets/social/IG.svg'
import threadsIcon from '../../assets/social/Threads.svg'
import twitchIcon from '../../assets/social/Twitch.svg'
import linkedinIcon from '../../assets/social/linkedin-icon.svg'
import mailIcon from '../../assets/social/mail-icon.svg'
import youtubeIcon from '../../assets/social/YT.svg'
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
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/michaelramirezz/',
    icon: linkedinIcon
  },
  {
    name: 'Email',
    href: 'mailto:me@myke.nyc',
    icon: mailIcon
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@q0dz',
    icon: youtubeIcon
  }
]

export default function SocialLinks({
  animateOnEnter = false,
  baseDelay = 0,
  stagger = 0.08,
  showVideoLinks = true,
  hiddenSocials = []
}) {
  const shouldReduceMotion = useReducedMotion()
  const visibleSocials = socials.filter(
    (social) =>
      !hiddenSocials.includes(social.name) &&
      (showVideoLinks || !['Twitch', 'YouTube'].includes(social.name))
  )

  return (
    <div className="social-links" aria-label="Social links">
      {visibleSocials.map((social, index) => (
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
