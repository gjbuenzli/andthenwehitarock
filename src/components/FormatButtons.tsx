import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaAmazon, FaAudible } from 'react-icons/fa6';
import { FORMATS, type Brand, type Format, type Retailer } from '@/config/buyOptions';

/** Retailer brand marks (used with permission). B&N has no glyph → text mark. */
function BrandMark({ brand }: { brand: Brand }) {
  if (brand === 'amazon') return <FaAmazon aria-label="Amazon" className="text-slate-900" />;
  if (brand === 'audible') return <FaAudible aria-label="Audible" className="text-slate-900" />;
  return <span className="font-extrabold tracking-tight text-slate-900 text-[11px] leading-none">B&amp;N</span>;
}

/**
 * Three equal formats as brand-led buttons in a row. Paperback and audiobook
 * open an inline retailer chooser (Amazon / Barnes & Noble); Kindle opens
 * Amazon directly. `compact` is the slim sticky-bar version; `choiceAbove`
 * renders the chooser above the row (for the bottom-anchored sticky bar).
 */
export function FormatButtons({
  onBuy,
  variant = 'full',
  choiceAbove = false,
}: {
  onBuy: (format: Format, retailer: Retailer) => void;
  variant?: 'full' | 'compact';
  choiceAbove?: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  const pick = (f: Format) => {
    if (f.retailers.length === 1) {
      onBuy(f, f.retailers[0]);
      setOpenId(null);
    } else {
      setOpenId((o) => (o === f.id ? null : f.id));
    }
  };

  const openFmt = FORMATS.find((f) => f.id === openId) || null;

  const chooser = openFmt ? (
    <div>
      <div className="text-xs font-semibold text-slate-600 mb-1.5 text-center">
        {openFmt.label} — choose your store
      </div>
      <div className="grid grid-cols-2 gap-2">
        {openFmt.retailers.map((r) => (
          <Button
            key={r.id}
            onClick={() => {
              onBuy(openFmt, r);
              setOpenId(null);
            }}
            className="buy-cta relative overflow-hidden h-auto py-2 gap-1.5 border border-amber-400 text-slate-900 [&_svg]:size-4"
          >
            <BrandMark brand={r.brand} />
            <span className="font-bold text-xs">{r.name}</span>
          </Button>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <div className="space-y-2">
      {choiceAbove && chooser}
      <div className="grid grid-cols-3 gap-2">
        {FORMATS.map((f) => (
          <Button
            key={f.id}
            onClick={() => pick(f)}
            aria-expanded={openId === f.id}
            className={`buy-cta relative overflow-hidden flex-col h-auto text-slate-900 [&_svg]:size-5 ${
              openId === f.id ? 'border-2 border-amber-600 ring-2 ring-amber-400' : 'border border-amber-400'
            } ${variant === 'full' ? 'py-3 gap-1.5' : 'py-2 gap-1'}`}
          >
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
          </Button>
        ))}
      </div>
      {!choiceAbove && chooser}
    </div>
  );
}
