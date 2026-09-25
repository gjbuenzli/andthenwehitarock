import React from 'react';
import bookCover from '@/assets/actual-book-cover.jpg';
import { handleBuyClick } from '@/lib/track';

/**
 * Shared presentational layout for the stripped-down "bridge" experiences —
 * cover, hook, ONE Amazon CTA (above the fold on mobile + desktop), then the
 * description. Used by both the home A/B minimal variants and the permanent
 * audience-targeted pages (/kindle, /paperback, /audiobook). Purely
 * presentational: the parent owns the href, the CTA label, and the tracking
 * callback (which decides the tag + attribution bucket).
 *
 * The CTA is a real <a target="_blank"> firing `onActivate` on pointer-down so
 * the beacon survives navigation — never an auto-redirect (that would be a
 * disqualified "Redirecting Link" under the Associates agreement; the visitor
 * takes the affirmative click here).
 */
export function BridgeLanding({
  hook,
  description,
  cta,
  href,
  onActivate,
  badgeSrc,
}: {
  hook: string;
  description: string[];
  cta: string;
  href: string;
  onActivate: () => void;
  /** Optional image CTA (e.g. the "Free on Kindle Unlimited" badge). When set it
   *  REPLACES the text button and the whole badge is the clickable buy link. */
  badgeSrc?: string;
}) {
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-5xl mx-auto px-5 py-8 lg:py-12 grid lg:grid-cols-2 lg:gap-14 lg:items-center lg:min-h-[80vh]">
        {/* Hero column — cover, hook, CTA. On mobile this is the first screen. */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <img
            src={bookCover}
            alt="And Then We Hit a Rock — book cover"
            className="w-40 sm:w-44 lg:w-60 rounded-lg shadow-xl"
            width={240}
            height={360}
          />
          <h1 className="mt-6 text-2xl sm:text-3xl font-bold leading-snug text-gray-900">{hook}</h1>
          {/* Fire ONCE on the real click (keepalive CAPI survives the nav). NOT
              pointer-down: that counted scroll-starts / cancelled taps as buy clicks
              and inflated InitiateCheckout ~2–3× over real Amazon arrivals. In-app
              browsers get a forced same-tab nav so the click actually lands. */}
          {badgeSrc ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={cta}
              onClick={handleBuyClick(href, onActivate)}
              className="mt-7 inline-block w-full max-w-[340px] rounded-2xl transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <img src={badgeSrc} alt={cta} className="w-full h-auto" width={580} height={440} />
            </a>
          ) : (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleBuyClick(href, onActivate)}
              className="mt-7 w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-xl bg-[#febd69] hover:bg-[#f3a847] text-gray-900 text-lg font-semibold shadow-md transition-colors"
            >
              {cta}
            </a>
          )}
        </div>

        {/* Description column — the pitch. Below the hero on mobile. */}
        <div className="mt-10 lg:mt-0 space-y-4 text-left text-[15px] sm:text-base leading-relaxed text-gray-700">
          {description.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
