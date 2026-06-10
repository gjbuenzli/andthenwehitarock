import React from 'react';
import { ExternalLink } from 'lucide-react';
import bookCover from '@/assets/actual-book-cover.jpg';
import { useAmazonLinks } from '@/hooks/useAmazonLinks';
import { trackPurchaseClick, type CtaRank } from '@/lib/track';
import { OTHER_STORES, type BuyOption } from '@/config/buyOptions';
import { FormatButtons } from '@/components/FormatButtons';

const LOCATION = 'amazon_hero_section';

/**
 * Amazon-style Book Hero Section
 * Mimics Amazon's book listing page layout with left-side cover and right-side details
 */
export const BookHeroAmazon = () => {
  const links = useAmazonLinks();

  const buy = (opt: BuyOption, ctaRank: CtaRank, location: string = LOCATION) => {
    trackPurchaseClick({ retailer: opt.retailer, format: opt.format, location, ctaRank, offer: opt.offer });
    window.open(opt.href(links), '_blank');
  };

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Main Product Layout - 3 columns like Amazon */}
          <div className="grid lg:grid-cols-[300px,1fr,320px] gap-6">

            {/* Left Column - Book Cover Only */}
            <div className="hidden lg:block">
              <img
                src={bookCover}
                alt="And Then We Hit a Rock - Book Cover"
                className="w-full h-auto border border-slate-200 shadow-md sticky top-8"
              />
            </div>

            {/* Middle Column - All Product Details */}
            <div className="space-y-4">
              {/* Mobile book cover - shows on small screens */}
              <div className="lg:hidden flex justify-center mb-4">
                <img
                  src={bookCover}
                  alt="And Then We Hit a Rock - Book Cover"
                  className="w-full max-w-xs h-auto border border-slate-200 shadow-md"
                />
              </div>

              {/* Title */}
              <div>
                <h1 className="text-2xl lg:text-3xl font-normal text-slate-900 mb-2">
                  And Then We Hit a Rock: A family of 5, a dog, and a cat move onto a sailboat
                </h1>
                <p className="text-base lg:text-lg text-slate-700">Hilarious true story!</p>
              </div>

              {/* Author */}
              <div className="text-sm text-slate-600">
                by <span className="text-slate-900 font-medium">Greg Buenzli</span> (Author)
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400 text-xl">
                    <span>⭐⭐⭐⭐</span>
                    <span className="relative">
                      <span className="text-gray-300">☆</span>
                      <span className="absolute left-0 top-0 overflow-hidden w-[50%]">⭐</span>
                    </span>
                  </div>
                  <span className="text-slate-700 ml-1 text-sm">
                    4.2 out of 5 stars
                  </span>
                </div>
                <span className="text-slate-700 text-sm">
                  6,396 ratings
                </span>
              </div>

              {/* Brief info */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                <div className="text-sm text-slate-700">
                  <span className="font-semibold">📚 Over 45,000 readers</span> have enjoyed this hilarious sailing adventure
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-3">About this book</h2>
                <div className="text-slate-700 leading-relaxed space-y-3 text-sm">
                  <p>
                    Did you know that the remora fish will try to swim up a whale shark's butt when they poop? The crew of Twig didn't. It turns out there was an awful lot the family of five didn't know when they decided to move aboard and set off for adventure on the high seas.
                  </p>
                  <p>
                    After decades of dreaming, and planning, the explorers finally sailed off into the sunset. Yes, they found the palm trees and coconuts they had longed for, but they also glimpsed the other side of paradise. They ran from waterspouts, dodged hurricanes, got (sort of) robbed by pirates, and played chicken with naval warships. They found themselves making emergency calls to the Coast Guard in the dead of night and learning the exact purpose of a nut jiggler during a late-night beach bonfire.
                  </p>
                  <p>
                    Join as the inevitable is pondered after a meal of coffee and chili on a night watch in "What if I have to go poo?". Commiserate the anxiety of the hurricane season and practice dodging rogue unmanned boats during a midnight tropical storm. Laugh at the captain's intimate misfortunes with marine toilets, sense what a pirate smells like, and discover how not to get crabs in this page-turning journey of the East Coast. You are invited to follow along with the frustration and joy of a life newly discovered afloat a 46-foot catamaran.
                  </p>
                  <p className="font-semibold">
                    Remember: If everything had gone exactly as planned….it wouldn't have been much of an adventure.
                  </p>
                </div>

                {/* Chapter Listing */}
                <details className="mt-6">
                  <summary className="cursor-pointer font-bold text-slate-900 hover:text-blue-600 select-none">
                    📖 View Chapter Listing
                  </summary>
                  <div className="mt-4 text-sm text-slate-700 space-y-3 pl-4">
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Part 1: Damn you Lisa</h3>
                      <p className="text-xs leading-relaxed">Cocktails and Dreams • The hand of God • Down to the Banana Republics • Panama vs Twig • Christmas Blows • Georgia on my mind • Love and a sailboat</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Part 2: Afloat</h3>
                      <p className="text-xs leading-relaxed">All Aboard! • There's Vodka in the Boy's Bathroom • Afloat • Hazmat • Things that go bump in the night • Don't Ignore the Bright Red Light • Caulk the Wagon • Perfect Strangers</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Part 3: The Bahamas</h3>
                      <p className="text-xs leading-relaxed">42 Flushes • The Nut Jiggler • Watch your six • You smell like a pirate • I wet the bed • Twist and Spout • Weather or not</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Part 4: The East Coast</h3>
                      <p className="text-xs leading-relaxed">What if I have to go Poo? • Dr Jekyll's Island • You say Savannah, I say Banana • Pepperoni is not a fruit • House of Warship • Feeling Crabby • Tot • There's Always Room For Jello • Oh Ophelia</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Part 5: Due South</h3>
                      <p className="text-xs leading-relaxed">Boat Chill Factor • I lack depth • Wednesday • Anchor(s) Away • Cinderella Lost Her Slipper • Suck it Murphy • And Then We Hit a Rock • What the Fog?!</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Epilogue</h3>
                      <p className="text-xs leading-relaxed">There's no place like home • Come Monday (Tribute to Jimmy Buffett)</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Glossary of Ridiculous Nautical Jargon</h3>
                    </div>
                  </div>
                </details>
              </div>
            </div>

            {/* Right Column - Purchase Options Box Only */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <div className="border border-slate-300 rounded-lg p-4 bg-white shadow-sm">
                <div className="text-sm mb-4">
                  <div className="font-semibold text-slate-900">Available in:</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs">Kindle</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs">Paperback</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs">Audiobook</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  {/* Three equal formats — paperback (majority), Kindle (free on
                      KU), and audiobook — as icon buttons in a row. */}
                  <div className="text-sm font-semibold text-slate-900 mb-2">Get your copy</div>
                  <FormatButtons onPick={(o) => buy(o, 'primary')} variant="full" />

                  {/* Other stores (Barnes & Noble) tucked away */}
                  <details className="mt-3">
                    <summary className="cursor-pointer text-sm text-blue-700 hover:text-blue-900 select-none">
                      Other stores
                    </summary>
                    <div className="mt-2 space-y-1.5">
                      {OTHER_STORES.map((opt) => (
                        <button
                          key={opt.id}
                          className="w-full text-left text-sm text-slate-600 hover:text-blue-700 hover:underline flex items-center gap-1"
                          onClick={() => buy(opt, 'more')}
                        >
                          {opt.label}
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </details>
                </div>
              </div>

              {/* Social Proof */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <div className="flex items-center justify-center gap-2 text-blue-900 text-sm">
                  <span className="font-semibold whitespace-nowrap">45,000+ readers</span>
                  <span className="text-blue-600">•</span>
                  <div className="flex items-center gap-1">
                    <div className="flex text-amber-400">
                      <span>⭐⭐⭐⭐</span>
                      <span className="relative">
                        <span className="text-gray-300">☆</span>
                        <span className="absolute left-0 top-0 overflow-hidden w-[50%]">⭐</span>
                      </span>
                    </div>
                    <span className="font-semibold whitespace-nowrap">4.2/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky mobile buy bar — ~99% of ad traffic is mobile in-app, where the
          purchase box sits below a long description. This guarantees a clear,
          always-visible CTA on the initial screen so visitors can act without
          hunting for a buy button. Hidden on desktop (right rail is visible). */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-t border-slate-200 shadow-[0_-2px_12px_rgba(0,0,0,0.12)] px-3 py-2.5">
        <FormatButtons onPick={(o) => buy(o, 'primary', 'mobile_sticky_bar')} variant="compact" />
      </div>
    </section>
  );
};
