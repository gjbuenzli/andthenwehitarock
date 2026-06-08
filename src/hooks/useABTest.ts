import { useEffect, useState } from 'react';
import { abTestConfig, VariantConfig } from '@/config/abTest';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const STORAGE_KEY = 'ab_test_variant';

/**
 * Get variant from URL parameter
 */
function getUrlVariant(): string | null {
  if (!abTestConfig.allowUrlOverride) return null;

  const params = new URLSearchParams(window.location.search);
  const variant = params.get('variant');

  if (variant) {
    const validVariant = abTestConfig.variants.find(
      v => v.id.toLowerCase() === variant.toLowerCase()
    );
    return validVariant ? validVariant.id : null;
  }

  return null;
}

/**
 * Assign a random variant based on configured weights
 */
function assignRandomVariant(): string {
  const random = Math.random() * 100;
  let cumulative = 0;

  for (const variant of abTestConfig.variants) {
    cumulative += variant.weight;
    if (random <= cumulative) {
      return variant.id;
    }
  }

  // Fallback to first variant
  return abTestConfig.variants[0].id;
}

/**
 * Get or assign variant for this user
 */
function getOrAssignVariant(): string {
  try {
    // Check URL override first
    const urlVariant = getUrlVariant();
    if (urlVariant) {
      console.log('🎯 A/B Test: Variant forced via URL:', urlVariant);
      // Store it so they keep seeing this variant
      try {
        localStorage.setItem(STORAGE_KEY, urlVariant);
      } catch (e) {
        console.warn('⚠️ Could not save variant to localStorage');
      }
      return urlVariant;
    }

    // Check if user already has a variant assigned
    const storedVariant = localStorage.getItem(STORAGE_KEY);
    if (storedVariant) {
      // Validate stored variant still exists in config
      const isValid = abTestConfig.variants.some(v => v.id === storedVariant);
      if (isValid) {
        console.log('🎯 A/B Test: Returning user with variant:', storedVariant);
        return storedVariant;
      }
    }

    // New user - assign random variant
    const newVariant = assignRandomVariant();
    try {
      localStorage.setItem(STORAGE_KEY, newVariant);
    } catch (e) {
      console.warn('⚠️ Could not save variant to localStorage');
    }
    console.log('🎯 A/B Test: New user assigned to variant:', newVariant);

    return newVariant;
  } catch (error) {
    // Fallback if localStorage is completely unavailable
    console.error('⚠️ Error accessing localStorage, using fallback variant U');
    return 'U';
  }
}

/**
 * Track variant assignment in Google Analytics
 */
function trackVariantAssignment(variant: string, isNewAssignment: boolean) {
  if (window.gtag) {
    // Set user property for variant (persists across all events)
    window.gtag('set', 'user_properties', {
      ab_test_variant: variant,
      ab_test_name: abTestConfig.testName
    });

    // Track assignment event (only for new assignments)
    if (isNewAssignment) {
      window.gtag('event', 'ab_test_assigned', {
        test_name: abTestConfig.testName,
        variant: variant
      });
    }

    console.log('✅ A/B Test variant sent to Google Analytics:', variant);
  }
}

/**
 * Hook to get current A/B test variant
 */
export function useABTest() {
  // Resolve the variant SYNCHRONOUSLY on first render — URL param, localStorage,
  // and Math.random are all available at render time in this client-only SPA.
  // Doing it in a useEffect (the old way) forced a "Loading…" spinner for a
  // render cycle before any content showed — a real conversion killer for ad
  // traffic. No spinner now: content paints immediately.
  const [resolved] = useState(() => {
    if (!abTestConfig.enabled) {
      return { variant: abTestConfig.variants[0].id, isNewAssignment: false };
    }
    let hadStoredVariant = false;
    try {
      hadStoredVariant = localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      // localStorage unavailable — treat as a fresh assignment.
    }
    return { variant: getOrAssignVariant(), isNewAssignment: !hadStoredVariant };
  });

  // GA tracking is a side effect — fire once after mount; it doesn't block paint.
  useEffect(() => {
    trackVariantAssignment(resolved.variant, resolved.isNewAssignment);
  }, [resolved.variant, resolved.isNewAssignment]);

  return {
    variant: resolved.variant,
    isLoading: false,
    config: abTestConfig
  };
}

/**
 * Track conversion (button click) with variant info
 */
export function trackConversion(conversionType: string, metadata?: Record<string, any>) {
  let variant = 'U';

  try {
    variant = localStorage.getItem(STORAGE_KEY) || 'U';
  } catch (e) {
    console.warn('⚠️ localStorage not available, variant will be "U"');
  }

  if (window.gtag) {
    window.gtag('event', 'ab_test_conversion', {
      test_name: abTestConfig.testName,
      variant: variant,
      conversion_type: conversionType,
      ...metadata
    });

    console.log('✅ A/B Test conversion tracked:', {
      variant,
      type: conversionType,
      ...metadata
    });
  }
}
