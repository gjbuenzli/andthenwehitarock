import React from 'react';
import { BookHero } from '@/components/BookHero';
import { AboutBook } from '@/components/AboutBook';
import { ReviewsCarousel } from '@/components/ReviewsCarousel';
import { CallToAction } from '@/components/CallToAction';

const Index = () => {
  return (
    <div className="min-h-screen">
      <BookHero />
      <AboutBook />
      <ReviewsCarousel />
      <CallToAction />
    </div>
  );
};

export default Index;
