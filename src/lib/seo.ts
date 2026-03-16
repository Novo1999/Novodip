const injectHeadForSEO = () => ({
  meta: [
    { title: 'Novodip - Software Engineer (Frontend)' },
    {
      name: 'Novodip',
      content:
        'Frontend Developer | Next.js Specialist, Building fast, scalable, and elegant web applications with modern technologies.',
    },
    {
      property: 'og:title',
      content: 'Novodip - Software Engineer (Frontend)',
    },
    {
      property: 'og:description',
      content:
        'Frontend Developer | Next.js Specialist, Building fast, scalable, and elegant web applications with modern technologies.',
    },
    { property: 'og:image', content: '/portfolio-avatar.png' },
    { property: 'og:type', content: 'article' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:title',
      content: 'Novodip - Software Engineer (Frontend)',
    },
    {
      name: 'twitter:description',
      content:
        'Frontend Developer | Next.js Specialist, Building fast, scalable, and elegant web applications with modern technologies.',
    },
    { name: 'twitter:image', content: '/portfolio-avatar.png' },
  ],
  scripts: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        dateCreated: '2025-01-01',
        dateModified: '2026-03-16',
        mainEntity: {
          '@type': 'Person',
          name: 'Novodip',
          jobTitle: 'Software Engineer (Frontend)',
          description:
            'Frontend Developer | Next.js Specialist, Building fast, scalable, and elegant web applications with modern technologies.',
          image: '/portfolio-avatar.png',
          url: 'https://novodip.netlify.app/',
          sameAs: [
            'https://github.com/Novo1999',
            'https://www.linkedin.com/in/novodip/',
          ],
          knowsAbout: [
            'Frontend Development',
            'Next.js',
            'React',
            'TypeScript',
            'Web Performance',
            'Scalable Web Applications',
          ],
        },
      }),
    },
  ],
})
export default injectHeadForSEO
