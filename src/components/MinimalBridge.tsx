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
 * The 'Learn More' click fires the SAME InitiateCheckout / PurchaseClick +
 * server-side CAPI tracking as the full page's buy buttons, so this variant's
 * conversion rate is measured like-for-like against control in the funnel.
 * It's a real <a> (navigation happens natively) and fires on pointer-down so the
 * beacon survives the navigation — never an auto-redirect (that would make it a
 * disqualified "Redirecting Link" under the Associates agreement; the customer
 * takes the affirmative click here).
 */
export function MinimalBridge({ target }: { target: 'listing' | 'ku' }) {
  const links = useAmazonLinks();
  const href = target === 'ku' ? links.amazon.kindleUrl : links.amazon.paperbackUrl;
  const cta = target === 'ku' ? 'Read FREE in Kindle Unlimited' : 'Learn More on Amazon';

  const track = () =>
    trackPurchaseClick({
      retailer: 'Amazon',
      format: target === 'ku' ? 'Kindle' : 'Paperback',
      location: 'minimal_bridge',
      ctaRank: 'primary',
      offer: target === 'ku' ? 'ku_free' : 'buy',
    });

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-5 py-10 sm:py-14">
      <div className="w-full max-w-xl mx-auto text-center">
        <img
          src={bookCover}
          alt="And Then We Hit a Rock — book cover"
          className="w-48 sm:w-56 mx-auto rounded-lg shadow-xl"
          width={224}
          height={336}
        />

        <h1 className="mt-8 text-2xl sm:text-3xl font-bold leading-snug text-gray-900">
          {MINIMAL_HOOK}
        </h1>

        <div className="mt-6 space-y-4 text-left text-[15px] sm:text-base leading-relaxed text-gray-700">
          {MINIMAL_DESCRIPTION.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-9">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onPointerDown={track}
            onClick={track}
            className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-4 rounded-xl bg-[#febd69] hover:bg-[#f3a847] text-gray-900 text-lg font-semibold shadow-md transition-colors"
          >
            {cta}
          </a>
          <p className="mt-3 text-sm text-gray-400">Opens Amazon in a new tab</p>
        </div>
      </div>
    </main>
  );
}
