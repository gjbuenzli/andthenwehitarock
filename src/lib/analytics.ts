// Reusable GA4 event layer for the content site, so we can see "what's
// working" — which sections get read, which affiliate links get clicked, and
// the cross-sell paths between content and the book. Mirrors the buy-button
// tracking in track.ts. GA sees the CLICK, not the Amazon purchase — revenue
// truth still lives in KDP (book) + the Associates dashboard (gear).

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/** Low-level GA4 event. Safe during SSR (no-op when window is absent). */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  if (window.gtag) window.gtag('event', name, params);
}

/** Any outbound affiliate link (book OR gear) — the cross-sell money metric. */
export function trackAffiliateClick(p: {
  item: string;
  section: string; // 'gear' | 'chapters' | 'blog' | 'gallery' | 'lander'
  destination?: string; // 'amazon' | ...
}): void {
  trackEvent('outbound_affiliate_click', { destination: 'amazon', ...p });
}

/** A meaningful content interaction (chapter expand, gallery open, post read). */
export function trackContent(action: string, params: Record<string, unknown> = {}): void {
  trackEvent('content_engagement', { action, ...params });
}

/** Internal navigation between site sections — reveals cross-sell paths. */
export function trackNav(to: string, from: string): void {
  trackEvent('internal_nav', { to, from });
}
