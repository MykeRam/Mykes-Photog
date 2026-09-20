# Michael Ramirez Portfolio

[![Deploy GitHub Pages](https://github.com/MykeRam/Mykes-Photog/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/MykeRam/Mykes-Photog/actions/workflows/deploy-pages.yml)

Personal portfolio for Michael Ramirez, focused on software engineering work, product thinking, and accessible frontend development. Photography remains part of the visual identity and is linked externally through the header, while this application focuses on the software portfolio experience.

## Live site

[myke.nyc](https://myke.nyc/)

## What the site includes

- Home page with a responsive hero, selected-work panel, resume download, and contact links
- About section with background, experience, and skills
- Coding section with featured and additional projects
- Project detail views with case-study content, screenshots, links, and image-preview carousels
- Hash-based navigation for sections and project details, including URLs such as `#/coding/nextstep`
- Responsive layouts for desktop and mobile screens
- Motion-based entrance and interaction animations with reduced-motion support
- Keyboard navigation, visible focus states, semantic landmarks, screen-reader announcements, focus management, and modal focus trapping

The featured projects are NextStep, Color Dash, Film Roll Tracker, and NYC Photo Lab Finder. Additional work includes Personal Portfolio, WTWR, Triple Peaks Library, Triple Peaks Coffee Shop, and About Me.

## Technology

- React 18
- React DOM
- Vite
- Motion for React animations
- Plain CSS with responsive media queries
- ESLint and Prettier
- Sharp for project-image optimization
- GitHub Actions and GitHub Pages for deployment

The app is a client-side React application. Project metadata is stored in `client/src/data/projects.js`; project screenshots are optimized into WebP assets under `client/public/projects/optimized/`.

## Local development

From the repository root:

```bash
cd client
npm install
npm run dev
```

The development server runs at [http://127.0.0.1:5173/](http://127.0.0.1:5173/).

## Available scripts

Run these commands from `client`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `client/dist` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Apply automatic ESLint fixes |
| `npm run format` | Format the project with Prettier |
| `npm run format:check` | Check formatting without changing files |
| `npm run optimize-project-images` | Generate optimized project card and preview images |
| `npm run convert-images` | Generate optimized photography image variants |
| `npm run convert-images:force` | Regenerate all photography image variants |

## Project structure

```text
client/
├── public/                 Static files, resume, logo, sitemap, and project assets
├── scripts/                Image-processing utilities
├── src/
│   ├── components/         Header, Home, About, Coding, project details, and Footer
│   ├── data/               Project content and image references
│   ├── images/             Photography source and generated image assets
│   ├── lib/                Hash routing and shared entrance-motion helpers
│   ├── App.jsx             Route state, scroll behavior, focus management, and layout
│   └── main.jsx            React entry point
├── index.html
├── package.json
└── vite.config.mjs
```

## Image workflows

Project screenshots are kept in `client/public/projects/<project>/` and referenced from `client/src/data/projects.js`. After adding or replacing project screenshots, run:

```bash
npm run optimize-project-images
```

This creates card images up to 1000px and preview images up to 2400px in `client/public/projects/optimized/` without changing the originals.

Photography source images live under `client/src/images/`. The conversion script uses Sharp when available and can fall back to ImageMagick. It creates thumbnail variants up to 640px and large variants up to 2200px under `client/src/images/thumbs/` and `client/src/images/full/`.

## Deployment

Every push to `main` runs `.github/workflows/deploy-pages.yml`. The workflow:

1. Installs dependencies with `npm ci` from `client`
2. Checks formatting with Prettier
3. Runs ESLint
4. Builds the Vite site
5. Uploads and deploys `client/dist` to GitHub Pages

## Credits

- The project logo was created with Canva.
- Social media icons are sourced from the [Figma Community Social Media Icons file](https://www.figma.com/design/0dOntceIxZIO0ur6yf4HNe/Social-Media-Icons---Logos--Community-?node-id=17-23).
