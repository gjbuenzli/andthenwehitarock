import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star } from 'lucide-react';
interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  platform: string;
}
const reviews: Review[] = [{
  id: 1,
  name: "Sarah M.",
  rating: 5,
  comment: "Absolutely hilarious! This book had me laughing out loud throughout. The family's adventures are both relatable and utterly entertaining. A perfect read for anyone who loves adventure and humor!",
  platform: "Amazon"
}, {
  id: 2,
  name: "Captain Jim",
  rating: 5,
  comment: "As a fellow sailor, I can relate to so many of these mishaps! The author captures the reality of sailing with family - the good, the bad, and the absolutely ridiculous. Highly recommend!",
  platform: "Goodreads"
}, {
  id: 3,
  name: "Jennifer L.",
  rating: 4,
  comment: "What a delightful surprise! I picked this up expecting a simple sailing story and got so much more. The humor is genuine and the family dynamics are beautifully portrayed.",
  platform: "Amazon"
}, {
  id: 4,
  name: "Mike the Sailor",
  rating: 5,
  comment: "This book perfectly captures the chaos and joy of sailing with pets and kids. Every sailor should read this - you'll recognize yourself in these pages!",
  platform: "Amazon"
}, {
  id: 5,
  name: "Adventure Mom",
  rating: 5,
  comment: "I couldn't put it down! The stories about the dog and cat on the boat had me in stitches. This family's courage to pursue their dreams is inspiring.",
  platform: "Goodreads"
}];
const StarRating = ({
  rating
}: {
  rating: number;
}) => {
  return <div className="flex gap-1">
      {[...Array(5)].map((_, index) => <Star key={index} className={`w-4 h-4 ${index < rating ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />)}
    </div>;
};
export const ReviewsCarousel = () => {
  return <section className="py-16 bg-gradient-wave">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            What Readers Are Saying
          </h2>
          <p className="text-muted-foreground text-lg">Join tens of thousands of readers who've loved this hilarious sailing adventure</p>
        </div>

        <Carousel opts={{
        align: "start",
        loop: true
      }} className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {reviews.map(review => <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <Card className="h-full shadow-soft hover:shadow-warm transition-all duration-300 transform hover:-translate-y-1">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <StarRating rating={review.rating} />
                        <span className="text-sm text-muted-foreground font-medium">
                          {review.platform}
                        </span>
                      </div>
                      
                      <p className="text-foreground flex-1 mb-4 leading-relaxed">
                        "{review.comment}"
                      </p>
                      
                      <div className="mt-auto">
                        <p className="font-semibold text-primary">
                          — {review.name}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>)}
          </CarouselContent>
          <CarouselPrevious className="bg-primary text-primary-foreground hover:bg-primary/90" />
          <CarouselNext className="bg-primary text-primary-foreground hover:bg-primary/90" />
        </Carousel>
      </div>
    </section>;
};