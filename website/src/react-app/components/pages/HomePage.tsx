import AppFooter from '../layout/AppFooter'
import GallerySection from './home/GallerySection'
import HeroSection from './home/HeroSection'
import QuickStartSection from './home/QuickStartSection'

interface HomePageProps {
  flagCount: number
  onBrowseClick: () => void
  onFilterNavigate?: (code: string) => void
}

export default function HomePage({ flagCount, onBrowseClick, onFilterNavigate }: HomePageProps) {
  return (
    <>
      <HeroSection flagCount={flagCount} onBrowseClick={onBrowseClick} />
      <section className="space-y-8 mb-16">
        <GallerySection onFilterNavigate={onFilterNavigate} />
        <QuickStartSection />
      </section>
      <AppFooter />
    </>
  )
}
