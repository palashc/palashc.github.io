// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mermaid from "astro-mermaid";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://palashc.github.io",
  outDir: "./docs",
  integrations: [
    mermaid({
      // Switch the mermaid theme based on the html[data-theme] attribute,
      // which we keep in sync with the dark-mode toggle.
      autoTheme: true,
      mermaidConfig: {
        look: "handDrawn",
        flowchart: { curve: "basis" },
      },
    }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      wrap: true,
    },
  },
});
