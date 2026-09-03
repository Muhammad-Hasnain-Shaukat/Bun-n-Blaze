import React from 'react';
import { Flame, Plus, Sliders, Check } from 'lucide-react';
import { MenuItem } from '../../types';
import { useCartStore } from '../../store/useCartStore';
import { useOrderStore } from '../../store/useOrderStore';
import { playSound } from '../../utils/audio';

interface FoodCardProps {
  item: MenuItem;
  featured?: boolean;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { addToCart } = useCartStore();
  const { setCustomizingItem, soundEnabled } = useOrderStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (soundEnabled) playSound('add');
    addToCart(item);
  };

  const handleCustomize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (soundEnabled) playSound('click');
    setCustomizingItem(item);
  };

  const isDeal = item.category === 'deals';

  return (
    <div
      onClick={handleCustomize}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 bg-[#121216] dark:bg-[#121216] light:bg-white border ${
        isDeal
          ? 'border-blaze/50 shadow-2xl shadow-blaze/15 ring-1 ring-blaze/30'
          : 'border-white/10 dark:border-white/10 light:border-black/10 hover:border-blaze/60 shadow-xl'
      } flex flex-col justify-between hover:-translate-y-1.5`}
    >
      {/* Top Media & Badges */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-black/40">
        <img
          src={item.image}
          alt={item.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/double_inferno.jpg';
          }}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Ambient Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-black/30 dark:from-[#121216] light:from-white light:via-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 items-center">
          {item.badge && (
            <span className="px-2.5 py-0.5 rounded-full bg-blaze text-black font-sans text-[10px] tracking-wider font-extrabold uppercase shadow-lg shadow-blaze/40">
              {item.badge}
            </span>
          )}
          {item.calories && (
            <span className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-cream/80 text-[10px] font-sans tracking-wider border border-white/10">
              {item.calories} KCAL
            </span>
          )}
        </div>

        {/* Heat Rating Flame Meter */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10">
          {[1, 2, 3].map((level) => (
            <Flame
              key={level}
              className={`w-3 h-3 transition-colors ${
                level <= item.heatLevel
                  ? 'text-blaze fill-blaze animate-pulse'
                  : 'text-zinc-600 dark:text-zinc-600 light:text-zinc-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card Content - Compact & Tightly Spaced (Zero Vacant Space) */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="text-[11px] font-sans text-blaze tracking-wider uppercase mb-1 font-bold">
            {item.tagline}
          </div>
          <h3 className="font-modern font-bold text-xl sm:text-2xl uppercase tracking-tight text-cream dark:text-cream light:text-[#121216]">
            {item.name}
          </h3>

          <p className="mt-1.5 text-xs sm:text-sm text-cream/70 dark:text-cream/70 light:text-black/70 line-clamp-2 leading-relaxed font-sans">
            {item.description}
          </p>

          {/* Included Deal Items / Ingredient Badges */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {item.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className={`text-[10px] font-sans px-2 py-0.5 rounded-md border ${
                    isDeal
                      ? 'bg-blaze/10 text-blaze border-blaze/30 font-semibold'
                      : 'bg-white/5 dark:bg-white/5 light:bg-black/5 text-cream/80 dark:text-cream/80 light:text-black/80 border-white/5'
                  }`}
                >
                  {isDeal ? `✓ ${ing}` : ing}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price & Action Row - Snug at bottom */}
        <div className="mt-4 pt-3.5 border-t border-white/10 dark:border-white/10 light:border-black/10 flex items-center justify-between">
          <div>
            <span className="font-sans text-[9px] text-cream/50 dark:text-cream/50 light:text-black/50 uppercase tracking-widest block font-bold">
              PRICE
            </span>
            <span className="font-modern text-xl sm:text-2xl text-cream dark:text-cream light:text-black font-extrabold">
              ${item.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {item.customizable && (
              <button
                onClick={handleCustomize}
                className="p-2.5 rounded-xl bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-100 text-cream dark:text-cream light:text-black hover:text-blaze hover:bg-zinc-700 transition-colors border border-white/10"
                title="Customize burger and add-ons"
              >
                <Sliders className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleQuickAdd}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blaze to-ember hover:from-blaze/90 hover:to-ember/90 text-black font-sans font-bold text-xs tracking-wider uppercase shadow-md shadow-blaze/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>ADD</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
