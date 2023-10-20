import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import { remarkReadingTime } from './remark-reading-time.mjs';
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [svelte()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  }
});