export type Route = 'home' | 'browse'

const normalizeBaseUrl = (baseUrl: string) => (baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`)

export const BASE_URL = normalizeBaseUrl(import.meta.env.BASE_URL ?? '/')

export const ROUTE_PATHS: Record<Route, string> = {
  home: '/',
  browse: '/browse',
}

export const withBasePath = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path
  return `${BASE_URL}${normalizedPath}`
}

export const stripBasePath = (pathname: string) => {
  if (BASE_URL === '/') return pathname
  const baseWithoutTrailing = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL
  if (pathname === baseWithoutTrailing) return '/'
  if (!pathname.startsWith(BASE_URL)) return pathname
  const rest = pathname.slice(BASE_URL.length)
  return `/${rest}`
}

const stripQueryAndHash = (href: string) => href.split(/[?#]/)[0] ?? href

export const isInternalRoute = (href: string | undefined): href is string => {
  if (!href) return false
  const path = stripQueryAndHash(href)
  const baseHome = withBasePath(ROUTE_PATHS.home)
  const baseBrowse = withBasePath(ROUTE_PATHS.browse)
  return path === baseHome || path.startsWith(baseBrowse)
}

export const hrefToRoute = (href: string): Route => {
  const path = stripBasePath(stripQueryAndHash(href))
  return path.startsWith(ROUTE_PATHS.browse) ? 'browse' : 'home'
}

export const toRouteHref = (route: Route) => withBasePath(ROUTE_PATHS[route])
