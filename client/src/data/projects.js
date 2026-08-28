const assetSrc = (path) => `${import.meta.env.BASE_URL}${path}`
const projectAssetSrc = (projectFolder, fileName) => assetSrc(`projects/${projectFolder}/${fileName}`)

export const projectCards = [
  {
    id: 8,
    slug: 'nextstep',
    name: 'NextStep',
    group: 'Featured Projects',
    description:
      'A cloud-synced job application command center with passwordless authentication, pipeline insights, follow-up planning, and responsive list and board workflows.',
    detailDescription: [
      'NextStep is a job application command center designed to replace scattered spreadsheets with a focused, responsive workflow. Users can track companies, roles, locations, links, notes, application stages, important dates, and follow-up actions while moving between searchable list and board views.',
      'The application combines passwordless email authentication with secure Supabase cloud storage. Each user’s records are protected through PostgreSQL row-level security, while status changes are retained as a timeline. A local-storage workflow and realistic starter data provide a useful experience before and during cloud synchronization.',
      'NextStep also turns application data into actionable guidance through pipeline insights, response-rate tracking, monthly submission metrics, stage counts, reminders, and prioritized next actions. Follow-ups can be viewed as a list or calendar, completed, edited, or snoozed directly from the dashboard.'
    ],
    highlights: [
      'Full application CRUD with searchable, filterable, and sortable list and responsive board views.',
      'Passwordless email authentication and cloud synchronization through Supabase.',
      'Secure per-user PostgreSQL records protected by row-level security policies.',
      'Follow-up planning with reminders, calendar and list views, completion, and one-, three-, or seven-day snoozing.',
      'Dashboard insights for pipeline health, response rate, monthly submissions, offers, status counts, and recommended next actions.',
      'Persisted status timelines, detail views, reduced-motion support, and automated component and utility tests.'
    ],
    stack:
      'React • TypeScript • Vite • CSS • Supabase Auth • PostgreSQL • Row-Level Security • localStorage • Vitest • React Testing Library • GitHub Pages',
    cardStack: 'TypeScript • React • Supabase • PostgreSQL',
    images: [
      {
        src: projectAssetSrc('nextstep', 'landing-nextstep.jpg'),
        alt: 'Screenshot of the NextStep passwordless sign-in landing page'
      },
      {
        src: projectAssetSrc('nextstep', 'dashboard-nextstep.jpg'),
        alt: 'Screenshot of the NextStep dashboard with pipeline insights and follow-up planning'
      },
      {
        src: projectAssetSrc('nextstep', 'applications-nextstep.jpg'),
        alt: 'Screenshot of the NextStep application form and searchable application list'
      },
      {
        src: projectAssetSrc('nextstep', 'application-detail-nextstep.jpg'),
        alt: 'Screenshot of the NextStep application detail dialog and status timeline'
      }
    ],
    liveHref: 'https://mykeram.github.io/nextstep/',
    githubHref: 'https://github.com/MykeRam/nextstep'
  },
  {
    id: 9,
    slug: 'color-dash',
    name: 'Color Dash',
    group: 'Featured Projects',
    description:
      'A fast, mobile-first color-matching game with anonymous player identity, a shared PostgreSQL leaderboard, and automated production checks.',
    detailDescription: [
      'Color Dash turns a simple color-matching challenge into a polished, replayable browser game. Players race a shrinking timer, build streaks, earn speed bonuses, and adapt as the difficulty increases across desktop and touch-first mobile layouts.',
      'The game combines local responsiveness with shared cloud state. Each browser receives an anonymous player identity, personal bests are saved locally, and Supabase Postgres powers a global top-20 leaderboard with atomic best-score updates and row-level security.',
      'The delivery workflow includes TypeScript throughout, production-render verification with the Node.js test runner, and automated builds and deployment through GitHub Actions.'
    ],
    highlights: [
      'Touch-friendly game loop with lives, streaks, speed bonuses, and increasing difficulty.',
      'Anonymous Supabase authentication and one leaderboard identity per browser player.',
      'Shared PostgreSQL leaderboard with atomic personal-best updates and row-level security.',
      'Responsive mobile and desktop layouts with persistent device-local best scores.',
      'Automated production builds, rendered-output tests, and GitHub Pages deployment.'
    ],
    stack:
      'React 19 • TypeScript • Next.js 16 • Supabase Auth • PostgreSQL • Row-Level Security • Web Storage API • Node.js Test Runner • GitHub Actions • GitHub Pages',
    cardStack: 'TypeScript • React • Supabase • PostgreSQL',
    presentation: 'mobile-triptych',
    featuredImageIndex: 1,
    images: [
      {
        src: projectAssetSrc('color-dash', 'colodash-home.png'),
        alt: 'Color Dash mobile landing screen with the start control and global leaderboard'
      },
      {
        src: projectAssetSrc('color-dash', 'colordash-play.png'),
        alt: 'Color Dash mobile gameplay screen with the target color, timer, score, and four choices'
      },
      {
        src: projectAssetSrc('color-dash', 'colordash-results.png'),
        alt: 'Color Dash mobile results screen with score, replay control, and leaderboard form'
      }
    ],
    liveHref: 'https://mykeram.github.io/color-dash/',
    githubHref: 'https://github.com/MykeRam/color-dash'
  },
  {
    id: 7,
    slug: 'film-roll-tracker',
    name: 'Film Roll Tracker',
    group: 'Featured Projects',
    description:
      'A full-stack film photography dashboard built with TypeScript and PostgreSQL to track rolls, status, uploads, and analytics in one workflow.',
    detailDescription: [
      'Film Roll Tracker turns a niche film-photography workflow into a private dashboard that follows rolls from loading through shooting, development, scanning, and archiving. Users can create, read, update, and delete roll entries while keeping camera, lens, film stock, ISO, status, notes, uploads, and related activity connected in one place.',
      'The app demonstrates authenticated product thinking through register/login flows, JWT sessions, protected API routes, user-owned roll data, and dashboard analytics. It models the information photographers actually care about and presents it through stats, status counts, camera and film-stock insights, tables, forms, and detail views.',
      'It also emphasizes user-centered design: the interface is shaped around roll progress, equipment logging, film stock suggestions, notes, uploads, and private account-based tracking. Form validation, required fields, ISO validation, and server-side Zod validation keep the workflow structured and reliable.'
    ],
    highlights: [
      'Full CRUD: users can create, read, update, and delete film roll entries.',
      'Authentication: register/login, JWT sessions, protected API routes, and user-owned roll data.',
      'Dashboard analytics: roll stats, status counts, camera and film-stock insights, uploads, activity, and overview panels.',
      'Data modeling: structured entities for users, rolls, uploads, activity, statuses, analytics buckets, and ownership.',
      'Forms and validation: roll creation/edit forms, required fields, ISO validation, auth forms, and server-side Zod validation.'
    ],
    stack:
      'React • TypeScript • CSS • Vite • Node.js • Express • PostgreSQL • JWT Auth • Zod • bcryptjs • REST API • Responsive Design',
    cardStack: 'TypeScript • PostgreSQL • SQL • Node.js',
    images: [
      {
        src: projectAssetSrc('film-roll-tracker', 'landing-film-roll-tracker.png'),
        alt: 'Screenshot of the Film Roll Tracker landing page'
      },
      {
        src: projectAssetSrc('film-roll-tracker', 'bottom-landing-film-roll-tracker.png'),
        alt: 'Screenshot of the Film Roll Tracker landing page lower section'
      },
      {
        src: projectAssetSrc('film-roll-tracker', 'logged_in_dashboard-film-roll-tracker.jpg'),
        alt: 'Screenshot of the Film Roll Tracker authenticated dashboard'
      },
      {
        src: projectAssetSrc('film-roll-tracker', 'roll_library-film-roll-tracker.jpg'),
        alt: 'Screenshot of the Film Roll Tracker roll library view'
      },
      {
        src: projectAssetSrc('film-roll-tracker', 'delete-confirm_film-roll-tracker.jpg'),
        alt: 'Screenshot of the Film Roll Tracker delete confirmation dialog'
      },
      {
        src: projectAssetSrc('film-roll-tracker', 'scans-film-roll-tracker.jpg'),
        alt: 'Screenshot of the Film Roll Tracker scans view'
      }
    ],
    githubHref: 'https://github.com/MykeRam/Film-Roll-Tracker'
  },
  {
    id: 3,
    slug: 'nyc-photo-lab-finder',
    name: 'NYC Photo Lab Finder',
    group: 'Featured Projects',
    description:
      'A responsive map-and-list app for film photographers, built to surface lab options fast through search, filters, saved favorites, and Google Maps data.',
    detailDescription: [
      'NYC Photo Lab Finder helps film photographers search for and compare local lab options through a responsive map/list interface. Users can search by area or current location, filter by services, browse synced map and list results, and save labs with notes for future reference.',
      'The project emphasizes external API integration through Google Places, Google Maps, place photos, backend API calls, and MongoDB caching. It handles async state across debounced search, geolocation, map loading, API fetches, loading states, errors, and aborted requests.',
      'It also demonstrates structured data handling by normalizing external place data into consistent lab objects, validating coordinates, inferring services, deduplicating results, and persisting favorites and notes. The interface is built with reusable components for filters, lab cards, map panels, favorite controls, loading states, and empty states.'
    ],
    highlights: [
      'External API integration: Google Places, Google Maps, place photos, backend API calls, and MongoDB caching.',
      'Search and filter UX: location search, current-location search, service filters, and synced map/list browsing.',
      'Structured data handling: normalized lab objects, coordinate validation, service inference, deduped results, and persisted favorites/notes.',
      'Async state: loading, errors, debounced search, geolocation, map loading, fetches, and aborted requests.',
      'Polished responsive UX: mobile-friendly layouts, adaptive map/list views, visual states, saved labs, notes, and branded landing experience.'
    ],
    stack:
      'React • Vite • TypeScript • React Router DOM • @react-google-maps/api • Google Maps JavaScript API • Google Places API (New) • Node.js • Express • MongoDB • localStorage • concurrently',
    cardStack: 'TypeScript • React • Google Maps',
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
    group: 'Additional Work',
    description:
      'A responsive React portfolio with hash routing, custom motion, accessible navigation states, and an optimized asset workflow.',
    detailDescription: [
      'This portfolio presents software engineering work through responsive sections, dedicated project case studies, custom hash-based routing, and motion-driven transitions. Photography remains available as a separate routed experience with its own visual treatment.',
      'The project is also a live playground for refining front-end structure, animation timing, accessibility, responsive layout, image handling, metadata, and deployment workflow.'
    ],
    highlights: [
      'Single-page section navigation with hash route support',
      'Separate software and photography experiences with custom motion',
      'Optimized image workflow for gallery and portfolio assets'
    ],
    stack:
      'React • React DOM • JavaScript • CSS • Motion • Vite • Vite Plugin React • Node.js • npm • GitHub Actions • Sharp',
    cardStack: 'React • Motion • Vite',
    images: [
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
      },
      {
        src: projectAssetSrc('personal-portfolio', 'logo.png'),
        alt: 'Portfolio branding logo',
        className: 'coding-project-image--contain'
      }
    ],
    liveHref: 'https://mykeram.github.io/Mykes-Photog/',
    githubHref: 'https://github.com/MykeRam/Mykes-Photog'
  },
  {
    id: 2,
    slug: 'wtwr',
    name: 'WTWR (What to Wear?)',
    group: 'Additional Work',
    description:
      'A weather-driven React app that recommends clothing from live conditions and supports interactive item previews in a fast, responsive UI.',
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
    cardStack: 'React • JavaScript • API',
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
    group: 'Additional Work',
    description:
      'A clean multi-section landing page built from a design brief, focused on semantic structure, layout precision, and maintainable CSS.',
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
    cardStack: 'HTML • CSS • Flexbox',
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
    group: 'Additional Work',
    description:
      'A polished cafe site built from a design brief with custom forms, structured sections, and subtle CSS animation and transforms.',
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
    cardStack: 'HTML • CSS • Forms',
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
    group: 'Additional Work',
    description:
      'A foundational landing page built from a design brief, focused on semantic structure, clean layout, and responsive presentation.',
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
    cardStack: 'HTML • CSS • Flexbox',
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
