import React from 'react';
import { BookHero } from '@/components/BookHero';
import { AboutBook } from '@/components/AboutBook';
import { ReviewsCarousel } from '@/components/ReviewsCarousel';
import { CallToAction } from '@/components/CallToAction';

/**
 * Variant C: Another Alternative Layout
 *
 * TODO: Customize this layout to test different approaches.
 * Ideas:
 * - Different section ordering
 * - Minimal layout (just hero + CTA)
 * - Story-focused (About first, then Hero)
 *
 * For now, this starts with CallToAction to test if immediate purchase
 * prompt improves conversion (bold strategy).
 */
const IndexC = () => {
  return (
    <div className="min-h-screen">
      <CallToAction />
      <BookHero />
      <AboutBook />
      <ReviewsCarousel />
    </div>
  );
};

export default IndexC;
