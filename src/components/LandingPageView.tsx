import React, { useEffect } from 'react';
import { trackExperimentExposure, trackPurchaseClick } from '@/lib/track';
import { amazonUrl, type LandingPage } from '@/config/landing';
import { BridgeLanding } from '@/components/BridgeLanding';

/**
 * A permanent, ad-addressable landing page (e.g. /kindle, /paperback,
 * /audiobook). Renders the shared BridgeLanding layout with the page's own
 * copy, format, and Associates tag. Attribution logs under `lp_<slug>` — its
 * own bucket, separate from the home A/B — and fires the FB InitiateCheckout
 * pixel so an audience-targeted ad pointed here can still optimize toward an
 * on-page conversion.
 */
export function LandingPageView({ page }: { page: LandingPage }) {
  const experiment = `lp_${page.slug}`;
  const href = amazonUrl(page.format, page.tag, experiment);

  useEffect(() => {
    trackExperimentExposure({ experiment, variant: 'page' });
  }, [experiment]);

  const onActivate = () =>
    trackPurchaseClick({
      retailer: page.format === 'audiobook' ? 'Audible' : 'Amazon',
      format: page.format.charAt(0).toUpperCase() + page.format.slice(1),
      location: experiment,
      ctaRank: 'primary',
      offer: page.format === 'kindle' ? 'ku_free' : 'buy',
      experiment,
      variant: 'page',
    });

  return (
    <BridgeLanding
      hook={page.hook}
      description={page.description}
      cta={page.cta}
      href={href}
      onActivate={onActivate}
    />
  );
}
