import React from 'react';
import bookCover from '@/assets/actual-book-cover.jpg';
import { handleBuyClick } from '@/lib/track';

/**
 * Shared presentational layout for the stripped-down "bridge" experiences.
 * Composition: HEADLINE first (never below the cover), then a hero row of
 * cover + CTA side by side, then the description. Used by the home A/B minimal
 * variants and the permanent audience pages. Purely presentational: the parent
 * owns the href, CTA label, tracking callback, and (optional) image badge.
 *
 * The CTA is a real <a target="_blank"> firing `onActivate` on the real click
 * (keepalive CAPI survives the nav) — never an auto-redirect.
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
  /** Optional value/trust graphic (e.g. the "Free on Kindle Unlimited" badge)
   *  shown ABOVE the button. It is decorative — the button is the clickable CTA. */
  badgeSrc?: string;
}) {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-5 py-10 lg:py-16">
        {/* Headline first — above the cover, never below it. */}
        <h1 className="max-w-3xl mx-auto sm:mx-0 text-center sm:text-left text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-gray-900">
          {hook}
        </h1>

        {/* Hero row: cover + CTA side by side (stacks on mobile). */}
        <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-10">
          <img
            src={bookCover}
            alt="And Then We Hit a Rock — book cover"
            className="w-44 sm:w-48 lg:w-56 shrink-0 rounded-lg shadow-xl"
            width={240}
            height={360}
          />

          <div className="flex w-full flex-col items-center sm:items-start">
            {badgeSrc ? (
              // Badge = a value/trust graphic (NOT the link — an image link isn't
              // intuitive). The filled button below is the actual clickable CTA.
              <div className="flex w-full flex-col items-center gap-3 sm:items-start">
                <img
                  src={badgeSrc}
                  alt="Free on Kindle Unlimited"
                  className="w-44 h-auto"
                  width={580}
                  height={440}
                />
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleBuyClick(href, onActivate)}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-12 py-4 rounded-xl bg-[#f3a847] hover:bg-[#e8952f] text-gray-900 text-lg font-bold shadow-md hover:shadow-lg transition-all"
                >
                  Start Reading Free
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            ) : (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleBuyClick(href, onActivate)}
                className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-xl bg-[#febd69] hover:bg-[#f3a847] text-gray-900 text-lg font-semibold shadow-md transition-colors"
              >
                {cta}
              </a>
            )}
          </div>
        </div>

        {/* Description — readable column below the hero. */}
        <div className="mt-10 lg:mt-14 max-w-3xl space-y-4 text-[15px] sm:text-base leading-relaxed text-gray-700">
          {description.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </main>
  );
}
