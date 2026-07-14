const SITE_URL = 'https://novodip.netlify.app'
const SITE_NAME = 'Novodip'
const DEFAULT_IMAGE = `${SITE_URL}/portfolio-avatar.png`

const DEFAULT_TITLE = 'Novodip — Frontend Developer (React & Next.js)'
const DEFAULT_DESCRIPTION =
  'Novodip is a frontend developer in Dhaka, Bangladesh specializing in React, Next.js, and React Native — building fast, scalable web and mobile applications.'

type SEOOptions = {
  title?: string
  description?: string
  /** Path of this page, e.g. "/project". Used for og:url and the canonical link. */
  path?: string
  /** Absolute URL. Relative paths are not resolved by crawlers. */
  image?: string
}

/**
 * Returns the `head` options for a route: meta + OG/Twitter tags, a canonical
 * link, and Person/ProfilePage JSON-LD.
 *
 * Every page needs its own title/description — two routes sharing one head
 * reads as duplicate content to search engines.
 */
const injectHeadForSEO = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_IMAGE,
}: SEOOptions = {}) => {
  const url = `${SITE_URL}${path === '/' ? '/' : path}`

  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { name: 'author', content: SITE_NAME },
      { name: 'robots', content: 'index, follow' },

      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'website' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    links: [{ rel: 'canonical', href: url }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          url,
          mainEntity: {
            '@type': 'Person',
            name: SITE_NAME,
            jobTitle: 'Frontend Developer',
            description: DEFAULT_DESCRIPTION,
            image: DEFAULT_IMAGE,
            url: SITE_URL,
            sameAs: [
              'https://github.com/Novo1999',
              'https://www.linkedin.com/in/novodip/',
            ],
            knowsAbout: [
              'Frontend Development',
              'React',
              'Next.js',
              'React Native',
              'TypeScript',
              'Web Performance',
            ],
          },
        }),
      },
    ],
  }
}

export default injectHeadForSEO
