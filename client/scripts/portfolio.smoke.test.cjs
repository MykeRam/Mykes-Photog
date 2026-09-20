const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')

const sourceRoot = path.resolve(__dirname, '..', 'src')
const appSource = fs.readFileSync(path.join(sourceRoot, 'App.jsx'), 'utf8')
const hashRouteSource = fs.readFileSync(path.join(sourceRoot, 'lib/hashRoute.js'), 'utf8')
const motionSource = fs.readFileSync(path.join(sourceRoot, 'lib/enterMotion.js'), 'utf8')

test('defines the expected hash routes and navigation helpers', () => {
  assert.match(appSource, /mainPageRoutes = new Set\(\['\/', '\/about', '\/coding'\]\)/)
  assert.match(appSource, /currentPath\.startsWith\('\/coding\/'\)/)
  assert.match(hashRouteSource, /export function getHashRoute/)
  assert.match(hashRouteSource, /export function getHashSearchParams/)
  assert.match(hashRouteSource, /export function buildHash/)
})

test('keeps the underline timing after the header links', () => {
  const linksFinish = Number(motionSource.match(/headerLinksFinishTime = ([\d.]+)/)[1])
  const underlineFinish = Number(motionSource.match(/headerUnderlineFinishTime = ([\d.]+)/)[1])

  assert.ok(underlineFinish > linksFinish)
  assert.match(motionSource, /initial: \{ opacity: 0, y: initialY, scale: 0\.96 \}/)
})
