import React from 'react';
import { Star, Flame, CheckCircle } from 'lucide-react';
import { REVIEWS } from '../../data/locationsAndReviews';

export const ReviewsTicker: React.FC = () => {
  return (
    <section className="py-20 bg-[#09090b] dark:bg-[#09090b] light:bg-[#eae6d8] border-y border-white/10 dark:border-white/10 light:border-black/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-street text-blaze tracking-widest uppercase mb-2">
            STREET VALIDATION // VERIFIED BLAZERS
          </div>
          <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-cream dark:text-cream light:text-[#121216]">
            THE INTERNET <span className="text-blaze">IS HUNGRY.</span>
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex text-blaze">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-blaze text-blaze" />
            ))}
          </div>
          <span className="font-display text-2xl text-cream dark:text-cream light:text-black">4.9 / 5.0</span>
          <span className="text-xs font-street text-cream/50 dark:text-cream/50 light:text-black/50">(2,400+ REVIEWS)</span>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {REVIEWS.map((review) => (
          <div
            key={review.id}
            className="p-6 rounded-3xl bg-[#121217] dark:bg-[#121217] light:bg-white border border-white/10 dark:border-white/10 light:border-black/10 flex flex-col justify-between hover:border-blaze/50 transition-all"
          >
            <div>
              {/* Star row */}
              <div className="flex items-center gap-1 mb-4 text-blaze">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-blaze text-blaze" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-sans text-sm text-cream/90 dark:text-cream/90 light:text-black/90 italic mb-6 leading-relaxed">
                "{review.quote}"
              </p>
            </div>

            {/* Author info */}
            <div className="pt-4 border-t border-white/5 dark:border-white/5 light:border-black/5 flex items-center justify-between">
              <div>
                <div className="font-display text-base uppercase text-cream dark:text-cream light:text-[#121216] flex items-center gap-1">
                  <span>{review.author}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-blaze" />
                </div>
                <div className="font-street text-[11px] text-blaze font-medium">
                  {review.handle}
                </div>
              </div>

              <div className="text-right">
                <span className="font-street text-[9px] text-cream/50 dark:text-cream/50 light:text-black/50 block uppercase">
                  FAV DISH
                </span>
                <span className="font-street text-[11px] text-cream/80 dark:text-cream/80 light:text-black/80 font-bold">
                  {review.favoriteItem}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
