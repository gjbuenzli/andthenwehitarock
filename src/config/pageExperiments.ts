// Persistent, ad-addressable landing pages — each is its OWN A/B experiment.
//
// Point a format-targeted ad at its page (/paperback, /kindle-buy, …). Each page
// runs an independent A/B: the inline engine (vite.config) buckets by PATH, so
// every page has its own experiment id, cookie, and variants. Each page carries
// one Associates tag for page-level SALES; within-page A/B variants are
// differentiated on-site (exposure/click beacons keyed by experiment+variant).
// When you want per-variant SALES inside a page, give each variant its own tag.
//
// Results show per page in the BookManager funnel (each experimentId is its own
// row) and per page in Amazon Sales by Experience (via the tag → experience map
// in the API's associates-tags.ts — keep the two in sync).

import type { BookFormat } from './landing';

export interface PageVariant {
  /** Stable id (cookie/CSS/analytics). First = control + no-JS fallback. */
  id: string;
  name: string;
  weight: number;
  /** CTA label for bridge pages (overrides the page default). */
  cta?: string;
}

export interface PageExperiment {
  /** URL slug → route `/<slug>` (prerendered). */
  slug: string;
  name: string;
  /** 'full' = the whole landing page (all formats); 'bridge' = one-CTA page. */
  layout: 'full' | 'bridge';
  /** Bridge target format (which product the CTA opens). */
  format?: BookFormat;
  /** Page-level Associates tag (sales bucket for this page). */
  tag: string;
  /** Experiment id used in analytics + the lifecycle table. */
  experimentId: string;
  enabled: boolean;
  /** Control-first. One variant = no A/B yet (ready to add more). */
  variants: PageVariant[];
}

export const PAGE_EXPERIMENTS: PageExperiment[] = [
  {
    slug: 'general',
    name: 'General (all formats)',
    layout: 'full',
    tag: 'atwhar0a-20',
    experimentId: 'lp_general',
    enabled: true,
    variants: [{ id: 'control', name: 'Full landing page', weight: 100 }],
  },
  {
    slug: 'paperback',
    name: 'Paperback',
    layout: 'bridge',
    format: 'paperback',
    tag: 'paperback067-20',
    experimentId: 'lp_paperback',
    enabled: true,
    variants: [{ id: 'control', name: 'Learn More', weight: 100, cta: 'Learn More' }],
  },
  {
    slug: 'kindle-free',
    name: 'Kindle — free in KU',
    layout: 'bridge',
    format: 'kindle',
    tag: 'kindle077d-20',
    experimentId: 'lp_kindle_free',
    enabled: true,
    variants: [{ id: 'control', name: 'Read FREE in KU', weight: 100, cta: 'Read FREE in Kindle Unlimited' }],
  },
  {
    slug: 'kindle-buy',
    name: 'Kindle — buy',
    layout: 'bridge',
    format: 'kindle',
    tag: 'atwhar0c-20',
    experimentId: 'lp_kindle_buy',
    enabled: true,
    variants: [{ id: 'control', name: 'Buy the Kindle Edition', weight: 100, cta: 'Buy the Kindle Edition' }],
  },
  {
    slug: 'audiobook',
    name: 'Audiobook',
    layout: 'bridge',
    format: 'audiobook',
    tag: 'atwhar05-20',
    experimentId: 'lp_audiobook',
    enabled: true,
    variants: [{ id: 'control', name: 'Listen on Audible', weight: 100, cta: 'Listen on Audible' }],
  },
];

/** All variant ids across all page experiments (for CSS gating). */
export const PAGE_VARIANT_IDS: string[] = Array.from(
  new Set(PAGE_EXPERIMENTS.flatMap((p) => p.variants.map((v) => v.id))),
);
