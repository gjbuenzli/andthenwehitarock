import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { HACKS } from "./src/data/hacks";
import { ACTIVE_EXPERIMENT, VARIANT_IDS } from "./src/config/experiments";
import { PAGE_EXPERIMENTS, PAGE_VARIANT_IDS } from "./src/config/pageExperiments";

// ---------------------------------------------------------------------------
// Per-route A/B experiment engine — inlined into the <head> at build/dev so a
// visitor is bucketed BEFORE first paint (no blank gate, SSG-safe). The SAME
// head is on every prerendered page; the assign script picks the experiment for
// the CURRENT path from window.__EXPS__ (home '/' runs ACTIVE_EXPERIMENT; each
// ad page /<slug> runs its own). The gate CSS hides every non-active variant
// block ([data-v]); the script sets html[data-variant]/[data-experiment] from a
// sticky per-experiment cookie / ?variant= override / weighted random.
// See src/config/{experiments,pageExperiments}.ts + src/features/experiments/.
// ---------------------------------------------------------------------------

function buildGateCss(ids: string[]): string {
  const rules = ["[data-v]{display:none}"];
  for (const id of ids) {
    rules.push(`html[data-variant="${id}"] [data-v~="${id}"]{display:contents}`);
  }
  // No-JS / prerender fallback: show control (every experiment's first variant
  // is 'control') when no variant is set.
  rules.push(`html:not([data-variant]) [data-v~="control"]{display:contents}`);
  return rules.join("\n");
}

// Runs in the browser before the app bundle. Kept ES5-ish and dependency-free.
const ASSIGN_JS = `(function(){
  var EXPS = window.__EXPS__ || {};
  var html = document.documentElement;
  function norm(p){ if(!p) return '/'; if(p.length>1 && p.charAt(p.length-1)==='/'){ p=p.slice(0,-1); } return p; }
  var EXP = EXPS[norm(location.pathname)];
  if (!EXP) { return; } // route not under experiment
  var vs = EXP.variants || [];
  var ids = []; for (var i=0;i<vs.length;i++){ ids.push(vs[i].id); }
  var control = ids[0] || 'control';
  function done(v){ html.setAttribute('data-variant', v); html.setAttribute('data-experiment', EXP.id || ''); window.__ABV__ = { experiment: EXP.id || '', variant: v }; }
  if (!EXP.enabled || !ids.length) { done(control); return; }
  function readCookie(n){ var m = document.cookie.match(new RegExp('(?:^|; )' + n + '=([^;]*)')); return m ? decodeURIComponent(m[1]) : null; }
  function setCookie(n, val){ try { document.cookie = n + '=' + encodeURIComponent(val) + '; max-age=31536000; path=/; SameSite=Lax'; } catch (e) {} }
  var COOKIE = '_abv_' + EXP.id, chosen = null;
  try { var q = new URLSearchParams(location.search).get('variant'); if (q && ids.indexOf(q) >= 0) { chosen = q; } } catch (e) {}
  if (!chosen) { var c = readCookie(COOKIE); if (c && ids.indexOf(c) >= 0) { chosen = c; } }
  if (!chosen) {
    var total = 0; for (var j=0;j<vs.length;j++){ total += Math.max(0, vs[j].weight || 0); }
    if (total <= 0) { chosen = ids[Math.floor(Math.random() * ids.length)]; }
    else { var r = Math.random() * total, acc = 0; chosen = ids[0]; for (var k=0;k<vs.length;k++){ acc += Math.max(0, vs[k].weight || 0); if (r < acc) { chosen = vs[k].id; break; } } }
  }
  setCookie(COOKIE, chosen);
  done(chosen);
})();`;

function experimentInlinePlugin(): PluginOption {
  const expCfg = (id: string, enabled: boolean, variants: { id: string; weight: number }[]) => ({
    id,
    enabled,
    variants: variants.map((v) => ({ id: v.id, weight: v.weight })),
  });
  // Path → experiment map. Home ('/' and its alias) runs ACTIVE_EXPERIMENT;
  // each ad page runs its own.
  const home = expCfg(ACTIVE_EXPERIMENT.id, ACTIVE_EXPERIMENT.enabled, ACTIVE_EXPERIMENT.variants);
  const EXPS: Record<string, ReturnType<typeof expCfg>> = {
    "/": home,
    "/rock-sail-website-joy": home,
  };
  for (const p of PAGE_EXPERIMENTS) EXPS[`/${p.slug}`] = expCfg(p.experimentId, p.enabled, p.variants);
  const allIds = Array.from(new Set([...VARIANT_IDS, ...PAGE_VARIANT_IDS]));
  return {
    name: "experiment-inline",
    transformIndexHtml() {
      return [
        {
          tag: "style",
          attrs: { id: "exp-gate" },
          children: buildGateCss(allIds),
          injectTo: "head-prepend" as const,
        },
        {
          tag: "script",
          attrs: { id: "exp-assign" },
          children: `window.__EXPS__=${JSON.stringify(EXPS)};\n${ASSIGN_JS}`,
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
