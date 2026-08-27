import type { ReactNode } from 'react';

interface VariantProps {
  /**
   * The variant id(s) this block should show for. Pass a single id ("urgency")
   * or several ("control urgency") for shared blocks.
   */
  when: string | string[];
  children: ReactNode;
}

/**
 * SSG-safe variant gate.
 *
 * ALWAYS renders its children so `vite-react-ssg` prerenders every variant into
 * the static HTML and hydration matches on every client. Which block is VISIBLE
 * is decided purely by CSS keyed off the `<html data-variant>` attribute that
 * the inline head script sets before first paint — so there is no flash and no
 * hydration mismatch.
 *
 * Wrap only the parts that DIFFER between variants; shared content stays
 * outside. The gating CSS is injected inline in <head> (see vite.config.ts):
 *   [data-v]{display:none}
 *   html[data-variant="X"] [data-v~="X"]{display:contents}
 */
export function Variant({ when, children }: VariantProps) {
  const ids = Array.isArray(when) ? when.join(' ') : when;
  return (
    <div className="exp-variant" data-v={ids}>
      {children}
    </div>
  );
}
