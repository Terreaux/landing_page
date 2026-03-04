import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

const [githubOwner, githubRepo] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  output: 'static',
  site: isGitHubActions && githubOwner ? `https://${githubOwner}.github.io` : 'https://terreaux.co',
  base: isGitHubActions && githubRepo ? `/${githubRepo}` : '/',
  integrations: [react(), tailwind()]
});
