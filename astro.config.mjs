// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite'
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwind()]
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: true,
    },
  },

  output: 'server',
  adapter: vercel(),
  integrations: [react()],
});