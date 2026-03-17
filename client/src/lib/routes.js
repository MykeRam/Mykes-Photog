const basePath = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '')

export function normalizeRoute(pathname) {
  if (!pathname) return '/'

  const strippedPath = basePath && pathname.startsWith(basePath) ? pathname.slice(basePath.length) || '/' : pathname
  if (strippedPath === '/') return '/'
  return strippedPath.endsWith('/') ? strippedPath.slice(0, -1) : strippedPath
}

export function withBase(path) {
  const normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '')
  if (!basePath) return normalizedPath
  return normalizedPath === '/' ? `${basePath}/` : `${basePath}${normalizedPath}`
}
