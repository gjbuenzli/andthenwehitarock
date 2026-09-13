import { useEffect } from 'react';
import { MinimalBridge } from '@/components/MinimalBridge';
import { trackExperimentExposure } from '@/lib/track';

/**
 * Home landing page — the PROMOTED winner of minimal_bridge_v3.
 *
 * That A/B concluded: minimal_listing (minimal bridge → paperback listing,
 * "Learn More") won on click rate, sales conversion, and orders. The home is now
 * that single promoted experience (experiment `home_promoted_v1`, one control) —
 * no A/B on `/` for now. The full landing page + the other minimal arms are
 * retired here (the format-specific designs live on as the /paperback,
 * /kindle-free, /kindle-buy, /audiobook ad-target pages).
 */
const Index = () => {
  // Log the exposure once (experiment/variant resolved by the inline engine).
  useEffect(() => {
    trackExperimentExposure();
  }, []);

  return <MinimalBridge variant="control" />;
};

export default Index;
