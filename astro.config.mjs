// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['flowbite'], // Ensure Flowbite loads properly
    },
  },
  site: 'https://africapolicylens.com',
  integrations: [sitemap()],
});