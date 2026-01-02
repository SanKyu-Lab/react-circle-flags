// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		react(),
		starlight({
			title: 'Circle Flags',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Getting Started', slug: 'docs/guides/getting-started' },
						{ label: 'Installation', slug: 'docs/guides/getting-started/installation' },
						{ label: 'Basic Usage', slug: 'docs/guides/getting-started/usage' },
						{ label: 'Styling', slug: 'docs/guides/getting-started/styling' },
						{ label: 'Dynamic Flags', slug: 'docs/guides/getting-started/dynamic-flags' },
						{ label: 'TypeScript', slug: 'docs/guides/getting-started/typescript' },
						{ label: 'Bundle Size', slug: 'docs/guides/getting-started/bundle-size' },
					],
				},
				{
					label: 'Examples',
					items: [
						{
							label: 'React App',
							link: '/',
							attrs: { target: '_blank', rel: 'noopener noreferrer' }
						}
					],
				},
			],
		}),
	],
	vite: {
		server: {
			fs: {
				allow: ['..'],
			},
		},
	},
});
