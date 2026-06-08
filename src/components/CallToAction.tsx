import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useAmazonLinks } from '@/hooks/useAmazonLinks';
import { trackPurchaseClick, type CtaRank } from '@/lib/track';
import { PRIMARY_CTA, SECONDARY, MORE, type BuyOption } from '@/config/buyOptions';

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

          {/* Purchase Options — one primary action, rest demoted */}
          <div className="max-w-xl mx-auto mb-12">
            {/* Primary CTA — read free in Kindle Unlimited */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 ring-1 ring-white/15">
              <div className="flex items-center justify-center gap-2 mb-4">
                <img src="/lovable-uploads/ku.png" alt="Kindle Unlimited" className="h-5 object-contain bg-white rounded px-2 py-1" />
              </div>
              <Button
                size="xl"
                className="w-full h-auto py-3 bg-[#FFD814] hover:bg-[#F7CA00] text-slate-900 border border-[#FCD200]"
                onClick={() => buy(PRIMARY_CTA, 'primary')}
              >
                <span className="flex flex-col items-center leading-tight">
                  <span className="font-bold text-lg">{PRIMARY_CTA.ctaLine1}</span>
                  <span className="text-xs font-medium opacity-80">{PRIMARY_CTA.ctaLine2}</span>
                </span>
              </Button>
              <p className="text-sm text-white/75 mt-3">{PRIMARY_CTA.subLabel}</p>
            </div>

            {/* Secondary — other formats */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {SECONDARY.map((opt) => (
                <Button
                  key={opt.id}
                  variant="outline"
                  size="xl"
                  className="w-full border-2 border-white/50 text-white bg-white/10 hover:bg-white/20 hover:border-white"
                  onClick={() => buy(opt, 'secondary')}
                >
                  {opt.label}
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </Button>
              ))}
            </div>

            {/* More — long tail */}
            <details className="mt-4 text-center">
              <summary className="cursor-pointer text-sm text-white/80 hover:text-white select-none">
                More formats &amp; stores
              </summary>
              <div className="mt-3 flex flex-col items-center gap-2">
                {MORE.map((opt) => (
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