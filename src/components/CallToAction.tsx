import React from 'react';
import { useAmazonLinks } from '@/hooks/useAmazonLinks';
import { trackPurchaseClick } from '@/lib/track';
import { type Format, type Retailer } from '@/config/buyOptions';
import { FormatButtons } from '@/components/FormatButtons';

const LOCATION = 'cta_section';

export const CallToAction = () => {
  const links = useAmazonLinks();

  const onBuy = (format: Format, retailer: Retailer) => {
    trackPurchaseClick({ retailer: retailer.name, format: format.format, location: LOCATION, ctaRank: 'primary', offer: retailer.offer });
    window.open(retailer.href(links), '_blank');
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

          {/* Purchase Options — three formats; paperback/audiobook open a
              retailer chooser (Amazon / B&N), Kindle goes straight to Amazon */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-6 ring-1 ring-white/15">
              <FormatButtons onBuy={(f, r) => onBuy(f, r)} variant="full" />
            </div>
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