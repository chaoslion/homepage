import { execSync } from 'node:child_process';
import path from 'node:path';
import aiRobotsTxt from 'astro-ai-robots-txt';
import compressor from 'astro-compressor';
import { defineConfig, fontProviders } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import {
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import tailwindcss from '@tailwindcss/vite';

import { pluginBuildInfo, pluginSatteriBlog } from './plugins';

const workspacePaths: Record<string, string> = {
  site: path.resolve(process.cwd(), '.'),
  content: path.resolve(process.cwd(), 'content'),
};

const contentBlogPostsPath = `${workspacePaths.content}/blog/posts`;
const contentBlogPostsImagesDirectory = 'assets';

let workspacePorcelain: boolean = false;
try {
  const result = execSync(`git status --porcelain`);
  workspacePorcelain = result.toString().trim().length === 0;
} catch (e) {}

export default defineConfig({
  site: workspacePorcelain
    ? 'https://alex.jaehnel.info'
    : 'http://localhost:4321',
  build: {
    assetsPrefix: workspacePorcelain
      ? 'https://assets.alex.jaehnel.info'
      : undefined,
  },
  adapter: node({
    mode: 'standalone',
    staticHeaders: true,
  }),
  // session: { driver: "redis", options: { url: process.env.REDIS_URL } },
  integrations: [
    mdx(),
    svelte(),
    partytown(),
    aiRobotsTxt(),
    sitemap({ filenameBase: 'site' }),
    compressor({ gzip: true, brotli: false, zstd: false }),
  ],
  image: {
    domains: ['img.youtube.com'],
    responsiveStyles: false,
    layout: 'none',
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Geist',
      cssVariable: '--font-geist',
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Space Grotesk',
      cssVariable: '--font-space-grotesk',
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Fira Code',
      cssVariable: '--font-fira-code',
    },
  ],
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['math', 'asciimath'],
    },
    shikiConfig: {
      transformers: [
        transformerNotationFocus(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
      ],
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
    processor: satteri({
      mdastPlugins: [
        pluginSatteriBlog(
          contentBlogPostsPath,
          contentBlogPostsImagesDirectory,
        ),
      ],
      features: {
        directive: true,
        headingAttributes: true,
        math: true,
        smartPunctuation: true,
      },
    }),
  },
  vite: {
    define: {
      'import.meta.env.CUSTOM_BUILD_DATE': JSON.stringify(
        new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        }),
      ),
      'import.meta.env.CUSTOM_CONTENT_PATH': JSON.stringify(
        workspacePaths.content,
      ),
    },
    esbuild: {
      drop: workspacePorcelain ? ['console', 'debugger'] : [],
    },
    server: {
      allowedHosts: ['.jaehnel.info'],
    },
    plugins: [
      tailwindcss(),
      pluginBuildInfo(workspacePaths, !workspacePorcelain),
    ],
    resolve: {
      tsconfigPaths: true,
    },
  },
});
