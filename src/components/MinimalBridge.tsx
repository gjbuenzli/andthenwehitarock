import React from 'react';
import bookCover from '@/assets/actual-book-cover.jpg';
import { useAmazonLinks } from '@/hooks/useAmazonLinks';
import { trackPurchaseClick } from '@/lib/track';
import { MINIMAL_HOOK, MINIMAL_DESCRIPTION } from '@/config/experiments';

/**
 * Minimal "bridge" landing variant (experiment `minimal_bridge_v1`).
 *
 * Deliberately stripped to the bone — cover, the ad's own description, and ONE
 * 'Learn More' link to Amazon — to test whether cold ad traffic converts better
 * without the full multi-section page. Two targets:
 *   listing → the book's Amazon listing (main /dp, print edition)
 *   ku      → Read FREE in Kindle Unlimited (Kindle edition)
 *
 * The CTA is kept ABOVE THE FOLD on both mobile and desktop: on desktop it sits
 * in the left hero column beside the description; on mobile it's directly under
 * the hook (before the long description) AND pinned as a sticky bottom bar so
 * it's always on screen.
 *
 * The 'Learn More' click fires the SAME InitiateCheckout / PurchaseClick +
 * server-side CAPI tracking as the full page's buy buttons, so this variant's
 * conversion rate is measured like-for-like against control in the funnel. It's
 * a real <a> (navigation happens natively) firing on pointer-down so the beacon
 * survives navigation — never an auto-redirect (that would be a disqualified
 * "Redirecting Link" under the Associates agreement; the customer takes the
 * affirmative click here).
 */
export function MinimalBridge({ target }: { target: 'listing' | 'ku' }) {
  const links = useAmazonLinks();
  const href = target === 'ku' ? links.amazon.kindleUrl : links.amazon.paperbackUrl;
  // Same label on both minimal variants — they differ ONLY by where 'Learn More'
  // points (Amazon listing vs Kindle Unlimited), so the test isn't confounded by
  // different button copy.
  const label = 'Learn More';

  const track = () =>
    trackPurchaseClick({
      retailer: 'Amazon',
      format: target === 'ku' ? 'Kindle' : 'Paperback',
      location: 'minimal_bridge',
      ctaRank: 'primary',
      offer: target === 'ku' ? 'ku_free' : 'buy',
    });

  const LearnMore = ({ className = '' }: { className?: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerDown={track}
      onClick={track}
      className={`inline-flex items-center justify-center px-10 py-4 rounded-xl bg-[#febd69] hover:bg-[#f3a847] text-gray-900 text-lg font-semibold shadow-md transition-colors ${className}`}
    >
      {label}
    </a>
  );

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
          <h1 className="mt-6 text-2xl sm:text-3xl font-bold leading-snug text-gray-900">
            {MINIMAL_HOOK}
          </h1>
          <LearnMore className="mt-7 w-full sm:w-auto" />
          <p className="mt-3 text-sm text-gray-400">Opens Amazon in a new tab</p>
        </div>

        {/* Description column — the ad's own copy. Below the hero on mobile. */}
        <div className="mt-10 lg:mt-0 space-y-4 text-left text-[15px] sm:text-base leading-relaxed text-gray-700">
          {MINIMAL_DESCRIPTION.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
