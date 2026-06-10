import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useAmazonLinks } from '@/hooks/useAmazonLinks';
import { trackPurchaseClick, type CtaRank } from '@/lib/track';
import { OTHER_STORES, type BuyOption } from '@/config/buyOptions';
import { FormatButtons } from '@/components/FormatButtons';

const LOCATION = 'cta_section';

export const CallToAction = () => {
  const links = useAmazonLinks();

  const buy = (opt: BuyOption, ctaRank: CtaRank) => {
    trackPurchaseClick({ retailer: opt.retailer, format: opt.format, location: LOCATION, ctaRank, offer: opt.offer });
    window.open(opt.href(links), '_blank');
  };

  return <section className="py-20 bg-gradient-ocean text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready for Adventure?
            </h2>
            <p className="text-xl lg:text-2xl opacity-90 leading-relaxed">Join tens of thousands of readers who've fallen in love with this hilarious sailing saga. Perfect for anyone who loves adventure, family stories, or just needs a good laugh!</p>
          </div>

          {/* Purchase Options — three equal formats, icon buttons in a row */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-6 ring-1 ring-white/15">
              <FormatButtons onPick={(o) => buy(o, 'primary')} variant="full" />
            </div>

            {/* Other stores (Barnes & Noble) */}
            <details className="mt-4 text-center">
              <summary className="cursor-pointer text-sm text-white/80 hover:text-white select-none">
                Other stores
              </summary>
              <div className="mt-3 flex flex-col items-center gap-2">
                {OTHER_STORES.map((opt) => (
                  <button
                    key={opt.id}
                    className="text-sm text-white/80 hover:text-white hover:underline flex items-center gap-1"
                    onClick={() => buy(opt, 'more')}
                  >
                    {opt.label}
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </button>
                ))}
              </div>
            </details>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-80">
            <div className="text-center">
              <div className="text-2xl font-bold flex justify-center">
                <span>⭐⭐⭐⭐</span>
                <span className="relative">
                  <span className="text-primary-foreground/40">☆</span>
                  <span className="absolute left-0 top-0 overflow-hidden w-[50%] text-yellow-400">⭐</span>
                </span>
              </div>
              <div className="text-sm">4.2/5 • 6,396 ratings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">45,000+</div>
              <div className="text-sm">Happy Readers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">🚢</div>
              <div className="text-sm">One Epic Journey</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};