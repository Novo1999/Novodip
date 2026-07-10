import { devtools } from '@tanstack/devtools-vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import netlify from '@netlify/vite-plugin-tanstack-start'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'

const config = defineConfig({
  optimizeDeps: {
    force: true,
  },
  plugins: [
    devtools(),
    netlify(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart({
      // The two real routes are listed explicitly rather than discovered with
      // crawlLinks. Crawling followed every <a href>, which pulled in the
      // hash links (/#about …) and, worse, /resume/resume.pdf — prerendering
      // that re-encoded the binary as UTF-8 text and overwrote the real PDF in
      // dist/client, so the deployed resume would not open.
      pages: [{ path: '/' }, { path: '/project' }],
      prerender: {
        enabled: true,
        crawlLinks: false,
      },
      sitemap: {
        enabled: true,
        host: 'https://novodip.netlify.app/',
      },
    }),
    viteReact(),
  ],
})

export default config
