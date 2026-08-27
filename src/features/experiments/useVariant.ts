import { ACTIVE_EXPERIMENT, CONTROL_VARIANT_ID } from '@/config/experiments';

export interface ResolvedVariant {
  experiment: string;
  variant: string;
}

/**
 * The variant assigned to this visitor. It is resolved by the inline <head>
 * script (see vite.config.ts) BEFORE first paint and written to the <html>
 * element as `data-variant` / `data-experiment`.
 *
 * SSG-safe: during the Node prerender there is no `document`, so this returns
 * the control. On the client it reads the attribute the head script already
 * set. Use this ONLY for analytics tagging / event handlers — NEVER to render
 * different DOM during React render (that would cause a hydration mismatch;
 * visual differences go through <Variant> + CSS instead).
 */
export function getResolvedVariant(): ResolvedVariant {
  if (typeof document === 'undefined') {
    return { experiment: ACTIVE_EXPERIMENT.id, variant: CONTROL_VARIANT_ID };
  }
  const el = document.documentElement;
  return {
    experiment: el.getAttribute('data-experiment') || ACTIVE_EXPERIMENT.id,
    variant: el.getAttribute('data-variant') || CONTROL_VARIANT_ID,
  };
}

/** Convenience hook wrapper (for use in effects / handlers, not in render output). */
export function useVariant(): ResolvedVariant {
  return getResolvedVariant();
}
