import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import readingTime from "./src/readingTime";
import svelte from "@astrojs/svelte";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), svelte()],
  site: process.env.NODE_ENV == 'production' ? 'https://fallenblogs.vercel.app' : 'http://localhost:4321',
  markdown: {
    remarkPlugins: [readingTime],
    shikiConfig: {
      theme: 'material-theme-darker'
    },
    image: {
      domains: ['astro.build'],
      remotePatterns: [{
        protocol: 'https'
      }]
    }
  },
  output: "server",
  adapter: vercel()
});