import ProjectPage from '#/components/ProjectPage'
import injectHeadForSEO from '#/lib/seo'
import NotFound from '#/routes/not-found'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/project')({
  component: ProjectPage,
  notFoundComponent: () => {
    return <NotFound />
  },
  head: injectHeadForSEO,
})
