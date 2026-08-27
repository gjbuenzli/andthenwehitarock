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
  id: 'home_cta_v1',
  name: 'Homepage CTA framing v1',
  enabled: true,
  variants: [
    { id: 'control', name: 'Control', weight: 34 },
    { id: 'urgency', name: 'Urgency CTA', weight: 33 },
    { id: 'social', name: 'Social-proof led', weight: 33 },
  ],
};

/** All variant ids, control first — used to build CSS gating + validate cookies. */
export const VARIANT_IDS: string[] = ACTIVE_EXPERIMENT.variants.map((v) => v.id);

/** The control / fallback variant id (first in the list). */
export const CONTROL_VARIANT_ID: string = VARIANT_IDS[0] ?? 'control';
