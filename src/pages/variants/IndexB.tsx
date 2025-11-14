import React from 'react';
import { BookHero } from '@/components/BookHero';
import { AboutBook } from '@/components/AboutBook';
import { ReviewsCarousel } from '@/components/ReviewsCarousel';
import { CallToAction } from '@/components/CallToAction';

/**
 * Variant B: Alternative Layout
 *
 * TODO: Customize this layout to test different approaches.
 * Ideas:
 * - Reorder sections (e.g., CallToAction before Reviews)
 * - Remove or add sections
 * - Use different components
 * - Change hero messaging or design
 *
 * For now, this uses Reviews first, then About, then Hero, then CTA
 * to test if social proof first improves conversions.
 */
const IndexB = () => {
  return (
    <div className="min-h-screen">
      <ReviewsCarousel />
      <BookHero />
      <AboutBook />
      <CallToAction />
    </div>
  );
};

export default IndexB;
