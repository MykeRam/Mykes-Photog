## Project Overview

This site is a personal portfolio that brings together my software engineering work and photography in one place. It is designed to introduce who I am, highlight the technical skills I am building, and present selected projects and visual work through a clean, interactive experience.

The site showcases:

- My background and interests as a developing software engineer and photographer
- A coding section featuring projects built throughout my learning journey
- A photography section that highlights selected image work in a dedicated gallery
- Motion, layout, and responsive design choices that reflect both technical and creative focus
- Accessibility features supporting keyboard navigation, screen readers, reduced motion, and high-contrast viewing

## Live Demo

View the deployed site here: [mykeram.github.io/Mykes-Photog](https://mykeram.github.io/Mykes-Photog/)

## Technologies and Tools

<p align="left">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/React%20DOM-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React DOM" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Vite%20Plugin%20React-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="@vitejs/plugin-react" />
  <img src="https://img.shields.io/badge/Motion-000000?style=for-the-badge&logo=framer&logoColor=white" alt="Motion" />
  <img src="https://img.shields.io/badge/Sharp-99CC00?style=for-the-badge&logo=sharp&logoColor=white" alt="Sharp" />
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm" />
  <img src="https://img.shields.io/badge/ImageMagick-000000?style=for-the-badge&logo=imagemagick&logoColor=white" alt="ImageMagick" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white" alt="GitHub Pages" />
  <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions" />
</p>

This project uses the following technologies and tools:

| Technology | How it is used in this project | Where it is used |
| --- | --- | --- |
| **HTML5 / JSX** | Defines the site's semantic structure through React component markup, including sections, headings, links, buttons, project cards, and gallery content. | `client/src/App.jsx`, `client/src/components/Home/Home.jsx`, `client/src/components/Coding/Coding.jsx`, `client/src/components/Photography/Photography.jsx` |
| **CSS3** | Controls layout, spacing, typography, responsive breakpoints, the home hero grid, the gallery layout, and the coding section styling. | `client/src/index.css`, `client/src/components/Home/Home.css`, `client/src/components/Gallery/Gallery.css`, `client/src/components/Coding/Coding.css` |
| **JavaScript (ES6+)** | Powers hash-based navigation, scroll syncing, gallery filtering, animation state, and image processing logic. | `client/src/App.jsx`, `client/src/lib/hashRoute.js`, `client/src/components/Gallery/Gallery.jsx`, `client/scripts/convert-images.js` |
| **React** | Builds the UI with reusable components and stateful behavior across the portfolio sections. | `client/src/main.jsx`, `client/src/App.jsx`, `client/src/components/` |
| **React DOM** | Renders the app into the DOM with `createRoot` and mounts gallery and project-preview modals with `createPortal`. | `client/src/main.jsx`, `client/src/components/Gallery/Gallery.jsx`, `client/src/components/Coding/Coding.jsx` |
| **Vite** | Runs the local development server and production build pipeline through the project's `dev`, `build`, and `preview` scripts. | `client/package.json`, `client/vite.config.js` |
| **@vitejs/plugin-react** | Adds React and JSX support to the Vite build configuration. | `client/package.json`, `client/vite.config.js` |
| **Motion** | Animates hero images, section headings, gallery transitions, and modal behavior while respecting reduced-motion preferences. | `client/src/components/Home/Home.jsx`, `client/src/components/Coding/Coding.jsx`, `client/src/components/Gallery/Gallery.jsx` |
| **Node.js** | Executes the project's local tooling, including Vite commands and the image conversion utility. | `client/package.json`, `client/scripts/convert-images.js` |
| **npm** | Manages dependencies and runs the frontend scripts for development, build, preview, and image conversion. | `client/package.json`, `client/package-lock.json` |
| **Sharp** | Auto-rotates source images, resizes them into thumbnail and large variants, and exports optimized `.webp` files for the gallery. | `client/package.json`, `client/scripts/convert-images.js` |
| **ImageMagick** | Serves as an optional fallback image processor when Sharp is unavailable, generating the same thumbnail and large gallery variants. | `client/scripts/convert-images.js` |
| **GitHub Actions** | Automates checkout, dependency installation, the Vite build, artifact upload, and deployment. | `.github/workflows/deploy-pages.yml` |
| **GitHub Pages** | Hosts the built static site, with the Vite base path configured for the repository deployment URL. | `.github/workflows/deploy-pages.yml`, `client/vite.config.js` |

## Accessibility

The portfolio includes an accessibility-focused implementation for its main navigation, Home, About, Coding, project cards, project previews, and project-detail pages.

Implemented accessibility features include:

- A keyboard-accessible **Skip to main content** link
- Semantic landmarks, sections, headings, navigation labels, and current-page indicators
- Consistent, visible keyboard focus indicators for links, buttons, social icons, navigation items, and project controls
- Larger header navigation targets and responsive control sizing
- Native buttons for interactive project images instead of simulated button roles
- Full keyboard support for project carousels and image previews
- Project-preview modal focus trapping with `Tab` and `Shift+Tab`
- `Escape` support for closing project-preview modals
- Focus restoration to the image that opened a preview
- Inert and screen-reader-hidden background content while a project-preview modal is open
- Screen-reader announcements for carousel position, project image changes, route changes, and section navigation
- Dynamic document titles and focus movement when navigating through the React single-page interface
- Descriptive project-image alternative text and a more descriptive About portrait alternative
- Decorative homepage photography marked so screen readers can skip it
- Full About text exposed immediately to screen readers without requiring users to wait for the visual typing animation
- Accessible labels indicating when project links open in a new tab
- Reduced-motion support for animated content and the skip link
- Forced-colors/high-contrast focus support
- Improved contrast for muted About text

Detailed, photo-by-photo alternative descriptions for the Photography gallery are planned as a future accessibility phase.

## What This Repository Demonstrates

This repository is primarily a **frontend portfolio application**. It demonstrates:

- React component-based UI development
- HTML/JSX structure and semantic page composition
- CSS-based layout, responsive design, and gallery presentation
- JavaScript-driven navigation, scroll behavior, filtering, and animation state
- Motion-based transitions and interactive effects
- Accessible keyboard, focus, modal, carousel, and screen-reader interaction patterns
- Vite-based local development and production builds
- Automated deployment to GitHub Pages with GitHub Actions
- Image optimization workflows using Sharp, with ImageMagick as an optional fallback

## Credits

- The project logo was created using **Canva**.

- The social media icons used in this project are sourced from the following **Figma Community** file:  
  https://www.figma.com/design/0dOntceIxZIO0ur6yf4HNe/Social-Media-Icons---Logos--Community-?node-id=17-23
