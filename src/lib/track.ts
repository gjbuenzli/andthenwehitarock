// Centralised buy-button tracking so every CTA across the page fires the same
// events with the same shape. Keeps the GA event (`purchase_button_click`) and
// the Meta pixel custom conversion (`PurchaseClick`) that the ad campaign
// optimizes toward — now with two extra dimensions:
//   cta_rank: which tier of the buy hierarchy was clicked (primary CTA vs a
//             demoted secondary/"more" link) — so we can measure whether
//             concentrating attention on one primary CTA actually works.
//   offer:    'ku_free' for the Kindle-Unlimited framing vs 'buy' otherwise.
//
// InitiateCheckout is now sent through TWO channels for redundancy:
//   1. the browser Meta Pixel (as before), and
//   2. a server-side copy via the Conversions API (a tiny AWS Lambda — see
//      /capi-lambda). Both carry the SAME `event_id` so Meta deduplicates them.
// The server copy recovers clicks the browser pixel loses to ad blockers,
// iOS/ATT, Safari ITP, and — most relevant here — the redirect race, where the
// browser navigates to Amazon before the pixel beacon finishes. The fetch uses
// `keepalive: true` so it survives that navigation.

import { getResolvedVariant } from '@/features/experiments/useVariant';

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

// Conversions API endpoint (the Lambda Function URL). Injected at build time as
// VITE_CAPI_URL; when unset (e.g. local dev) the server copy is silently
// skipped and only the browser pixel fires.
const CAPI_URL = (import.meta.env.VITE_CAPI_URL as string | undefined) || '';

const BOOK_TITLE = 'And Then We Hit a Rock';

// Per-format InitiateCheckout value (USD). DELIBERATELY EMPTY — do not fill.
// Meta's "send higher quality price & currency data" action wants value+currency,
// but this is an affiliate model: real revenue is Associates commission + KDP
// royalty, not retail price, so a per-click retail value would bias optimization.
// Decision (2026-08-25): send no value/currency. The plumbing below stays so a
// real per-format value can be turned on later if the model changes — attaching
// value+currency only for formats present in this map (keys = Format.format).
const FORMAT_VALUE_USD: Record<string, number> = {};

/** Read a browser cookie by name, or undefined. */
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * Meta's click identifier. The Pixel normally writes `_fbc` after a visit that
 * carries an `fbclid` query param; if the cookie isn't there yet we synthesize
 * it from the current URL's `fbclid` in Meta's required `fb.1.<ts>.<fbclid>`
 * format so the very first landing click still matches.
 */
function getFbc(): string | undefined {
  const cookie = getCookie('_fbc');
  if (cookie) return cookie;
  if (typeof window === 'undefined') return undefined;
  const fbclid = new URLSearchParams(window.location.search).get('fbclid');
  if (!fbclid) return undefined;
  return `fb.1.${Date.now()}.${fbclid}`;
}

/** A per-event id shared by the pixel and the server event for dedup. */
function newEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `ic-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * The stable first-party id set at pixel init (see index.html). Sent with the
 * server event as `external_id` so browser + server share one identifier —
 * raises Event Match Quality and helps Meta pair the two channels for dedup.
 * Not PII: an opaque random UUID.
 */
function getExternalId(): string | undefined {
  return getCookie('_bmid');
}

/**
 * Fire-and-forget server-side InitiateCheckout. `keepalive` lets the request
 * outlive the page navigating to the retailer. Never throws — tracking must
 * never block or break a buy click.
 */
function sendServerEvent(
  eventId: string,
  custom: Record<string, unknown>,
  exp: { experiment: string; variant: string },
): void {
  if (!CAPI_URL) return;
  try {
    void fetch(CAPI_URL, {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // `type` lets the CAPI relay both forward to Meta AND log a first-party
        // per-variant conversion row (see /capi-lambda). Top-level experiment/
        // variant so the relay can index without parsing custom_data.
        type: 'initiate_checkout',
        experiment: exp.experiment,
        variant: exp.variant,
        event_id: eventId,
        event_source_url: window.location.href,
        fbp: getCookie('_fbp'),
        fbc: getFbc(),
        external_id: getExternalId(),
        custom_data: custom,
      }),
    }).catch(() => {});
  } catch {
    /* ignore — the browser pixel still fired */
  }
}

/**
 * Fire once per session when a visitor is bucketed into an experiment variant.
 * Sends a lightweight first-party "exposure" beacon to the CAPI relay (logged
 * to DynamoDB, NOT forwarded to Meta) so BookManager can compute per-variant
 * conversion RATES, and tags GA so behavior is segmentable there too.
 */
export function trackExperimentExposure(): void {
  if (typeof window === 'undefined') return;
  const { experiment, variant } = getResolvedVariant();

  if (window.gtag) {
    window.gtag('event', 'experiment_exposure', { experiment, variant });
  }

  if (!CAPI_URL) return;
  try {
    const key = `abx:${experiment}:${variant}`;
    if (sessionStorage.getItem(key)) return; // one exposure per session
    sessionStorage.setItem(key, '1');
  } catch {
    /* sessionStorage unavailable — still beacon at least once */
  }
  try {
    void fetch(CAPI_URL, {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'exposure',
        experiment,
        variant,
        external_id: getExternalId(),
        event_source_url: window.location.href,
      }),
    }).catch(() => {});
  } catch {
    /* ignore */
  }
}

export function trackPurchaseClick({
  retailer,
  format,
  location,
  ctaRank = 'secondary',
  offer = 'buy',
}: PurchaseClickArgs): void {
  if (typeof window === 'undefined') return;

  const exp = getResolvedVariant();
  const payload = {
    retailer, format, location, cta_rank: ctaRank, offer,
    experiment: exp.experiment, variant: exp.variant,
  };
  console.log('🎯 Purchase button clicked:', payload);

  if (window.gtag) {
    window.gtag('event', 'purchase_button_click', payload);
  } else {
    console.warn('⚠️ Google Analytics (gtag) not found');
  }

  // One id ties the browser pixel event to its server-side twin for dedup.
  const eventId = newEventId();

  const icData: Record<string, unknown> = {
    content_name: BOOK_TITLE,
    content_category: format,
    content_type: 'product',
    retailer,
    variant: exp.variant,
    experiment: exp.experiment,
  };

  // Attach value + currency only when a real per-format value is configured
  // (see FORMAT_VALUE_USD). Sent on both the browser pixel and the server copy
  // so the deduped event carries consistent value data for value optimization.
  const value = FORMAT_VALUE_USD[format];
  if (typeof value === 'number') {
    icData.value = value;
    icData.currency = 'USD';
  }

  if (window.fbq) {
    // Standard Meta event — first-class "conversion event" that Meta fully
    // supports for optimization + auto event configuration (clears the
    // "no conversion events set up" warning a custom event can't). Clicking a
    // buy button = initiating the purchase at the retailer. The 4th arg pins
    // the eventID so Meta dedupes this against the server copy below.
    window.fbq('track', 'InitiateCheckout', icData, { eventID: eventId });

    // Custom event — carries the richer retailer/format/cta_rank/offer detail
    // the on-site funnel dashboard breaks down by. Browser-only (not optimized
    // toward, so no server copy needed).
    window.fbq('trackCustom', 'PurchaseClick', payload);
  }

  // Server-side copy of the standard InitiateCheckout via the Conversions API.
  sendServerEvent(eventId, icData, exp);
}
