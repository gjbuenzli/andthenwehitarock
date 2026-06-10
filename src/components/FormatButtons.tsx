import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaAmazon, FaAudible } from 'react-icons/fa6';
import { useAmazonLinks } from '@/hooks/useAmazonLinks';
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
}: {
  links: Links;
  onTrack: (format: Format, retailer: Retailer) => void;
  variant?: 'full' | 'compact';
  choiceAbove?: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const openFmt = FORMATS.find((f) => f.id === openId) || null;

  const fmtClasses = (active: boolean) =>
    `buy-cta relative overflow-hidden flex-col h-auto text-slate-900 [&_svg]:size-5 ${
      active ? 'border-2 border-amber-600 ring-2 ring-amber-400' : 'border border-amber-400'
    } ${variant === 'full' ? 'py-3 gap-1.5' : 'py-2 gap-1'}`;

  const fmtContent = (f: Format) => (
    <>
      {f.badge && (
        <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[9px] font-extrabold leading-none px-1 py-0.5 rounded">
          {f.badge}
        </span>
      )}
      <span className="flex items-center justify-center gap-1.5 h-5">
        {f.retailers.map((r) => (
          <BrandMark key={r.id} brand={r.brand} />
        ))}
      </span>
      <span className="font-bold text-xs leading-none">{f.label}</span>
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
              onClick={() => {
                onTrack(openFmt, r);
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
          f.retailers.length === 1 ? (
            <Button key={f.id} asChild className={fmtClasses(false)}>
              <a
                href={f.retailers[0].href(links)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onTrack(f, f.retailers[0])}
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
      {!choiceAbove && chooser}
    </div>
  );
}
