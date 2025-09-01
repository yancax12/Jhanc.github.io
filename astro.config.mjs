import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";
import rehypeMermaid from "rehype-mermaid";

export default defineConfig({
  site: "https://Jhanc.github.io", // ✅ Tu sitio
  base: "/", // ✅ Como usas el repositorio especial Jhanc.github.io, va en la raíz
  output: "static",

  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [
        [
          rehypeMermaid,
          {
            strategy:
              process.env.NODE_ENV === "production"
                ? "pre-mermaid"
                : "inline-svg",
          },
        ],
      ],
      syntaxHighlight: {
        type: "shiki",
        excludeLangs: ["mermaid"],
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    build: {
      chunkSizeWarningLimit: 1000,
    },
  },
});
