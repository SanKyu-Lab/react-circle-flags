// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  site: 'https://sankyu-lab.github.io/react-circle-flags',
  base: '/react-circle-flags',
  integrations: [
    react(),
    starlight({
      title: '@sankyu/react-circle-flags',
      description:
        '400+ circular SVG flag components for React with TypeScript, tree-shaking, and SSR support.',
      logo: {
        src: './src/assets/favicon.svg',
        alt: 'React Circle Flags',
      },
      favicon: '/react-circle-flags/favicon.svg',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/SanKyu-Lab/react-circle-flags',
        },
      ],
      sidebar: [
        {
          label: 'Guides',
          items: [
            { label: 'Getting Started', slug: 'docs/guides/getting-started' },
            { label: 'Installation', slug: 'docs/guides/getting-started/installation' },
            { label: 'Basic Usage', slug: 'docs/guides/getting-started/usage' },
            { label: 'Styling', slug: 'docs/guides/getting-started/styling' },
            { label: 'Dynamic Flags', slug: 'docs/guides/getting-started/dynamic-flags' },
            { label: 'TypeScript', slug: 'docs/guides/getting-started/typescript' },
            {
              label: 'Bundle Size & Tree-shaking',
              slug: 'docs/guides/getting-started/bundle-size',
            },
          ],
        },
        {
          label: 'Advanced',
          items: [{ label: 'Using CDN', slug: 'docs/guides/advanced/cdn-usage' }],
        },
        {
          label: 'Migration',
          items: [
            { label: 'From react-circle-flags', slug: 'docs/migration/from-react-circle-flags' },
          ],
        },
        {
          label: 'Examples',
          items: [
            {
              label: 'Example React App',
              link: '/',
              attrs: { target: '_blank' },
            },
          ],
        },
        {
          label: 'Related Links',
          items: [
            {
              label: 'GitHub Repository',
              link: 'https://github.com/SanKyu-Lab/react-circle-flags',
              attrs: { target: '_blank', rel: 'noreferrer' },
            },
            {
              label: 'NPM Package',
              link: 'https://www.npmjs.com/package/@sankyu/react-circle-flags',
              attrs: { target: '_blank', rel: 'noreferrer' },
            },
          ],
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/SanKyu-Lab/react-circle-flags/blob/main/website/',
      },
    }),
  ],
  // Build options
  build: {
    format: 'directory',
  },
  vite: {
    server: {
      fs: {
        allow: ['..'],
      },
    },
  },
})
