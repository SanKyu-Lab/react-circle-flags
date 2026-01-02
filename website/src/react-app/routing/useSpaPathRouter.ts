import { useCallback, useEffect, useMemo, useState } from 'react'

export type Route = 'home' | 'browse'

const ROUTE_PATHS: Record<Route, string> = {
  home: '/',
  browse: '/browse',
}

const parseRoute = (pathname: string): Route => {
  if (pathname.startsWith(ROUTE_PATHS.browse)) return 'browse'
  return 'home'
}

export function useSpaPathRouter() {
  const getInitialRoute = () =>
    typeof window === 'undefined' ? 'home' : parseRoute(window.location.pathname)

  const [route, setRoute] = useState<Route>(getInitialRoute)

  useEffect(() => {
    const handlePop = () => setRoute(parseRoute(window.location.pathname))
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  const navigate = useCallback((next: Route, search: string = '') => {
    if (typeof window === 'undefined') {
      setRoute(next)
      return
    }
    const targetPath = `${ROUTE_PATHS[next]}${search}`
    if (window.location.pathname + window.location.search !== targetPath) {
      window.history.pushState({ route: next }, '', targetPath)
    }
    setRoute(next)
  }, [])

  const currentPath = useMemo(() => ROUTE_PATHS[route], [route])

  return { route, currentPath, navigate }
}

export function isInternalRoute(href: string | undefined): href is string {
  if (!href) return false
  return href === ROUTE_PATHS.home || href.startsWith(ROUTE_PATHS.browse)
}
