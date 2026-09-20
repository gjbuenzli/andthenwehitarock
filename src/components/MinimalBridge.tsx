import React from 'react';
import { trackPurchaseClick, type OfferKind } from '@/lib/track';
import { MINIMAL_HOOK, MINIMAL_DESCRIPTION } from '@/config/experiments';
import { amazonUrl, VARIANT_TAGS, type BookFormat } from '@/config/landing';
import { BridgeLanding } from '@/components/BridgeLanding';

/**
 * Minimal "bridge" arms of the home A/B (minimal_bridge_v3). Same layout; each
 * arm differs by its Amazon target + CTA framing, and carries its own tracking
 * tag (VARIANT_TAGS) so per-variant SALES are measured on Amazon:
 *   minimal_listing → paperback listing, "Get the Paperback"        [atwhar01]
 *   minimal_ku      → Kindle, "Read FREE in Kindle Unlimited"       [atwhar03]
 *   kindle_buy      → Kindle (same ASIN), "Buy the Kindle Edition"  [atwhar08]
 * The two Kindle arms point at the SAME product and differ ONLY in framing —
 * the buy-vs-free-KU test (free KU clicks became borrows, not purchases).
 *
 * Fires ONCE on pointer-down (see BridgeLanding) — no double-count. Static
 * per-variant tag (no document read) → SSG-safe, no hydration mismatch.
 */
type BridgeVariant = 'minimal_listing' | 'minimal_ku' | 'kindle_buy';

const ARMS: Record<BridgeVariant, { format: BookFormat; label: string; cta: string; offer: OfferKind }> = {
  minimal_listing: { format: 'paperback', label: 'Paperback', cta: 'Learn More', offer: 'buy' },
  minimal_ku: { format: 'kindle', label: 'Kindle', cta: 'Read FREE in Kindle Unlimited', offer: 'ku_free' },
  kindle_buy: { format: 'kindle', label: 'Kindle', cta: 'Buy the Kindle Edition', offer: 'buy' },
};

export function MinimalBridge({ variant }: { variant: BridgeVariant }) {
  const arm = ARMS[variant];
  const href = amazonUrl(arm.format, VARIANT_TAGS[variant], variant);

  const onActivate = () =>
    trackPurchaseClick({
      retailer: 'Amazon',
      format: arm.label,
      location: 'minimal_bridge',
      ctaRank: 'primary',
      offer: arm.offer,
    });

  return (
    <BridgeLanding
      hook={MINIMAL_HOOK}
      description={MINIMAL_DESCRIPTION}
      cta={arm.cta}
      href={href}
      onActivate={onActivate}
    />
  );
}
