import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaAmazon, FaAudible } from 'react-icons/fa6';
import { useAmazonLinks } from '@/hooks/useAmazonLinks';
import { handleBuyClick } from '@/lib/track';
import { FORMATS, type Brand, type Format, type Retailer } from '@/config/buyOptions';

type Links = ReturnType<typeof useAmazonLinks>;

/** Retailer brand marks (used with permission). B&N has no glyph → text mark. */
function BrandMark({ brand }: { brand: Brand }) {
  if (brand === 'amazon') return <FaAmazon aria-label="Amazon" className="text-slate-900" />;
  if (brand === 'audible') return <FaAudible aria-label="Audible" className="text-slate-900" />;
  return <span className="font-extrabold tracking-tight text-slate-900 text-[11px] leading-none">B&amp;N</span>;
}

/**
 * Three equal formats as brand-led buy links in a row. Paperback and audiobook
 * open an inline retailer chooser (Amazon / Barnes & Noble); Kindle links
 * straight to Amazon.
 *
 * Buy actions are real <a target="_blank"> links (not window.open) — popup
 * blockers in mobile / in-app browsers (Facebook, Instagram) silently swallow
 * window.open, which left buyers stuck. Anchors always navigate. Tracking
 * fires on click via onTrack; the anchor href does the navigation.
 */
export function FormatButtons({
  links,
  onTrack,
  variant = 'full',
  choiceAbove = false,
  badgeStyle = 'pill',
}: {
  links: Links;
  onTrack: (format: Format, retailer: Retailer) => void;
  variant?: 'full' | 'compact';
  choiceAbove?: boolean;
  /** How a format's corner badge (e.g. Kindle "FREE") renders. */
  badgeStyle?: 'pill' | 'starburst';
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const openFmt = FORMATS.find((f) => f.id === openId) || null;

  // A format links directly (no chooser) when it has one retailer OR opts into
  // directPrimary — then only its FIRST retailer is the button and the rest drop
  // to small links below the grid.
  const isDirect = (f: Format) => f.retailers.length === 1 || Boolean(f.directPrimary);
  const secondaryLinks = FORMATS.filter((f) => f.directPrimary && f.retailers.length > 1).flatMap((f) =>
    f.retailers.slice(1).map((r) => ({ f, r })),
  );

  const fmtClasses = (active: boolean) =>
    `buy-cta relative flex-col h-auto rounded-xl text-slate-800 [&_svg]:size-5 ${
      active ? 'ring-2 ring-[#f3a847] ring-offset-1' : ''
    } ${variant === 'full' ? 'py-3.5 gap-1.5' : 'py-2.5 gap-1'}`;

  // Mini starburst (spikey) points for the "FREE" badge starburst option.
  const miniBurst = (() => {
    const pts: string[] = [];
    const spikes = 11;
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? 29 : 22;
      const a = (Math.PI / spikes) * i - Math.PI / 2;
      pts.push(`${(30 + r * Math.cos(a)).toFixed(1)},${(30 + r * Math.sin(a)).toFixed(1)}`);
    }
    return pts.join(' ');
  })();

  const fmtContent = (f: Format) => (
    <>
      {f.badge &&
        (badgeStyle === 'starburst' ? (
          <span className="absolute -top-2.5 -right-2.5 z-10 rotate-[8deg] drop-shadow">
            <svg viewBox="0 0 60 60" className="!h-9 !w-9">
              <polygon points={miniBurst} fill="#F5821F" stroke="#ffffff" strokeWidth="2.5" strokeLinejoin="round" />
              <text x="30" y="32" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontStyle="italic" className="fill-white font-extrabold">
                {f.badge}
              </text>
            </svg>
          </span>
        ) : (
          <span className="absolute top-1.5 right-1.5 bg-[#F5821F] text-white text-[9px] font-extrabold leading-none px-1.5 py-0.5 rounded-full">
            {f.badge}
          </span>
        ))}
      <span className="flex items-center justify-center gap-1.5 h-5 text-slate-900">
        {/* Direct formats show only their primary retailer's mark (it's where the
            one click goes); chooser formats show every retailer's mark. */}
        {(isDirect(f) ? f.retailers.slice(0, 1) : f.retailers).map((r) => (
          <BrandMark key={r.id} brand={r.brand} />
        ))}
      </span>
      <span className="font-semibold text-xs leading-none">{f.label}</span>
    </>
  );

  const chooser = openFmt ? (
    <div>
      <div className="text-xs font-semibold text-slate-600 mb-1.5 text-center">
        {openFmt.label} — choose your store
      </div>
      <div className="grid grid-cols-2 gap-2">
        {openFmt.retailers.map((r) => (
          <Button
            key={r.id}
            asChild
            className="buy-cta relative overflow-hidden h-auto py-2 gap-1.5 border border-amber-400 text-slate-900 [&_svg]:size-4"
          >
            <a
              href={r.href(links)}
              target="_blank"
              rel="noopener noreferrer"
              // Fire on the real click (keepalive CAPI survives nav; in-app gets a
              // forced same-tab nav). Pointer-down over-counted touches as buys.
              onClick={(e) => {
                handleBuyClick(r.href(links), () => onTrack(openFmt, r))(e);
                setOpenId(null);
              }}
            >
              <BrandMark brand={r.brand} />
              <span className="font-bold text-xs">{r.name}</span>
            </a>
          </Button>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <div className="space-y-2">
      {choiceAbove && chooser}
      <div className="grid grid-cols-3 gap-2">
        {FORMATS.map((f) =>
          isDirect(f) ? (
            <Button key={f.id} asChild className={fmtClasses(false)}>
              <a
                href={f.retailers[0].href(links)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleBuyClick(f.retailers[0].href(links), () => onTrack(f, f.retailers[0]))}
              >
                {fmtContent(f)}
              </a>
            </Button>
          ) : (
            <Button
              key={f.id}
              type="button"
              aria-expanded={openId === f.id}
              onClick={() => setOpenId((o) => (o === f.id ? null : f.id))}
              className={fmtClasses(openId === f.id)}
            >
              {fmtContent(f)}
            </Button>
          )
        )}
      </div>
      {/* Secondary retailers for direct formats — one compact line (they're all
          B&N): "Also on Barnes & Noble: Paperback · Audiobook". */}
      {secondaryLinks.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-xs text-slate-600">
          <span className="text-slate-500">Also on Barnes &amp; Noble:</span>
          {secondaryLinks.map(({ f, r }, i) => (
            <span key={`${f.id}-${r.id}`} className="inline-flex items-center gap-1.5">
              {i > 0 && <span className="text-slate-300">·</span>}
              <a
                href={r.href(links)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleBuyClick(r.href(links), () => onTrack(f, r))}
                className="font-medium underline underline-offset-2 hover:text-slate-900"
              >
                {f.label}
              </a>
            </span>
          ))}
        </div>
      )}
      {!choiceAbove && chooser}
    </div>
  );
}
