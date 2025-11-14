/**
 * A/B Test Configuration
 *
 * Configure homepage variants and their traffic allocation.
 * Changes require a new deployment to take effect.
 */

export interface VariantConfig {
  id: string;
  name: string;
  weight: number; // Percentage (0-100)
  description?: string;
}

export interface ABTestConfig {
  enabled: boolean;
  testName: string;
  variants: VariantConfig[];
  // URL parameter to force a specific variant (e.g., ?variant=B)
  allowUrlOverride: boolean;
}

export const abTestConfig: ABTestConfig = {
  enabled: true,
  testName: 'homepage_layout_test_v1',
  allowUrlOverride: true,

  variants: [
    {
      id: 'A',
      name: 'Control',
      weight: 33.33,
      description: 'Original homepage layout'
    },
    {
      id: 'B',
      name: 'Variant B',
      weight: 33.33,
      description: 'Alternative layout B'
    },
    {
      id: 'C',
      name: 'Variant C',
      weight: 33.34,
      description: 'Alternative layout C'
    }
  ]
};

/**
 * Validate that variant weights sum to 100
 */
const totalWeight = abTestConfig.variants.reduce((sum, v) => sum + v.weight, 0);
if (Math.abs(totalWeight - 100) > 0.01) {
  console.warn(`⚠️ A/B Test weights sum to ${totalWeight}% instead of 100%`);
}
