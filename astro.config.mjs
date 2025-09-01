import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs';
import rehypeMermaid from 'rehype-mermaid';
import staticAdapter from '@astrojs/static'; // <--- Aquí está el adaptador correcto

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://yancax12.github.io',
  base: '/Jhanc.github.io/',

  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [
        [
          rehypeMermaid,
          {
            strategy: isProduction ? 'pre-built' : 'inline-svg',
          },
        ],
      ],
      syntaxHighlight: {
        type: 'shiki',
        excludeLangs: ['mermaid'],
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: staticAdapter(), // <--- Así Astro genera HTML estático
  output: 'static',
  build: {
    format: 'directory',
  },
});
