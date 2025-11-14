import React from 'react';
import { BookHeroAmazon } from '@/components/BookHeroAmazon';
import { AboutBook } from '@/components/AboutBook';
import { ReviewsCarousel } from '@/components/ReviewsCarousel';
import { CallToAction } from '@/components/CallToAction';

/**
 * Variant C: Amazon-Style Layout (Baseline)
 *
 * This variant currently matches Variant B (Amazon-style layout).
 * Ready for customization to test different approaches.
 *
 * Current structure:
 * - Amazon-style book listing page (3-column layout)
 * - Reviews section for social proof
 * - About and CTA sections below
 *
 * Next customization options:
 * - Different section ordering
 * - Modified hero content
 * - Alternative purchase flow
 */
const IndexC = () => {
  return (
    <div className="min-h-screen bg-white">
      <BookHeroAmazon />
      <ReviewsCarousel />
      <AboutBook />
      <CallToAction />
    </div>
  );
};

export default IndexC;
