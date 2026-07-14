import AboutSection from '#/components/sections/AboutSection'
import ContactSection from '#/components/sections/ContactSection'
import ExperienceSection from '#/components/sections/ExperienceSection'
import HeroSection from '#/components/sections/HeroSection'
import ProjectsSection from '#/components/sections/ProjectsSection'
import SkillsSection from '#/components/sections/SkillsSection'
import injectHeadForSEO from '#/lib/seo'
import NotFound from '#/routes/not-found'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
  notFoundComponent: () => <NotFound />,
  head: () => injectHeadForSEO({ path: '/' }),
})

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header + ScrollProgress are mounted globally in __root.tsx */}
      {/* Section numbering follows the design: 01 About · 02 Work · 03 Experience · 04 Skills · 05 Contact */}
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </div>
  )
}
