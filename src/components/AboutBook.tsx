import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Waves, Users, Heart, Navigation } from 'lucide-react';
export const AboutBook = () => {
  const highlights = [{
    icon: Waves,
    title: "Ocean Adventures",
    description: "Experience the thrill and chaos of life at sea with unexpected encounters and hilarious mishaps."
  }, {
    icon: Users,
    title: "Family Journey",
    description: "Follow a family of five as they navigate the challenges of living together in a small sailboat."
  }, {
    icon: Heart,
    title: "Heartwarming Moments",
    description: "Discover the deep bonds formed when facing the unknown together, pets included!"
  }, {
    icon: Navigation,
    title: "True Story",
    description: "Every wild adventure actually happened - truth is stranger and funnier than fiction."
  }];
  return <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Main Description */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              About the Adventure
            </h2>
            <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed">
              <p className="text-xl mb-6">
                Did you know that the remora fish will try to swim up a whale shark's butt when they poop? 
                The crew of Twig didn't. It turns out there was an awful lot the family of five didn't know 
                when they decided to move aboard and set off for adventure on the high seas.
              </p>
              
              <p className="text-lg mb-6">
                After decades of dreaming and planning, the explorers finally sailed off into the sunset. 
                Yes, they found the palm trees and coconuts they had longed for, but they also glimpsed 
                the other side of paradise. They ran from waterspouts, dodged cargo ships, and learned 
                that living in paradise isn't always as perfect as the postcard.
              </p>
              
              <p className="text-lg">
                This is their hilarious, heartwarming, and utterly true story of adventure, family bonds, 
                and discovering that sometimes the best journeys are the ones where everything goes wonderfully wrong.
              </p>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => <Card key={index} className="text-center hover:shadow-soft transition-all duration-300 transform hover:-translate-y-2 group">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <highlight.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {highlight.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>

          {/* Quote Section */}
          <div className="mt-20 text-center">
            <blockquote className="text-2xl lg:text-3xl font-medium text-primary italic leading-relaxed max-w-3xl mx-auto">"If everything had gone to plan, it wouldn't have been much of an adventure"</blockquote>
            <cite className="block mt-6 text-muted-foreground text-lg">
              — From "And Then We Hit a Rock"
            </cite>
          </div>
        </div>
      </div>
    </section>;
};