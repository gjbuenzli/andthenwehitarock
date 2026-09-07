import React from 'react';
import { trackPurchaseClick } from '@/lib/track';
import { MINIMAL_HOOK, MINIMAL_DESCRIPTION } from '@/config/experiments';
import { amazonUrl, VARIANT_TAGS } from '@/config/landing';
import { BridgeLanding } from '@/components/BridgeLanding';
import { Variant } from '@/features/experiments';

/**
 * The PROMOTED home landing experience: the minimal "bridge" page pointing to
 * Kindle Unlimited — winner of minimal_bridge_v1 (+96% conversion vs. the full
 * landing page). Cover, hook, ONE Amazon CTA above the fold, then the pitch.
 * This is now what every home visitor sees.
 *
 * Running experiment `cta_copy_v1` (surface: CTA button copy): the target and
 * Associates tag are FIXED (Kindle Unlimited) — only the button LABEL varies by
 * variant. All labels are prerendered inside the single <a> and CSS-gated by the
 * inline head script, so it stays SSG-safe (no flash, no hydration mismatch).
 * Attribution rides the resolved variant (getResolvedVariant), so each label's
 * conversion is measured independently.
 */
export function MinimalBridge() {
  // One KU target for all variants; the copy is the only thing under test.
  const href = amazonUrl('kindle', VARIANT_TAGS.control, 'home_bridge');

  const onActivate = () =>
    trackPurchaseClick({
      retailer: 'Amazon',
      format: 'Kindle',
      location: 'home_bridge',
      ctaRank: 'primary',
      offer: 'ku_free',
    });

  return (
    <BridgeLanding
      hook={MINIMAL_HOOK}
      description={MINIMAL_DESCRIPTION}
      cta={
        <>
          <Variant when="control">Learn More</Variant>
          <Variant when="ku_free">Read FREE in Kindle Unlimited</Variant>
          <Variant when="start_reading">Start Reading Free</Variant>
        </>
      }
      href={href}
      onActivate={onActivate}
    />
  );
}
