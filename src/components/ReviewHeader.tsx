import React from 'react';

/**
 * Review Header Component
 * Full-width header featuring a standout review quote with star rating
 */
export const ReviewHeader = () => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-blue-700 py-6">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center mb-2 text-2xl">
          <span>⭐⭐⭐⭐⭐</span>
        </div>
        <blockquote className="text-white text-lg md:text-xl lg:text-2xl font-medium italic max-w-4xl mx-auto">
          "This is the funniest book I have ever read! I laughed so hard I had to put the book down"
        </blockquote>
      </div>
    </div>
  );
};
