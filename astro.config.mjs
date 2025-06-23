// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: "static",
  adapter: netlify(),
  site: "https://africapolicylens.com",

  integrations: [
    react(),
    sitemap(),
    sanity({
      projectId: "42txqeur",
      dataset: "production",
      useCdn: false, // for static builds
      apiVersion: "2025-06-18", // Current date to access latest API version
      studioBasePath: '/admin'
    })
  ],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['flowbite'], // Ensure Flowbite loads properly
    },
  },
  site: 'https://africapolicylens.com',
  integrations: [sitemap()],
});