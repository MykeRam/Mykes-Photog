const assetSrc = (path) => `${import.meta.env.BASE_URL}${path}`
const projectAssetSrc = (projectFolder, fileName) => assetSrc(`projects/${projectFolder}/${fileName}`)

export const projectCards = [
  {
    id: 7,
    slug: 'film-roll-tracker',
    name: 'Film Roll Tracker',
    description:
      'A full-stack film photography tracking app for logging rolls, cameras, lenses, film stocks, ISO, development status, notes, uploads, and activity history in a private authenticated dashboard.',
    detailDescription: [
      'Film Roll Tracker is a private full-stack dashboard built for film photographers who want a structured place to document every roll from loading through development. The app keeps shooting details, camera and lens choices, film stock, ISO, notes, uploads, and activity history connected to each roll.',
      'The project focuses on authenticated user workflows, typed front-end structure, API-backed data, and a responsive interface that makes film tracking usable on both desktop and smaller screens.'
    ],
    highlights: [
      'Private authenticated dashboard for personal roll tracking',
      'Structured logging for cameras, lenses, film stocks, ISO, notes, and development status',
      'Activity history and uploads to keep project context in one place'
    ],
    stack:
      'React • TypeScript • CSS • Vite • Node.js • Express • PostgreSQL • JWT Auth • Zod • bcryptjs • REST API • Responsive Design',
    images: [
      {
        src: projectAssetSrc('film-roll-tracker', 'landing-film-roll-tracker.png'),
        alt: 'Screenshot of the Film Roll Tracker landing page'
      },
      {
        src: projectAssetSrc('film-roll-tracker', 'bottom-landing-film-roll-tracker.png'),
        alt: 'Screenshot of the Film Roll Tracker landing page lower section'
      }
    ],
    githubHref: 'https://github.com/MykeRam/Film-Roll-Tracker'
  },
  {
    id: 3,
    slug: 'nyc-photo-lab-finder',
    name: 'NYC Photo Lab Finder',
    description:
      'A location-based app for comparing NYC photo labs on a live map, saving a shortlist, and reviewing nearby options by borough, neighborhood, ZIP, or current location.',
    detailDescription: [
      'NYC Photo Lab Finder helps film photographers compare local lab options through an interactive map and location-aware search flow. Users can browse labs by borough, neighborhood, ZIP code, or current location, then save a shortlist for future reference.',
      'The project combines front-end routing, map rendering, place data, persistence, and API-backed application structure into a practical tool built around a real photography workflow.'
    ],
    highlights: [
      'Search photo labs by borough, neighborhood, ZIP, or current location',
      'Interactive Google Maps experience with nearby lab context',
      'Saved labs view for building a personal shortlist'
    ],
    stack:
      'React • Vite • TypeScript • React Router DOM • @react-google-maps/api • Google Maps JavaScript API • Google Places API (New) • Node.js • Express • MongoDB • localStorage • concurrently',
    images: [
      {
        src: projectAssetSrc('nyc-photo-lab-finder', 'landing-photo-lab.png'),
        alt: 'Screenshot of the NYC Photo Lab Finder landing page'
      },
      {
        src: projectAssetSrc('nyc-photo-lab-finder', 'map-photo-lab.png'),
        alt: 'Screenshot of the NYC Photo Lab Finder map view'
      },
      {
        src: projectAssetSrc('nyc-photo-lab-finder', 'saved-labs-photo-lab.png'),
        alt: 'Screenshot of the NYC Photo Lab Finder saved labs view'
      }
    ],
    liveHref: 'https://mykeram.github.io/Photo-Lab-Finder/',
    githubHref: 'https://github.com/MykeRam/Photo-Lab-Finder'
  },
  {
    id: 1,
    slug: 'personal-portfolio',
    name: 'Personal Portfolio',
    description:
      'A responsive portfolio site that brings together my software engineering work and photography with custom motion, smooth section navigation, and a dedicated gallery experience.',
    detailDescription: [
      'This portfolio brings together software engineering projects and photography in a single responsive site. It uses custom section navigation, motion-driven transitions, and dedicated visual treatments for project work, personal background, and image galleries.',
      'The project is designed as both a public portfolio and a live playground for refining front-end structure, animation timing, responsive layout, asset handling, and deployment workflow.'
    ],
    highlights: [
      'Single-page section navigation with hash route support',
      'Responsive coding and photography sections with custom motion',
      'Optimized image workflow for gallery and portfolio assets'
    ],
    stack:
      'React • React DOM • JavaScript • CSS • Motion • Vite • Vite Plugin React • Node.js • npm • GitHub Actions • Sharp',
    images: [
      {
        src: projectAssetSrc('personal-portfolio', 'logo.png'),
        alt: 'Portfolio branding logo',
        className: 'coding-project-image--contain'
      },
      {
        src: projectAssetSrc('personal-portfolio', 'landing-portfolio.png'),
        alt: 'Screenshot of the landing section of the portfolio site'
      },
      {
        src: projectAssetSrc('personal-portfolio', 'about-portfolio.png'),
        alt: 'Screenshot of the about section of the portfolio site'
      },
      {
        src: projectAssetSrc('personal-portfolio', 'coding-portfolio.png'),
        alt: 'Screenshot of the coding section of the portfolio site'
      },
      {
        src: projectAssetSrc('personal-portfolio', 'photography-portfolio.png'),
        alt: 'Screenshot of the photography section of the portfolio site'
      }
    ],
    liveHref: 'https://mykeram.github.io/Mykes-Photog/',
    githubHref: 'https://github.com/MykeRam/Mykes-Photog'
  },
  {
    id: 2,
    slug: 'wtwr',
    name: 'WTWR (What to Wear?)',
    description:
      'A React weather app that helps users choose clothing based on current conditions, recommends items for the forecast, and supports item preview modals for a more interactive experience.',
    detailDescription: [
      'WTWR is a weather-based React app that recommends clothing items based on current conditions. The interface centers on a practical daily-use flow: check the weather, review suggested items, and preview clothing details through modal interactions.',
      'The project strengthened component-based React structure, state-driven UI, API integration, conditional rendering, and responsive styling using BEM-oriented CSS.'
    ],
    highlights: [
      'Weather-based clothing recommendations',
      'OpenWeatherMap API integration',
      'Interactive item preview modals'
    ],
    stack:
      'React • JavaScript (ES6+) • CSS • BEM • Vite • OpenWeatherMap API • Conditional Rendering',
    images: [
      {
        src: projectAssetSrc('wtwr', 'wtwr-home.png'),
        alt: 'Screenshot of the WTWR clothing recommendation application'
      }
    ],
    githubHref: 'https://github.com/MykeRam/se_project_react'
  },
  {
    id: 4,
    slug: 'triple-peaks-library',
    name: 'Triple Peaks Library',
    description:
      'A library landing page built from a design brief as part of the TripleTen software engineering program, focused on clean structure, layout accuracy, and foundational front-end styling techniques.',
    detailDescription: [
      'Triple Peaks Library is a multi-section landing page built from a design brief during the TripleTen software engineering program. The page focuses on semantic HTML structure, layout accuracy, and careful CSS positioning across a complete marketing-style page.',
      'The project helped establish core front-end habits: reading a brief, matching visual requirements, organizing sections, and writing maintainable foundational styles.'
    ],
    highlights: [
      'Design-brief implementation with multiple page sections',
      'Semantic HTML and structured CSS layout',
      'Focused practice with Flexbox, positioning, and layering'
    ],
    stack: 'HTML5 • CSS • Semantic HTML • Flexbox • Positioning • Z-Index',
    images: [
      {
        src: projectAssetSrc('triple-peaks-library', 'TriplePeaksLibrary.png'),
        alt: 'Screenshot of the full Triple Peaks Library webpage'
      },
      {
        src: projectAssetSrc('triple-peaks-library', 'events-triple_peaks.png'),
        alt: 'Screenshot of the Triple Peaks Library events section'
      },
      {
        src: projectAssetSrc('triple-peaks-library', 'staff-picks_triple_peaks.png'),
        alt: 'Screenshot of the Triple Peaks Library staff picks section'
      },
      {
        src: projectAssetSrc('triple-peaks-library', 'become-member_triple_peaks.png'),
        alt: 'Screenshot of the Triple Peaks Library become member section'
      },
      {
        src: projectAssetSrc('triple-peaks-library', 'about_triple_peaks.png'),
        alt: 'Screenshot of the Triple Peaks Library about section'
      }
    ],
    liveHref: 'https://mykeram.github.io/TriplePeaksLibrary/',
    githubHref: 'https://github.com/MykeRam/TriplePeaksLibrary'
  },
  {
    id: 5,
    slug: 'triple-peaks-coffee-shop',
    name: 'Triple Peaks Coffee Shop',
    description:
      'A coffee shop site built from a TripleTen design brief with a structured multi-section layout, custom form work, and motion-focused touches using CSS animation and transforms.',
    detailDescription: [
      'Triple Peaks Coffee Shop is a structured cafe website built from a TripleTen design brief. It includes menu, recipes, booking, and contact sections, with custom form styling and subtle motion-focused CSS work.',
      'The project expands on foundational layout practice by combining semantic structure, BEM naming, forms, embedded media, animation, and transform-based visual details in a polished static site.'
    ],
    highlights: [
      'Multi-section coffee shop page built from a design brief',
      'Custom booking form and structured contact section',
      'CSS animation and transform practice'
    ],
    stack:
      'HTML5 • CSS • Semantic HTML • Flexbox • Positioning • BEM • Custom Forms • CSS Animation • Transform',
    images: [
      {
        src: projectAssetSrc('triple-peaks-coffee-shop', 'TriplePeaksCoffee.png'),
        alt: 'Screenshot of the full Triple Peaks Coffee Shop webpage'
      },
      {
        src: projectAssetSrc('triple-peaks-coffee-shop', 'menu_coffee-shop.png'),
        alt: 'Screenshot of the Triple Peaks Coffee Shop menu section'
      },
      {
        src: projectAssetSrc('triple-peaks-coffee-shop', 'recipes_coffee-shop.png'),
        alt: 'Screenshot of the Triple Peaks Coffee Shop recipes section'
      },
      {
        src: projectAssetSrc('triple-peaks-coffee-shop', 'book-table_coffee-shop.png'),
        alt: 'Screenshot of the Triple Peaks Coffee Shop booking section'
      },
      {
        src: projectAssetSrc('triple-peaks-coffee-shop', 'contacts_coffee-shop.png'),
        alt: 'Screenshot of the Triple Peaks Coffee Shop contacts section',
        className: 'coding-project-image--contain-full'
      }
    ],
    liveHref: 'https://mykeram.github.io/se_project_coffeeshop/',
    githubHref: 'https://github.com/MykeRam/se_project_coffeeshop'
  },
  {
    id: 6,
    slug: 'about-me',
    name: 'About Me',
    description:
      'A simple landing page created as the first demo project in the TripleTen software engineering program, focused on core page structure and foundational front-end layout work.',
    detailDescription: [
      'About Me is an early landing page project from the TripleTen software engineering program. It focuses on the core building blocks of a webpage: semantic structure, simple layout, readable content, and clean presentation.',
      'As a first demo project, it marks the starting point of the portfolio and shows the foundation that later projects build on.'
    ],
    highlights: [
      'Introductory static landing page',
      'Practice with semantic HTML and Flexbox layout',
      'Foundation for later front-end project work'
    ],
    stack: 'HTML5 • CSS • Semantic HTML • Flexbox',
    images: [
      {
        src: projectAssetSrc('about-me', 'landing_about-me.png'),
        alt: 'Screenshot of the About Me landing section'
      },
      {
        src: projectAssetSrc('about-me', '1stSiteMR.png'),
        alt: 'Screenshot of the About Me project landing page'
      }
    ],
    liveHref: 'https://mykeram.github.io/About-me-TT/',
    githubHref: 'https://github.com/MykeRam/About-me-TT'
  }
]

export const projectBySlug = new Map(projectCards.map((project) => [project.slug, project]))
