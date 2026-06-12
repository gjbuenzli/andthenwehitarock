import { useLocation } from 'react-router-dom';
import { useAmazonLinks } from '@/hooks/useAmazonLinks';
import { trackPurchaseClick } from '@/lib/track';
import { type Format, type Retailer } from '@/config/buyOptions';
import { FormatButtons } from '@/components/FormatButtons';

/**
 * Always-visible mobile buy bar for the content pages (chapters, gear, blog…)
 * — the same pinned format chooser the ad lander uses, so an engaged reader can
 * buy without scrolling. Hidden on desktop. Tracks which page the buy came from.
 */
export function MobileBuyBar() {
  const links = useAmazonLinks();
  const { pathname } = useLocation();
  const location = `sticky_bar${pathname.replace(/\//g, '_') || '_home'}`;

  const onTrack = (format: Format, retailer: Retailer) =>
    trackPurchaseClick({
      retailer: retailer.name,
      format: format.format,
      location,
      ctaRank: 'primary',
      offer: retailer.offer,
    });

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-t border-slate-200 shadow-[0_-2px_12px_rgba(0,0,0,0.12)] px-3 py-2.5">
      <FormatButtons links={links} onTrack={onTrack} variant="compact" choiceAbove />
    </div>
  );
}
