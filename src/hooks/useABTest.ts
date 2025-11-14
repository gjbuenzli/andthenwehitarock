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
  const [variant, setVariant] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!abTestConfig.enabled) {
      // A/B testing disabled - use default variant
      setVariant(abTestConfig.variants[0].id);
      setIsLoading(false);
      return;
    }

    let hadStoredVariant = false;
    try {
      hadStoredVariant = localStorage.getItem(STORAGE_KEY) !== null;
    } catch (e) {
      console.warn('⚠️ Could not check localStorage for variant');
    }

    const assignedVariant = getOrAssignVariant();
    const isNewAssignment = !hadStoredVariant;

    setVariant(assignedVariant);
    setIsLoading(false);

    // Track in Google Analytics
    trackVariantAssignment(assignedVariant, isNewAssignment);
  }, []);

  return {
    variant,
    isLoading,
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
