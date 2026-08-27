import { useEffect } from 'react';
import { BookHeroAmazon } from '@/components/BookHeroAmazon';
import { AboutBook } from '@/components/AboutBook';
import { ReviewsCarousel } from '@/components/ReviewsCarousel';
import { CallToAction } from '@/components/CallToAction';
import { trackExperimentExposure } from '@/lib/track';

/**
 * Landing page — single buy-focused layout for ad traffic.
 *
 * The homespun client-side A/B framework (random localStorage assignment +
 * a "Loading…" gate) was removed: it forced a blank render before content
 * painted (a conversion killer on paid traffic) and was incompatible with
 * static prerendering. When behavior testing returns for the fuller site,
 * do it the SSG-safe way — variants resolved by URL/path or at the edge and
 * prerendered per variant — not random client assignment.
 */
const Index = () => {
  // Log the variant exposure once on the client (SSG-safe; guarded inside).
  useEffect(() => {
    trackExperimentExposure();
  }, []);

  return (
    <div className="min-h-screen bg-white pb-24 lg:pb-0">
      <BookHeroAmazon />
      <ReviewsCarousel />
      <AboutBook />
      <CallToAction />
    </div>
  );
};

export default Index;
