import HeroSection from '#/components/sections/HeroSection'
import NotFound from '#/routes/not-found'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
  notFoundComponent: () => {
    return <NotFound />
  },
})

function App() {
  return (
    <div className="min-h-screen bg-background noise-bg">
      <HeroSection />
    </div>
  )
}
