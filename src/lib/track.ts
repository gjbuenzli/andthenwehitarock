// Centralised buy-button tracking so every CTA across the page fires the same
// events with the same shape. Keeps the GA event (`purchase_button_click`) and
// the Meta pixel custom conversion (`PurchaseClick`) that the ad campaign
// optimizes toward — now with two extra dimensions:
//   cta_rank: which tier of the buy hierarchy was clicked (primary CTA vs a
//             demoted secondary/"more" link) — so we can measure whether
//             concentrating attention on one primary CTA actually works.
//   offer:    'ku_free' for the Kindle-Unlimited framing vs 'buy' otherwise.

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

export type CtaRank = 'primary' | 'secondary' | 'more';
export type OfferKind = 'ku_free' | 'buy';

export interface PurchaseClickArgs {
  retailer: string;
  format: string;
  location: string;
  ctaRank?: CtaRank;
  offer?: OfferKind;
}

export function trackPurchaseClick({
  retailer,
  format,
  location,
  ctaRank = 'secondary',
  offer = 'buy',
}: PurchaseClickArgs): void {
  if (typeof window === 'undefined') return;

  const payload = { retailer, format, location, cta_rank: ctaRank, offer };
  console.log('🎯 Purchase button clicked:', payload);

  if (window.gtag) {
    window.gtag('event', 'purchase_button_click', payload);
  } else {
    console.warn('⚠️ Google Analytics (gtag) not found');
  }

  if (window.fbq) {
    // Standard Meta event — first-class "conversion event" that Meta fully
    // supports for optimization + auto event configuration (clears the
    // "no conversion events set up" warning a custom event can't). Clicking a
    // buy button = initiating the purchase at the retailer.
    window.fbq('track', 'InitiateCheckout', {
      content_name: 'And Then We Hit a Rock',
      content_category: format,
      content_type: 'product',
      retailer,
    });

    // Custom event — carries the richer retailer/format/cta_rank/offer detail
    // the on-site funnel dashboard breaks down by.
    window.fbq('trackCustom', 'PurchaseClick', payload);
  }
}
