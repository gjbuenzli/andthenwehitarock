import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ExternalLink, ShoppingCart, Download, Headphones, Waves, Gift } from 'lucide-react';
import bookCover from '@/assets/actual-book-cover.jpg';
import { useAmazonLinks } from '@/hooks/useAmazonLinks';

export const BookHero = () => {
  const links = useAmazonLinks();

  return <section className="relative min-h-screen flex items-center py-12 bg-gradient-to-br from-sky-100 via-amber-50 to-blue-100 overflow-hidden">
      {/* Decorative wave elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[420px,1fr] gap-16 items-start">

            {/* Left Column - Book Cover */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative group sticky top-8">
                {/* Nautical rope decoration */}
                <div className="absolute -top-4 -left-4 w-20 h-20 border-4 border-blue-400/40 rounded-full"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 border-4 border-amber-400/40 rounded-full"></div>

                <div className="absolute -inset-6 bg-gradient-to-br from-blue-400 via-cyan-400 to-amber-400 opacity-20 blur-3xl rounded-3xl group-hover:opacity-30 transition-opacity duration-500"></div>
                <img
                  src={bookCover}
                  alt="And Then We Hit a Rock - Book Cover"
                  className="relative w-full max-w-sm lg:max-w-none h-auto rounded-3xl shadow-2xl transform group-hover:scale-[1.02] group-hover:rotate-1 transition-all duration-500 border-4 border-white"
                />

                {/* Wave accent */}
                <Waves className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 text-blue-400/50" />
              </div>
            </div>

            {/* Right Column - Info & Purchase */}
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-5">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-800 leading-[1.1] tracking-tight">
                  And Then We Hit a Rock
                </h1>

                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-md">
                  <p className="text-lg sm:text-xl text-slate-700 italic font-medium">
                    "If everything had gone to plan, it wouldn't have been much of an adventure"
                  </p>
                </div>

                <p className="text-2xl sm:text-3xl text-slate-800 font-bold italic leading-relaxed">
                  A family of 5, a dog, and a cat move onto a sailboat.
                </p>

                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                  Hilarious true story of adventure on the high seas! From waterspouts to pirate encounters,
                  join this brave family as they discover that paradise has a wild side.
                </p>

                {/* Rating */}
                <div className="flex flex-wrap items-center gap-4 py-4 border-y-2 border-blue-200/50">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400 text-2xl drop-shadow">
                      <span>⭐⭐⭐⭐</span>
                      <span className="relative">
                        <span className="text-gray-300">☆</span>
                        <span className="absolute left-0 top-0 overflow-hidden w-[50%]">⭐</span>
                      </span>
                    </div>
                    <span className="text-slate-800 font-bold text-lg">4.2/5</span>
                  </div>
                  <div className="h-6 w-px bg-blue-300"></div>
                  <span className="text-slate-700 font-semibold">4,543 ratings</span>
                  <div className="h-6 w-px bg-blue-300"></div>
                  <span className="text-slate-800 font-bold">45,000+ readers</span>
                </div>
              </div>

              {/* Purchase Options Grid */}
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  Get Your Copy
                  <span className="text-blue-500">⚓</span>
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {/* Paperback Card */}
                  <Card className="p-5 bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
                    <div className="text-center mb-4">
                      <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
                        <ShoppingCart className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-black text-slate-800 mb-1">Paperback</h3>
                      <p className="text-sm text-slate-600 font-medium">Physical book</p>
                    </div>
                    <div className="space-y-2">
                      <Button
                        size="default"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                        onClick={() => window.open('https://shop.ingramspark.com/b/084?params=UPwlzTdA5DAzKf6PG1g2AP1kSjgpkECHb4OLNkCpGHL', '_blank')}
                      >
                        <Gift className="w-4 h-4" />
                        Direct (Save 20%)
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        size="default"
                        className="w-full bg-gradient-to-r from-[#FF9900] to-[#FF8800] hover:from-[#FF8800] hover:to-[#FF7700] text-white font-bold shadow-lg hover:shadow-xl transition-all"
                        onClick={() => window.open(links.amazon.paperbackUrl, '_blank')}
                      >
                        Amazon
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        size="default"
                        variant="outline"
                        className="w-full border-2 border-[#00693E] text-[#00693E] hover:bg-[#00693E] hover:text-white font-bold shadow hover:shadow-lg transition-all"
                        onClick={() => window.open(links.barnesAndNoble.paperbackUrl, '_blank')}
                      >
                        B&N
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>

                  {/* E-Book Card */}
                  <Card className="p-5 bg-gradient-to-br from-white to-cyan-50 border-2 border-cyan-200 hover:border-cyan-400 hover:shadow-xl transition-all hover:-translate-y-1 duration-300 relative">
                    <div className="absolute -top-2 -right-2 bg-amber-400 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-lg">⚡</span>
                    </div>
                    <div className="text-center mb-4">
                      <div className="bg-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
                        <Download className="w-8 h-8 text-cyan-600" />
                      </div>
                      <h3 className="text-xl font-black text-slate-800 mb-1">E-Book</h3>
                      <p className="text-sm text-slate-600 font-medium">Read anywhere</p>
                    </div>
                    <div className="space-y-2">
                      <Button
                        size="default"
                        className="w-full bg-gradient-to-r from-[#FF9900] to-[#FF8800] hover:from-[#FF8800] hover:to-[#FF7700] text-white font-bold shadow-lg hover:shadow-xl transition-all"
                        onClick={() => window.open(links.amazon.kindleUrl, '_blank')}
                      >
                        Kindle
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <div className="flex justify-center pt-1">
                        <div className="bg-white px-3 py-1 rounded-lg border border-gray-200">
                          <img src="/lovable-uploads/ku.png" alt="Kindle Unlimited" className="h-5 object-contain" />
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Audiobook Card */}
                  <Card className="p-5 bg-gradient-to-br from-white to-amber-50 border-2 border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
                    <div className="text-center mb-4">
                      <div className="bg-amber-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
                        <Headphones className="w-8 h-8 text-amber-600" />
                      </div>
                      <h3 className="text-xl font-black text-slate-800 mb-1">Audiobook</h3>
                      <p className="text-sm text-slate-600 font-medium">Listen anywhere</p>
                    </div>
                    <div className="space-y-2">
                      <Button
                        size="default"
                        className="w-full bg-gradient-to-r from-[#FF9900] to-[#FF8800] hover:from-[#FF8800] hover:to-[#FF7700] text-white font-bold shadow-lg hover:shadow-xl transition-all"
                        onClick={() => window.open(links.amazon.audiobookUrl, '_blank')}
                      >
                        Audible
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        size="default"
                        variant="outline"
                        className="w-full border-2 border-[#00693E] text-[#00693E] hover:bg-[#00693E] hover:text-white font-bold shadow hover:shadow-lg transition-all"
                        onClick={() => window.open(links.barnesAndNoble.audiobookUrl, '_blank')}
                      >
                        B&N
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};