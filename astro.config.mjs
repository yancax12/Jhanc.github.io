import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs';
import rehypeMermaid from 'rehype-mermaid';

// Detectar entorno
const isProduction = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  // URL base del proyecto en GitHub Pages
  site: 'https://yancax12.github.io',
  base: '/Jhanc.github.io/', // 🔹 Nombre EXACTO del repo en GitHub

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

  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  // GitHub Pages usa estáticos, no Vercel
  output: 'static',
  build: {
    format: 'directory',
  },
});
