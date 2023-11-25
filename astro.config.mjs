import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/static";
import mdx from "@astrojs/mdx";
import readingTime from "./src/readingTime.mjs";

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  output: "static",
  integrations: [mdx()],
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
});