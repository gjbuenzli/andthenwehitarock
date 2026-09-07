import { useEffect } from 'react';
import { MinimalBridge } from '@/components/MinimalBridge';
import { trackExperimentExposure } from '@/lib/track';

/**
 * Landing page — a single buy-focused layout for ad traffic.
 *
 * minimal_bridge_v1 concluded: the minimal bridge → Kindle Unlimited won by
 * +96% conversion and is now the PROMOTED base every visitor sees (MinimalBridge).
 * The old full landing page (hero + reviews + about + CTA sections) is retired.
 *
 * The live test is now cta_copy_v1, which varies only the CTA button label
 * inside MinimalBridge — so there are no top-level variant branches here. Every
 * variant is prerendered; the inline head script sets html[data-variant] and CSS
 * shows the active label (SSG-safe, no flash, no hydration mismatch).
 */
const Index = () => {
  // Log the variant exposure once on the client (SSG-safe; guarded inside).
  useEffect(() => {
    trackExperimentExposure();
  }, []);

  return <MinimalBridge />;
};

export default Index;
