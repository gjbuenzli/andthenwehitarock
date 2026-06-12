import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { HACKS } from "./src/data/hacks";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Absolute base — the site is served from the custom-domain root, and
  // relative './' breaks asset loading on nested routes like
  // /cruising-hacks/<slug> (resolves ./assets -> /cruising-hacks/assets -> 404).
  base: '/',
  // vite-react-ssg: expand the dynamic /cruising-hacks/:slug route into one
  // static HTML page per hack (the crawler can't guess slugs on its own).
  ssgOptions: {
    includedRoutes(paths: string[]) {
      const hackPaths = HACKS.map((h) => `/cruising-hacks/${h.slug}`);
      const staticPaths = paths.filter((p) => !p.includes(":slug"));
      return [...staticPaths, ...hackPaths];
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
