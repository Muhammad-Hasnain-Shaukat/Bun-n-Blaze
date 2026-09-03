import React from 'react';
import { Flame, Sparkles, Award, Clock } from 'lucide-react';

export const BrandStatement: React.FC = () => {
  return (
    <section id="philosophy-section" className="relative py-20 sm:py-28 bg-[#0a0a0c] dark:bg-[#0a0a0c] light:bg-[#f5f3e9] border-t border-white/10 dark:border-white/10 light:border-black/10 overflow-hidden transition-colors">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blaze/10 blur-[160px] pointer-events-none" />

      {/* Refined Minimal Marquee Bar */}
      <div className="w-full overflow-hidden border-b border-white/5 dark:border-white/5 light:border-black/5 pb-5 mb-16 whitespace-nowrap">
        <div className="inline-flex animate-marquee items-center gap-10">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-10 text-xs sm:text-sm font-modern uppercase tracking-widest text-cream/70 dark:text-cream/70 light:text-black/70">
              <span className="text-blaze font-bold">CRISPY LACE EDGES</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blaze/60" />
              <span>750°F CAST IRON SEAR</span>
              <span className="w-1.5 h-1.5 rounded-full bg-ember/60" />
              <span className="text-cream dark:text-cream light:text-black font-semibold">HOUSE BLAZE GLAZE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blaze/60" />
              <span>HAND-TOASTED BRIOCHE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-ember/60" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Editorial Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#111116] dark:bg-[#111116] light:bg-white rounded-3xl border border-white/10 dark:border-white/10 light:border-black/10 p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blaze/10 border border-blaze/30 text-blaze font-modern text-xs font-semibold tracking-wider uppercase">
                <Flame className="w-3.5 h-3.5 fill-blaze" />
                <span>OUR CRAFT & PHILOSOPHY</span>
              </div>

              {/* Decent, Balanced Modern Headline */}
              <h2 className="font-modern text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-cream dark:text-cream light:text-[#121216] leading-tight">
                Not Just a Burger.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blaze via-orange-400 to-amber-300">
                  An Obsession With Fire.
                </span>
              </h2>

              <p className="font-sans text-base sm:text-lg text-cream/75 dark:text-cream/75 light:text-black/75 leading-relaxed font-normal">
                We rejected bland corporate assembly lines. Every patty is smashed by hand across scorching 750°F cast iron plates to develop ultra-thin, caramelized lace edges that crackle with every bite. Topped with molten sharp cheddar and drenched in sauces that bite back.
              </p>

              {/* 3 Refined Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 dark:border-white/10 light:border-black/10">
                <div className="p-4 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/5">
                  <div className="font-modern text-blaze text-xs font-bold uppercase tracking-wider mb-1">
                    01 // 750°F SEAR
                  </div>
                  <div className="font-sans text-xs text-cream/80 dark:text-cream/80 light:text-black/80">
                    Maximum Maillard reaction for crispy, savory lace edges.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/5">
                  <div className="font-modern text-ember text-xs font-bold uppercase tracking-wider mb-1">
                    02 // 100% PRIME
                  </div>
                  <div className="font-sans text-xs text-cream/80 dark:text-cream/80 light:text-black/80">
                    Custom blend of brisket, chuck, and short-rib beef.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/5">
                  <div className="font-modern text-orange-400 text-xs font-bold uppercase tracking-wider mb-1">
                    03 // BLAZE DRIP
                  </div>
                  <div className="font-sans text-xs text-cream/80 dark:text-cream/80 light:text-black/80">
                    House-fermented habanero & roasted garlic chili sauce.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Card Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-square border border-white/15 dark:border-white/15 light:border-black/10 shadow-2xl group">
                <img
                  src="/assets/double_inferno.jpg"
                  alt="Craft Smash Burger"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating Bottom Card Tag */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <div>
                    <span className="font-modern text-[11px] uppercase tracking-widest text-blaze font-bold block">
                      SIGNATURE CRAFT
                    </span>
                    <span className="font-modern text-lg text-white font-bold">
                      Double Inferno Smash
                    </span>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-cream text-xs font-modern font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blaze animate-ping" />
                    <span>750°F Cast Iron</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
