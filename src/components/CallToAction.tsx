import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, ShoppingCart, Download, Gift } from 'lucide-react';
import { useAmazonLinks } from '@/hooks/useAmazonLinks';
export const CallToAction = () => {
  const { paperbackUrl, kindleUrl } = useAmazonLinks();
  
  return <section className="py-20 bg-gradient-ocean text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready for Adventure?
            </h2>
            <p className="text-xl lg:text-2xl opacity-90 leading-relaxed">Join tens of thousands of readers who've fallen in love with this hilarious sailing saga. Perfect for anyone who loves adventure, family stories, or just needs a good laugh!</p>
          </div>

          {/* Purchase Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            
            {/* Paperback Option */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="text-2xl font-bold mb-3">Paperback Edition</h3>
                <p className="opacity-90 mb-6">
                  Perfect for the beach, boat, or cozy reading nook. 
                  Beautiful physical copy to add to your adventure library.
                </p>
                <Button variant="sunset" size="xl" className="w-full group" onClick={() => window.open(paperbackUrl, '_blank')}>
                  <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
                  Order Paperback
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Kindle Option */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <Download className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="text-2xl font-bold mb-3">Kindle Edition</h3>
                <p className="opacity-90 mb-6">
                  Start reading instantly! Perfect for travel, 
                  adjustable text size, and available anywhere you go.
                </p>
                <Button variant="wave" size="xl" className="w-full group mb-4" onClick={() => window.open(kindleUrl, '_blank')}>
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Get Kindle Edition
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <img src="/lovable-uploads/edddcd8b-8f46-41d2-9124-fb5da11b9587.png" alt="Kindle Unlimited" className="w-full h-8 object-contain opacity-90" />
              </div>
            </div>
          </div>

          {/* Gift Section */}
          <div className="bg-gradient-sunset rounded-xl p-8 text-accent-foreground">
            <div className="text-center">
              <Gift className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Perfect Gift for Adventurers</h3>
              <p className="text-lg opacity-90 mb-6">
                Know someone who loves sailing, adventure stories, or just needs a good laugh? 
                This book makes the perfect gift for dreamers and adventurers of all ages.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent" onClick={() => window.open(paperbackUrl, '_blank')}>
                  <Gift className="w-5 h-5" />
                  Gift Paperback
                </Button>
                <Button variant="outline" size="lg" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent" onClick={() => window.open(kindleUrl, '_blank')}>
                  <Gift className="w-5 h-5" />
                  Gift Kindle
                </Button>
              </div>
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
              <div className="text-sm">4.2/5 • 2329 ratings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">25,000+</div>
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