import React from 'react'
import instagramIcon from '../assets/social/IG.svg.svg'
import threadsIcon from '../assets/social/Threads.svg.svg'
import twitchIcon from '../assets/social/Twitch.svg.svg'
import youtubeIcon from '../assets/social/YT.svg.svg'

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

export default function SocialLinks() {
  return (
    <div className="social-links" aria-label="Social links">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.href}
          className="social-link"
          target="_blank"
          rel="noreferrer"
          aria-label={social.name}
          title={social.name}
        >
          <img src={social.icon} alt="" />
        </a>
      ))}
    </div>
  )
}
