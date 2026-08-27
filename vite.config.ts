import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { HACKS } from "./src/data/hacks";
import { ACTIVE_EXPERIMENT, VARIANT_IDS, CONTROL_VARIANT_ID } from "./src/config/experiments";

// ---------------------------------------------------------------------------
// A/B experiment engine — inlined into the <head> at build/dev so a visitor is
// bucketed to a variant BEFORE first paint (no blank gate, SSG-safe). The gate
// CSS hides every non-active variant block ([data-v]); the assignment script
// sets html[data-variant] from a sticky cookie / ?variant= override / weighted
// random. See src/config/experiments.ts and src/features/experiments/.
// ---------------------------------------------------------------------------

function buildGateCss(ids: string[], control: string): string {
  const rules = ["[data-v]{display:none}"];
  for (const id of ids) {
    rules.push(`html[data-variant="${id}"] [data-v~="${id}"]{display:contents}`);
  }
  // No-JS / prerender fallback: show the control block when no variant is set.
  rules.push(`html:not([data-variant]) [data-v~="${control}"]{display:contents}`);
  return rules.join("\n");
}

// Runs in the browser before the app bundle. Kept ES5-ish and dependency-free.
const ASSIGN_JS = `(function(){
  var EXP = window.__EXP__ || {};
  var html = document.documentElement;
  var vs = EXP.variants || [];
  var ids = []; for (var i=0;i<vs.length;i++){ ids.push(vs[i].id); }
  var control = ids[0] || 'control';
  function done(v){ html.setAttribute('data-variant', v); html.setAttribute('data-experiment', EXP.id || ''); window.__ABV__ = { experiment: EXP.id || '', variant: v }; }
  if (!EXP.enabled || !ids.length) { done(control); return; }
  function readCookie(n){ var m = document.cookie.match(new RegExp('(?:^|; )' + n + '=([^;]*)')); return m ? decodeURIComponent(m[1]) : null; }
  function setCookie(n, val){ try { document.cookie = n + '=' + encodeURIComponent(val) + '; max-age=31536000; path=/; SameSite=Lax'; } catch (e) {} }
  var COOKIE = '_abv', chosen = null;
  try { var q = new URLSearchParams(location.search).get('variant'); if (q && ids.indexOf(q) >= 0) { chosen = q; } } catch (e) {}
  if (!chosen) { var c = readCookie(COOKIE); if (c) { var p = c.split(':'); if (p[0] === EXP.id && ids.indexOf(p[1]) >= 0) { chosen = p[1]; } } }
  if (!chosen) {
    var total = 0; for (var j=0;j<vs.length;j++){ total += Math.max(0, vs[j].weight || 0); }
    if (total <= 0) { chosen = ids[Math.floor(Math.random() * ids.length)]; }
    else { var r = Math.random() * total, acc = 0; chosen = ids[0]; for (var k=0;k<vs.length;k++){ acc += Math.max(0, vs[k].weight || 0); if (r < acc) { chosen = vs[k].id; break; } } }
  }
  setCookie(COOKIE, EXP.id + ':' + chosen);
  done(chosen);
})();`;

function experimentInlinePlugin(): PluginOption {
  const cfg = {
    id: ACTIVE_EXPERIMENT.id,
    enabled: ACTIVE_EXPERIMENT.enabled,
    variants: ACTIVE_EXPERIMENT.variants.map((v) => ({ id: v.id, weight: v.weight })),
  };
  return {
    name: "experiment-inline",
    transformIndexHtml() {
      return [
        {
          tag: "style",
          attrs: { id: "exp-gate" },
          children: buildGateCss(VARIANT_IDS, CONTROL_VARIANT_ID),
          injectTo: "head-prepend" as const,
        },
        {
          tag: "script",
          attrs: { id: "exp-assign" },
          children: `window.__EXP__=${JSON.stringify(cfg)};\n${ASSIGN_JS}`,
          injectTo: "head" as const,
        },
      ];
    },
  };
}

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
    experimentInlinePlugin(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
