import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function githubPagesSpaFallback() {
  return {
    name: 'github-pages-spa-fallback',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist')
      const indexFile = path.join(distDir, 'index.html')
      const notFoundFile = path.join(distDir, '404.html')

      if (fs.existsSync(indexFile)) {
        fs.copyFileSync(indexFile, notFoundFile)
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), githubPagesSpaFallback()],
  root: '.',
  base: '/Mykes-Photog/',
  server: { port: 5173 }
})
