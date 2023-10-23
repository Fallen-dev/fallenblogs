import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import { remarkReadingTime } from './remark-reading-time.mjs';
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap"
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
	output: "server",
	adapter: vercel(),
	integrations: [svelte(), mdx(), sitemap()],
	markdown: {
		remarkPlugins: [remarkReadingTime]
	},
	image: {
		domains: ['astro.build'],
		remotePatterns: [{
			protocol: 'https'
		}]
	},
	site: process.env.NODE_ENV === 'production' ? 'https://fallenblogs.vercel.app' : 'http://localhost:4321'
});