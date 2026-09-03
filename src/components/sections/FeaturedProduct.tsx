import React from 'react';
import { Flame, CheckCircle, Sliders, ShieldCheck, Zap } from 'lucide-react';
import { MENU_ITEMS } from '../../data/menuItems';
import { useOrderStore } from '../../store/useOrderStore';
import { useCartStore } from '../../store/useCartStore';
import { playSound } from '../../utils/audio';

export const FeaturedProduct: React.FC = () => {
  const doubleInferno = MENU_ITEMS[0];
  const { setCustomizingItem, soundEnabled } = useOrderStore();
  const { addToCart } = useCartStore();

  const handleOrder = () => {
    if (soundEnabled) playSound('flame');
    setCustomizingItem(doubleInferno);
  };

  const handleQuickAdd = () => {
    if (soundEnabled) playSound('add');
    addToCart(doubleInferno);
  };

  return (
    <section id="featured-section" className="py-24 sm:py-32 relative bg-[#09090b] dark:bg-[#09090b] light:bg-[#ece8dc] overflow-hidden border-t border-white/10 dark:border-white/10 light:border-black/10">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blaze/15 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Huge Cinematic Product Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-square max-w-xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-blaze/20 border-2 border-blaze/40 group">
              <img
                src="/assets/double_inferno.jpg"
                alt="Double Inferno Burger"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Flag */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <span className="px-4 py-1.5 rounded-full bg-blaze text-black font-street text-xs font-black uppercase tracking-wider shadow-lg shadow-blaze/50">
                  FLAGSHIP ICON
                </span>
                <span className="font-display text-3xl text-cream font-bold drop-shadow-md">
                  ${doubleInferno.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Micro badge */}
            <div className="absolute -top-4 -right-4 bg-[#121216] dark:bg-[#121216] light:bg-white p-4 rounded-2xl border border-blaze/40 shadow-xl hidden sm:flex items-center gap-3">
              <Flame className="w-6 h-6 text-blaze fill-blaze animate-bounce" />
              <div>
                <div className="font-display text-sm tracking-wider uppercase">SEARING HEAT</div>
                <div className="font-street text-[10px] text-blaze font-bold">LEVEL 3 INFERNO</div>
              </div>
            </div>
          </div>

          {/* Right Column: Breakdown, Metrics & CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blaze/10 border border-blaze/30 text-blaze font-street text-xs tracking-widest uppercase mb-4 w-fit">
              <Zap className="w-3.5 h-3.5 fill-blaze" />
              <span>THE GOLD STANDARD</span>
            </div>

            <h2 className="font-display text-5xl sm:text-7xl uppercase tracking-tight leading-[0.95] text-cream dark:text-cream light:text-[#121216] mb-6">
              MEET THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blaze via-ember to-orange-400">
                DOUBLE INFERNO
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-cream/75 dark:text-cream/75 light:text-black/75 leading-relaxed mb-8">
              Engineered for absolute indulgence. Two 1/4 lb prime beef patties smashed wafer-thin for maximal Maillard crust, layered with thick ribbons of melted sharp smoked cheddar, blistered serrano & jalapeño rings, and drenched in our secret Blaze drip.
            </p>

            {/* Flavor Metrics Bars */}
            <div className="space-y-4 mb-8 bg-[#121216]/60 dark:bg-[#121216]/60 light:bg-white/80 p-5 rounded-2xl border border-white/10 dark:border-white/10 light:border-black/10">
              <div className="font-street text-xs uppercase tracking-widest text-cream/60 dark:text-cream/60 light:text-black/60 mb-2">
                // SENSORY FLAVOR PROFILE
              </div>

              {[
                { label: 'CRISP SMASH CRUST', val: 92 },
                { label: 'BLAZE HEAT INTENSITY', val: 95 },
                { label: 'PATTY JUICINESS', val: 98 },
                { label: 'SMOKY CHAR DEPTH', val: 88 },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="flex justify-between text-xs font-street tracking-wider mb-1 text-cream/80 dark:text-cream/80 light:text-black/80">
                    <span>{metric.label}</span>
                    <span className="text-blaze font-bold">{metric.val}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800/80 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blaze to-ember transition-all duration-1000"
                      style={{ width: `${metric.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleOrder}
                className="px-8 py-4 rounded-xl font-display text-lg tracking-wider bg-gradient-to-r from-blaze to-ember text-black font-bold shadow-xl shadow-blaze/30 hover:shadow-blaze/60 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Sliders className="w-5 h-5 text-black" />
                <span>CUSTOMIZE & ORDER</span>
              </button>

              <button
                onClick={handleQuickAdd}
                className="px-6 py-4 rounded-xl font-display text-lg tracking-wider bg-zinc-900 dark:bg-zinc-900 light:bg-white border border-white/15 dark:border-white/15 light:border-black/15 text-cream dark:text-cream light:text-black hover:border-blaze hover:text-blaze transition-all"
              >
                QUICK ADD — ${doubleInferno.price.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
