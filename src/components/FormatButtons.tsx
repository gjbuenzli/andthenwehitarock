import React from 'react';
import { Button } from '@/components/ui/button';
import { FaAmazon, FaAudible } from 'react-icons/fa6';
import kuLogo from '@/assets/kindle-unlimited-logo.png';
import { FORMATS, type BuyOption } from '@/config/buyOptions';

/** Real retailer/format brand marks (used with permission). */
function BrandMark({ id }: { id: string }) {
  if (id === 'kindle') {
    return <img src={kuLogo} alt="Kindle Unlimited" className="h-4 w-auto object-contain" />;
  }
  if (id === 'paperback') return <FaAmazon aria-label="Amazon" className="text-slate-900" />;
  if (id === 'audiobook') return <FaAudible aria-label="Audible" className="text-slate-900" />;
  return null;
}

/**
 * The three formats (Paperback / Kindle / Audiobook) as equal, brand-led buy
 * buttons in a row, each carrying the retailer logo. `compact` is the slim
 * version for the sticky mobile bar; `full` is for the in-page boxes.
 */
export function FormatButtons({
  onPick,
  variant = 'full',
}: {
  onPick: (opt: BuyOption) => void;
  variant?: 'full' | 'compact';
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {FORMATS.map((opt) => (
        <Button
          key={opt.id}
          onClick={() => onPick(opt)}
          className={`buy-cta relative overflow-hidden flex-col h-auto border border-amber-400 text-slate-900 [&_svg]:size-5 ${
            variant === 'full' ? 'py-3 gap-1.5' : 'py-2 gap-1'
          }`}
        >
          {opt.badge && (
            <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[9px] font-extrabold leading-none px-1 py-0.5 rounded">
              {opt.badge}
            </span>
          )}
          <span className="flex items-center justify-center h-5">
            <BrandMark id={opt.id} />
          </span>
          <span className="font-bold text-xs leading-none">{opt.label}</span>
        </Button>
      ))}
    </div>
  );
}
