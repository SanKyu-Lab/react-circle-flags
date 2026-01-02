import { Globe2 } from 'lucide-react'

interface TopNavProps {
  currentPage: 'home' | 'browser'
  onPageChange: (page: 'home' | 'browser') => void
  children?: React.ReactNode
}

export default function TopNav({ currentPage, onPageChange, children }: TopNavProps) {
  return (
    <nav className="relative border-b border-(--border-weak) bg-(--bg)/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Globe2 className="w-7 h-7 text-(--accent)" aria-hidden />
            <span className="font-semibold text-lg tracking-tight">Circle Flags</span>
          </div>

          <div className="flex items-center gap-1 bg-(--overlay-soft) rounded-full p-1 border border-(--border-weak)">
            <button
              onClick={() => onPageChange('home')}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
                currentPage === 'home'
                  ? 'bg-(--accent) text-white'
                  : 'text-(--muted) hover:text-(--ink) hover:bg-(--overlay-mid)'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onPageChange('browser')}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
                currentPage === 'browser'
                  ? 'bg-(--accent) text-white'
                  : 'text-(--muted) hover:text-(--ink) hover:bg-(--overlay-mid)'
              }`}
            >
              Browse
            </button>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/docs/guides/getting-started/"
              className="px-4 py-1.5 rounded-full text-sm font-medium text-(--muted) hover:text-(--ink) hover:bg-(--overlay-mid) transition-all"
            >
              Docs
            </a>
            {children}
          </div>
        </div>
      </div>
    </nav>
  )
}
