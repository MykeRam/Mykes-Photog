function normalizeRoute(pathname) {
  if (!pathname || pathname === '/') return '/'

  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash.slice(0, -1) : withLeadingSlash
}

export function getHashRoute(hash = window.location.hash) {
  const rawHash = hash.startsWith('#') ? hash.slice(1) : hash
  const [pathname] = rawHash.split('?')
  return normalizeRoute(pathname || '/')
}

export function getHashSearchParams(hash = window.location.hash) {
  const rawHash = hash.startsWith('#') ? hash.slice(1) : hash
  const [, search = ''] = rawHash.split('?')
  return new URLSearchParams(search)
}

export function buildHash(path = '/', searchParams) {
  const route = normalizeRoute(path)
  const search = searchParams ? searchParams.toString() : ''
  return `#${route}${search ? `?${search}` : ''}`
}
