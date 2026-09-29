import { useEffect } from 'react';
import { ComboLanding } from '@/components/ComboLanding';
import { Variant } from '@/features/experiments';
import { trackExperimentExposure } from '@/lib/track';
import { VARIANT_TAGS } from '@/config/landing';

/**
 * Home — the "combo" landing (ComboLanding), run as the home_combo_v1 experiment.
 * The control is the current combo; variants test badge/CTA styling. Every variant
 * is prerendered; the inline head script sets html[data-variant] and CSS shows the
 * active one (SSG-safe, no flash, no hydration mismatch).
 */
const Index = () => {
  useEffect(() => {
    trackExperimentExposure();
  }, []);

  return (
    <>
      <Variant when="control">
        <ComboLanding tag={VARIANT_TAGS.control} />
      </Variant>
      <Variant when="kindle_burst">
        {/* Remove the KU corner badge; put the FREE starburst on the Kindle button. */}
        <ComboLanding tag={VARIANT_TAGS.minimal_ku} showKuCorner={false} kindleBadge="starburst" />
      </Variant>
      <Variant when="readers_burst">
        {/* 85K readers as a starburst instead of the circular seal. */}
        <ComboLanding tag={VARIANT_TAGS.minimal_listing} readersStyle="starburst" />
      </Variant>
      <Variant when="ku_lead">
        {/* Lead with a prominent "Read FREE on Kindle Unlimited" button. */}
        <ComboLanding tag={VARIANT_TAGS.kindle_buy} kuLeadCta />
      </Variant>
    </>
  );
};

export default Index;
