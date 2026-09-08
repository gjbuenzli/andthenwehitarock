import React, { useEffect } from 'react';
import { BookHeroAmazon } from '@/components/BookHeroAmazon';
import { AboutBook } from '@/components/AboutBook';
import { ReviewsCarousel } from '@/components/ReviewsCarousel';
import { CallToAction } from '@/components/CallToAction';
import { BridgeLanding } from '@/components/BridgeLanding';
import { Variant } from '@/features/experiments';
import { trackExperimentExposure, trackPurchaseClick } from '@/lib/track';
import { amazonUrl } from '@/config/landing';
import { MINIMAL_HOOK, MINIMAL_DESCRIPTION } from '@/config/experiments';
import type { PageExperiment, PageVariant } from '@/config/pageExperiments';

/**
 * A persistent, ad-addressable landing PAGE that is its own A/B experiment.
 * The inline engine (vite.config) bucketed the visitor by path and set
 * html[data-variant]/[data-experiment] to THIS page's experiment; every variant
 * is prerendered and CSS-gated, so the active one shows with no flash.
 *
 * Exposure + buy-click beacons read the resolved (experiment, variant) — so each
 * page reports as its own experiment in the funnel, and its variants are
 * differentiated on-site. Page-level SALES ride the page's single tag (per the
 * chosen strategy); give a variant its own tag when you want per-variant sales.
 */
function BridgeVariantBlock({ page, v }: { page: PageExperiment; v: PageVariant }) {
  const format = page.format ?? 'paperback';
  const href = amazonUrl(format, page.tag, `${page.experimentId}:${v.id}`);
  const isFreeKu = format === 'kindle' && /free|\bku\b/i.test(v.cta ?? '');
  const onActivate = () =>
    trackPurchaseClick({
      retailer: format === 'audiobook' ? 'Audible' : 'Amazon',
      format: format.charAt(0).toUpperCase() + format.slice(1),
      location: page.experimentId,
      ctaRank: 'primary',
      offer: isFreeKu ? 'ku_free' : 'buy',
    });
  return (
    <BridgeLanding
      hook={MINIMAL_HOOK}
      description={MINIMAL_DESCRIPTION}
      cta={v.cta ?? page.name}
      href={href}
      onActivate={onActivate}
    />
  );
}

export function LandingPageView({ page }: { page: PageExperiment }) {
  // Fire once — reads the per-page experiment/variant the engine resolved.
  useEffect(() => {
    trackExperimentExposure();
  }, []);

  if (page.layout === 'full') {
    // Full landing page (all formats), tagged with the page's own tag.
    return (
      <>
        {page.variants.map((v) => (
          <Variant key={v.id} when={v.id}>
            <div className="min-h-screen bg-white pb-24 lg:pb-0">
              <BookHeroAmazon tag={page.tag} />
              <ReviewsCarousel />
              <AboutBook />
              <CallToAction tag={page.tag} />
            </div>
          </Variant>
        ))}
      </>
    );
  }

  return (
    <>
      {page.variants.map((v) => (
        <Variant key={v.id} when={v.id}>
          <BridgeVariantBlock page={page} v={v} />
        </Variant>
      ))}
    </>
  );
}
