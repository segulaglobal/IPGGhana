// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
// import sanity from '@sanity/astro';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: "static",
  adapter: netlify(),
  site: "https://africapolicylens.com",

  integrations: [
    react(),
    sitemap(),
    
  ],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['flowbite'], // Ensure Flowbite loads properly
    },
  },
});