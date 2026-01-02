import { lazy, Suspense, useMemo } from 'react'
import AppBackground from './components/layout/AppBackground'
import NavigationBar from './components/layout/NavigationBar'
import HomePage from './components/pages/HomePage'
import { useSpaPathRouter } from './routing/useSpaPathRouter'
import { getFlagCount } from './utils/flagData'

const BrowserPage = lazy(() => import('./components/pages/BrowserPage'))

export default function App() {
  const { route, currentPath, navigate } = useSpaPathRouter()
  const flagCount = useMemo(() => getFlagCount(), [])

  const navItems = useMemo(
    () => [
      { label: 'Home', href: '/', ariaLabel: 'Home page' },
      { label: 'Browse', href: '/browse', ariaLabel: 'Browse flags' },
      {
        label: 'Docs',
        href: '/docs/guides/getting-started/',
        ariaLabel: 'Documentation',
        target: '_blank',
        rel: 'noreferrer',
      },
    ],
    []
  )

  return (
    <div
      className="min-h-screen bg-(--bg) text-(--ink) relative overflow-hidden geometric-bg"
      data-theme="dark"
    >
      <AppBackground />

      <NavigationBar
        items={navItems}
        activeHref={currentPath}
        onRouteChangeWithSearch={navigate}
        onRouteChange={navigate}
      />

      <main className="relative max-w-6xl mx-auto px-6 py-12">
        {route === 'home' && (
          <HomePage
            flagCount={flagCount}
            onBrowseClick={() => window.open('/browse', '_blank')}
            onFilterNavigate={code =>
              window.open(`/browse?filter=${encodeURIComponent(code)}`, '_blank')
            }
          />
        )}
        {route === 'browse' && (
          <Suspense fallback={<div className="text-sm text-(--muted)">Loading flags...</div>}>
            <BrowserPage flagCount={flagCount} />
          </Suspense>
        )}
      </main>
    </div>
  )
}
