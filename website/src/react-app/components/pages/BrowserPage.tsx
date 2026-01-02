import FlagBrowser from '../flag-browser/FlagBrowser'

interface BrowserPageProps {
  flagCount: number
}

export default function BrowserPage({ flagCount }: BrowserPageProps) {
  return (
    <>
      <div className="mb-8 animate-rise">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Browse all flags</h1>
        <p className="mt-2 text-sm text-(--muted)">
          Search, filter, and explore {flagCount} circular flag icons.
        </p>
        <a
          href="/docs/guides/getting-started/"
          className="mt-3 inline-block text-sm text-(--accent) hover:underline"
        >
          Read the docs
        </a>
      </div>
      <FlagBrowser />
    </>
  )
}
