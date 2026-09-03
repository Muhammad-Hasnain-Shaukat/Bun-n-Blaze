import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';
import { SOCIAL_FEED_PHOTOS } from '../../data/locationsAndReviews';

export const SocialFeed: React.FC = () => {
  return (
    <section id="social-section" className="py-24 sm:py-32 bg-[#0a0a0c] dark:bg-[#0a0a0c] light:bg-[#f3efe4] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blaze/10 border border-blaze/30 text-blaze font-street text-xs tracking-widest uppercase mb-3">
              <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>@BUNNBLAZE</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl uppercase tracking-tight text-cream dark:text-cream light:text-[#121216]">
              BLAZE YOUR <span className="text-blaze">FEED</span>
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 dark:border-white/15 light:border-black/15 text-cream dark:text-cream light:text-black hover:border-blaze hover:text-blaze transition-all font-street text-xs uppercase tracking-wider font-semibold w-fit"
          >
            <span>FOLLOW THE MOVEMENT</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SOCIAL_FEED_PHOTOS.map((photo, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden aspect-square bg-zinc-900 border border-white/10 dark:border-white/10 light:border-black/10 cursor-pointer"
            >
              <img
                src={photo.image}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                loading="lazy"
              />

              {/* Hover overlay with likes & caption */}
              <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-cream">
                <div className="flex justify-between items-center text-xs font-street">
                  <span className="text-blaze font-bold">{photo.tag}</span>
                  <div className="flex items-center gap-1 text-red-500">
                    <Heart className="w-3.5 h-3.5 fill-red-500" />
                    <span>{photo.likes}</span>
                  </div>
                </div>

                <p className="text-xs font-sans line-clamp-3 text-cream/90">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
