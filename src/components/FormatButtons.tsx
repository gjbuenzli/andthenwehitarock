import React from 'react';
import { Button } from '@/components/ui/button';
import { Book, Tablet, Headphones } from 'lucide-react';
import { FORMATS, type BuyOption } from '@/config/buyOptions';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  paperback: Book,
  kindle: Tablet,
  audiobook: Headphones,
};

/**
 * The three formats (Paperback / Kindle / Audiobook) as equal, icon-led buy
 * buttons in a row. `compact` is the slim version for the sticky mobile bar;
 * `full` adds the perk line for the in-page boxes.
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
      {FORMATS.map((opt) => {
        const Icon = ICONS[opt.id];
        return (
          <Button
            key={opt.id}
            onClick={() => onPick(opt)}
            className={`buy-cta relative overflow-hidden flex-col h-auto border border-amber-400 text-slate-900 [&_svg]:size-5 ${
              variant === 'full' ? 'py-3 gap-1' : 'py-2 gap-0.5'
            }`}
          >
            {opt.badge && (
              <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[9px] font-extrabold leading-none px-1 py-0.5 rounded">
                {opt.badge}
              </span>
            )}
            <Icon className="text-slate-800" />
            <span className="font-bold text-sm leading-none">{opt.label}</span>
            {variant === 'full' && opt.perk && (
              <span className="text-[10px] font-semibold opacity-70 leading-tight">{opt.perk}</span>
            )}
          </Button>
        );
      })}
    </div>
  );
}
