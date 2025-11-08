import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, ShoppingCart, Download, Anchor } from 'lucide-react';
import bookCover from '@/assets/actual-book-cover.jpg';
import oceanHero from '@/assets/ocean-hero.jpg';
import { useAmazonLinks } from '@/hooks/useAmazonLinks';
export const BookHero = () => {
  const { paperbackUrl, kindleUrl } = useAmazonLinks();
  
  return <section className="relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat" style={{
    backgroundImage: `url(${oceanHero})`
  }}>
      {/* Ocean overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center gap-3 text-primary-foreground/90">
              <Anchor className="w-6 h-6 animate-wave" />
              <span className="font-semibold text-lg">Maritime Adventure</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight">
                And Then We Hit a Rock
              </h1>
              
              <p className="text-xl lg:text-2xl text-primary-foreground/90 font-medium">
                A family of 5, a dog, and a cat move onto a sailboat.
              </p>
              
              <p className="text-lg text-primary-foreground/80 leading-relaxed">Hilarious true story of adventure on the high seas! From waterspouts to pirate encounters, join this brave family as they discover that paradise has a wild side.</p>
            </div>

            {/* Purchase Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="sunset" size="xl" className="group" onClick={() => window.open(paperbackUrl, '_blank')}>
                <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
                Buy Paperback
                <ExternalLink className="w-4 h-4" />
              </Button>
              
              <div className="flex flex-col items-center gap-2">
                <Button variant="wave" size="xl" className="group" onClick={() => window.open(kindleUrl, '_blank')}>
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Kindle Edition
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <img src="/lovable-uploads/ku.png" alt="Kindle Unlimited" className="w-full h-6 object-contain opacity-90" />
              </div>
            </div>

            {/* Book Details */}
            <div className="flex flex-wrap gap-6 text-primary-foreground/80">
              
              
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-primary-foreground">Rating</span>
                <div className="flex items-center gap-1">
                  <div className="flex">
                    <span>⭐⭐⭐⭐</span>
                    <span className="relative">
                      <span className="text-primary-foreground/40">☆</span>
                      <span className="absolute left-0 top-0 overflow-hidden w-[50%] text-yellow-400">⭐</span>
                    </span>
                  </div>
                  <span className="text-sm">(4.2/5) • 2329 ratings</span>
                </div>
              </div>
            </div>
          </div>

          {/* Book Cover */}
          <div className="flex justify-center lg:justify-end animate-slide-up">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-sunset opacity-30 blur-xl rounded-lg group-hover:opacity-50 transition-opacity duration-300"></div>
              <img src={bookCover} alt="And Then We Hit a Rock - Book Cover" className="relative w-80 lg:w-96 h-auto rounded-lg shadow-warm transform group-hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>;
};