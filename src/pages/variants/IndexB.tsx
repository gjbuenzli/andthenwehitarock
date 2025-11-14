import React from 'react';
import { BookHeroAmazon } from '@/components/BookHeroAmazon';
import { AboutBook } from '@/components/AboutBook';
import { ReviewsCarousel } from '@/components/ReviewsCarousel';
import { CallToAction } from '@/components/CallToAction';

/**
 * Variant B: Amazon-Style Layout
 *
 * This variant features:
 * - Amazon-style book listing page (left: cover, right: details & buy buttons)
 * - Clean, familiar layout that mimics successful e-commerce patterns
 * - Vertical buy button stack on the right side
 * - Reviews section for social proof
 * - About and CTA sections below
 *
 * Testing hypothesis: Amazon's proven layout increases conversion by
 * providing a familiar, trusted shopping experience.
 */
const IndexB = () => {
  return (
    <div className="min-h-screen bg-white">
      <BookHeroAmazon />
      <ReviewsCarousel />
      <AboutBook />
      <CallToAction />
    </div>
  );
};

export default IndexB;
