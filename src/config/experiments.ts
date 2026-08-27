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
  id: 'hero_hook_v1',
  name: 'Hero subhead hook v1',
  enabled: true,
  // Surface: the tagline directly under the hero title — the first line of copy
  // ~99% of (mobile) ad traffic sees above the fold, before they ever reach the
  // CTA. home_cta_v1 proved the "free in Kindle Unlimited / instant" framing
  // crushed it at the CTA (+126%); this tests whether surfacing that same
  // value-prop at the very top of the page lifts conversion further, vs. a
  // pure curiosity hook, vs. the current flat "Hilarious true story!" control.
  variants: [
    { id: 'control', name: 'Control ("Hilarious true story!")', weight: 34 },
    { id: 'free_ku', name: 'Free in Kindle Unlimited', weight: 33 },
    { id: 'curiosity', name: 'Curiosity hook', weight: 33 },
  ],
};

/** All variant ids, control first — used to build CSS gating + validate cookies. */
export const VARIANT_IDS: string[] = ACTIVE_EXPERIMENT.variants.map((v) => v.id);

/** The control / fallback variant id (first in the list). */
export const CONTROL_VARIANT_ID: string = VARIANT_IDS[0] ?? 'control';
