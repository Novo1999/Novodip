import ProjectPage from '#/components/ProjectPage'
import injectHeadForSEO from '#/lib/seo'
import NotFound from '#/routes/not-found'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/project')({
  component: ProjectPage,
  notFoundComponent: () => {
    return <NotFound />
  },
  head: () =>
    injectHeadForSEO({
      path: '/project',
      title: 'Taskatask — Case Study | Novodip',
      description:
        'A case study of Taskatask: a real-time field-service platform with in-app chat, live maps, and task scheduling, built with React Native, Expo, and Redux.',
    }),
})
