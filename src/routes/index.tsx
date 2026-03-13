import AboutSection from '#/components/sections/AboutSection'
import ContactSection from '#/components/sections/ContactSection'
import ExperienceSection from '#/components/sections/ExperienceSection'
import HeroSection from '#/components/sections/HeroSection'
import ProjectsSection from '#/components/sections/ProjectsSection'
import SkillsSection from '#/components/sections/SkillsSection'
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
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </div>
  )
}
