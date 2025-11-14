import React from 'react';
import { BookHero } from '@/components/BookHero';
import { AboutBook } from '@/components/AboutBook';
import { ReviewsCarousel } from '@/components/ReviewsCarousel';
import { CallToAction } from '@/components/CallToAction';

/**
 * Variant A: Control (Original Layout)
 *
 * This is the original homepage layout with:
 * - BookHero section at top
 * - AboutBook section
 * - ReviewsCarousel
 * - CallToAction section
 */
const IndexA = () => {
  return (
    <div className="min-h-screen">
      <BookHero />
      <AboutBook />
      <ReviewsCarousel />
      <CallToAction />
    </div>
  );
};

export default IndexA;
