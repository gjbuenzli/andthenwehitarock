import React from 'react';
import { useABTest } from '@/hooks/useABTest';
import IndexA from './variants/IndexA';
import IndexB from './variants/IndexB';
import IndexC from './variants/IndexC';

/**
 * Main Index Page with A/B Testing
 *
 * Automatically assigns users to variants based on configuration in:
 * /src/config/abTest.ts
 *
 * To force a specific variant, use URL parameter: ?variant=A (or B, C)
 */
const Index = () => {
  const { variant, isLoading, config } = useABTest();

  // Show loading state while determining variant
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-amber-50 to-blue-100">
        <div className="text-center">
          <div className="text-xl text-slate-600">Loading...</div>
        </div>
      </div>
    );
  }

  // Render the appropriate variant
  switch (variant) {
    case 'A':
      return <IndexA />;
    case 'B':
      return <IndexB />;
    case 'C':
      return <IndexC />;
    default:
      // Fallback to variant A if something goes wrong
      console.warn(`Unknown variant: ${variant}, falling back to A`);
      return <IndexA />;
  }
};

export default Index;
