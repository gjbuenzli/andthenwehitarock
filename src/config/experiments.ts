// Landing-page experiment configuration (single source of truth).
//
// Edit the active experiment here and push — the static build INLINES this into
// the page <head> (see the `experimentInlinePlugin` in vite.config.ts) so a
// visitor is bucketed to a variant BEFORE first paint (no blank "Loading…" gate,
// which is what sank the old client-side A/B and blocked prerendering).
//
// Weights are RELATIVE (they need not sum to 100); the engine normalizes them.
// The FIRST variant is treated as the control and the no-JS fallback.

export interface ExperimentVariant {
  /** Stable id used in cookies, CSS gating (`data-v`), and analytics. */
  id: string;
  /** Human label shown in the BookManager dashboard. */
  name: string;
  /** Relative traffic weight (e.g. 34 / 33 / 33 ≈ 34% / 33% / 33%). */
  weight: number;
}

export interface Experiment {
  /** Stable id; changing it re-buckets all visitors (cookie is keyed by it). */
  id: string;
  name: string;
  /** When false, everyone gets the control variant and no exposure is logged. */
  enabled: boolean;
  variants: ExperimentVariant[];
}

export const ACTIVE_EXPERIMENT: Experiment = {
  id: 'minimal_bridge_v1',
  name: 'Minimal bridge page vs full landing',
  enabled: true,
  // hero_hook_v1 settled: neither hero subhead beat the flat control (both
  // challengers lost), so the current full landing page is retained as control.
  // This test asks a bigger question: does a dead-simple "bridge" page — just the
  // cover, the ad's own description, and ONE 'Learn More' link straight to Amazon
  // — convert cold ad traffic better than the full multi-section landing page?
  // Two minimal flavours differ only in where 'Learn More' points:
  //   minimal_listing → the book's Amazon listing (main /dp, print)
  //   minimal_ku      → Read FREE in Kindle Unlimited (Kindle edition)
  variants: [
    { id: 'control', name: 'Full landing page', weight: 34 },
    { id: 'minimal_listing', name: 'Minimal → Amazon listing', weight: 33 },
    { id: 'minimal_ku', name: 'Minimal → Kindle Unlimited', weight: 33 },
  ],
};

/** All variant ids, control first — used to build CSS gating + validate cookies. */
export const VARIANT_IDS: string[] = ACTIVE_EXPERIMENT.variants.map((v) => v.id);

/** The control / fallback variant id (first in the list). */
export const CONTROL_VARIANT_ID: string = VARIANT_IDS[0] ?? 'control';

// ---- Minimal bridge-page copy ------------------------------------------------
// Sourced from the current top-spending ad ("Growth Ad 2 - Advantage") so the
// landing message matches what the visitor just clicked (message-match). Edit
// freely — this is the single place the minimal variants read their text from.

/** One-line hook, shown large under the cover. */
export const MINIMAL_HOOK =
  'A family of five, a dog, and a cat move onto a sailboat. A hilarious true story.';

/** The book description, verbatim-ish from the ad (typo cleaned). */
export const MINIMAL_DESCRIPTION: string[] = [
  "Did you know that the remora fish will try to swim up a whale shark's butt when they poop? The crew of Twig didn't. It turns out there was an awful lot the family of five didn't know when they decided to move aboard and set off for adventure on the high seas.",
  'After decades of dreaming the explorers finally sailed off into the sunset. Yes, they found the palm trees and coconuts they had longed for, but they also glimpsed the other side of paradise. They ran from waterspouts, dodged hurricanes, got (sort of) robbed by pirates, and played chicken with naval warships. They also found themselves making emergency calls to the Coast Guard in the dead of night and learning the exact purpose of a nut jiggler during a late-night beach bonfire.',
  'Laugh at the captain’s intimate misfortunes with marine toilets, taste what a pirate smells like, and discover how not to get crabs in this page-turning journey of the East Coast. You are invited to follow along with the frustration and joy of a life newly discovered afloat a 46-foot catamaran.',
  "Remember: if everything had gone exactly as planned… it wouldn't have been much of an adventure.",
];
