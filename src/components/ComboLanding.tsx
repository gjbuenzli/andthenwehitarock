import React from 'react';
import bookCover from '@/assets/actual-book-cover.jpg';
import { FormatButtons } from '@/components/FormatButtons';
import { useAmazonLinks } from '@/hooks/useAmazonLinks';
import { trackPurchaseClick, handleBuyClick } from '@/lib/track';
import { VARIANT_TAGS } from '@/config/landing';
import { MINIMAL_DESCRIPTION } from '@/config/experiments';
import { type Format, type Retailer } from '@/config/buyOptions';

/** Starburst polygon points (centered in a 100×100 viewBox). */
export function burstPoints(spikes: number, outer: number, inner: number, c = 50): string {
  const pts: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / spikes) * i - Math.PI / 2;
    pts.push(`${(c + r * Math.cos(a)).toFixed(1)},${(c + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(' ');
}

/** ★4.2 rating row. */
function Stars() {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="flex text-amber-400 text-xl leading-none" aria-hidden="true">
        <span>⭐⭐⭐⭐</span>
        <span className="relative">
          <span className="text-gray-300">☆</span>
          <span className="absolute left-0 top-0 overflow-hidden w-[50%]">⭐</span>
        </span>
      </span>
      <span className="text-slate-700 text-sm font-medium">4.2/5 · 7,689 ratings</span>
    </div>
  );
}

/** Upper-right corner: "FREE" starburst with the kindle-unlimited wordmark below. */
function FreeBurst() {
  return (
    <div className="pointer-events-none absolute -top-8 -right-14 flex flex-col items-center rotate-[6deg]">
      <svg viewBox="0 0 100 100" className="relative z-10 h-[58px] w-[58px] sm:h-[66px] sm:w-[66px] drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]">
        <polygon points={burstPoints(13, 47, 36)} fill="#F5821F" stroke="#ffffff" strokeWidth="2.5" strokeLinejoin="round" />
        <text x="50" y="53" textAnchor="middle" dominantBaseline="middle" fontSize="25" fontStyle="italic" className="fill-white font-extrabold">FREE</text>
      </svg>
      <div className="-mt-2 rounded-md bg-white px-2 py-1 text-[11px] font-extrabold lowercase leading-none tracking-tight shadow-md ring-1 ring-black/5">
        <span style={{ color: '#F5821F' }}>kindle</span>
        <span style={{ color: '#333F48' }}>unlimited</span>
      </div>
    </div>
  );
}

/** Upper-left corner: "85K+ readers" — a navy circular seal OR a navy starburst. */
function ReadersBadge({ style }: { style: 'seal' | 'starburst' }) {
  return (
    <div className="pointer-events-none absolute -top-8 -left-6 rotate-[-6deg] drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]">
      <svg viewBox="0 0 100 100" className="h-[58px] w-[58px] sm:h-[66px] sm:w-[66px]">
        {style === 'starburst' ? (
          <polygon points={burstPoints(14, 47, 37)} fill="#2C3E50" stroke="#ffffff" strokeWidth="2.5" strokeLinejoin="round" />
        ) : (
          <>
            <circle cx="50" cy="50" r="46" fill="#2C3E50" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
          </>
        )}
        <text x="50" y="45" textAnchor="middle" dominantBaseline="middle" fontSize="21" className="fill-white font-extrabold">85K+</text>
        <text x="50" y="62" textAnchor="middle" dominantBaseline="middle" fontSize="10" letterSpacing="1.2" className="fill-white font-bold">READERS</text>
      </svg>
    </div>
  );
}

export interface ComboLandingProps {
  tag?: string;
  /** Show the FREE·KU starburst on the cover's upper-right corner. */
  showKuCorner?: boolean;
  /** Upper-left readers badge shape. */
  readersStyle?: 'seal' | 'starburst';
  /** The Kindle format button's FREE badge — a pill or a mini starburst. */
  kindleBadge?: 'pill' | 'starburst';
  /** Lead with a prominent "Read FREE on Kindle Unlimited" button above the grid. */
  kuLeadCta?: boolean;
}

/**
 * The "standard" combo home: title → byline → cover (corner badges) → stars →
 * [optional KU-lead button] → 3 format buttons → description → repeat CTA.
 * Variant-configurable for the home_combo_v1 experiment.
 */
export function ComboLanding({
  tag = VARIANT_TAGS.control,
  showKuCorner = true,
  readersStyle = 'seal',
  kindleBadge = 'pill',
  kuLeadCta = false,
}: ComboLandingProps = {}) {
  const links = useAmazonLinks(tag);
  const track = (format: Format, retailer: Retailer) =>
    trackPurchaseClick({
      retailer: retailer.name,
      format: format.format,
      location: 'home_combo',
      ctaRank: 'primary',
      offer: retailer.offer,
    });

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-xl mx-auto px-5 py-10 lg:py-14 flex flex-col items-center text-center">
        {/* Title + byline */}
        <h1 className="text-xl sm:text-2xl font-bold leading-tight text-gray-900">
          A family of five, a dog, and a cat move onto a sailboat.
        </h1>
        <p className="mt-2 font-serif italic text-base sm:text-lg text-slate-500">
          A hilarious true story.
        </p>

        {/* Cover with corner badges */}
        <div className="relative mt-6 w-48 sm:w-56">
          <img
            src={bookCover}
            alt="And Then We Hit a Rock — book cover"
            className="w-full rounded-lg shadow-xl"
            width={240}
            height={360}
          />
          <ReadersBadge style={readersStyle} />
          {showKuCorner && <FreeBurst />}
        </div>

        {/* Stars */}
        <div className="mt-4">
          <Stars />
        </div>

        {/* Optional KU-lead primary CTA */}
        {kuLeadCta && (
          <a
            href={links.amazon.kindleUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleBuyClick(links.amazon.kindleUrl, () =>
              trackPurchaseClick({ retailer: 'Amazon', format: 'Kindle', location: 'home_combo', ctaRank: 'primary', offer: 'ku_free' }),
            )}
            className="mt-6 w-full max-w-sm inline-flex items-center justify-center gap-2 rounded-xl bg-[#f3a847] hover:bg-[#e8952f] px-8 py-4 text-lg font-bold text-gray-900 shadow-md transition-colors"
          >
            Read FREE on Kindle Unlimited
          </a>
        )}

        {/* Format buttons */}
        <div className="mt-6 w-full max-w-sm">
          {kuLeadCta && <div className="mb-2 text-xs font-medium text-slate-500">or grab another format</div>}
          <FormatButtons links={links} onTrack={track} variant="full" badgeStyle={kindleBadge} />
        </div>

        {/* Description */}
        <div className="mt-10 max-w-xl space-y-4 text-left text-[15px] leading-relaxed text-gray-700">
          {MINIMAL_DESCRIPTION.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Repeat CTA below the description */}
        <div className="mt-10 w-full max-w-sm">
          <FormatButtons links={links} onTrack={track} variant="full" badgeStyle={kindleBadge} />
        </div>
      </div>
    </main>
  );
}
