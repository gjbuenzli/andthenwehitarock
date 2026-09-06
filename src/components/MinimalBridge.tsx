import React from 'react';
import { trackPurchaseClick } from '@/lib/track';
import { MINIMAL_HOOK, MINIMAL_DESCRIPTION } from '@/config/experiments';
import { amazonUrl, VARIANT_TAGS } from '@/config/landing';
import { BridgeLanding } from '@/components/BridgeLanding';

/**
 * Minimal "bridge" variant of the home A/B experiment `minimal_bridge_v1`.
 * Two flavours differ only by where 'Learn More' points:
 *   listing → paperback /dp listing (tag atwhar01-20)
 *   ku      → Kindle / Kindle Unlimited (tag atwhar03-20)
 *
 * Attribution stays on the home experiment's resolved variant (no override), so
 * these clicks are measured against control in the funnel. Uses a static
 * per-variant tag derived from `target` — no document read, no hydration
 * mismatch. Renders the shared BridgeLanding layout.
 */
export function MinimalBridge({ target }: { target: 'listing' | 'ku' }) {
  const variantId = target === 'ku' ? 'minimal_ku' : 'minimal_listing';
  const format = target === 'ku' ? 'kindle' : 'paperback';
  const href = amazonUrl(format, VARIANT_TAGS[variantId], variantId);

  const onActivate = () =>
    trackPurchaseClick({
      retailer: 'Amazon',
      format: target === 'ku' ? 'Kindle' : 'Paperback',
      location: 'minimal_bridge',
      ctaRank: 'primary',
      offer: target === 'ku' ? 'ku_free' : 'buy',
    });

  return (
    <BridgeLanding
      hook={MINIMAL_HOOK}
      description={MINIMAL_DESCRIPTION}
      cta="Learn More"
      href={href}
      onActivate={onActivate}
    />
  );
}
