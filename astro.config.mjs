import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  site: 'https://studio.terreaux.co',
  base: '/',
  integrations: [react(), tailwind()]
});
