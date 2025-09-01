import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs';
import rehypeMermaid from 'rehype-mermaid';
import staticAdapter from '@astrojs/static'; // 🔹 Adaptador estático para GitHub Pages

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://yancax12.github.io',      // URL base
  base: '/Jhanc.github.io/',               // Nombre del repositorio en GitHub

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

  adapter: staticAdapter(), // 🔹 Aquí usamos el adaptador para sitios estáticos
  output: 'static',
  build: {
    format: 'directory',
  },
});
