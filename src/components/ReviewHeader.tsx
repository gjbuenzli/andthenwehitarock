import React from 'react';

/**
 * Review Header Component
 * Full-width header featuring a standout review quote with star rating
 */
export const ReviewHeader = () => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-blue-700 py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <blockquote className="text-white text-lg md:text-xl lg:text-2xl font-medium italic">
            "This is the funniest book I have ever read! I laughed so hard I had to put the book down"
          </blockquote>
          <div className="flex text-amber-400 text-xl md:text-2xl">
            <span>⭐⭐⭐⭐⭐</span>
          </div>
        </div>
      </div>
    </div>
  );
};
