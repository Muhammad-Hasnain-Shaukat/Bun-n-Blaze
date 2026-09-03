import React, { useState, useMemo } from 'react';
import { CATEGORIES, MENU_ITEMS } from '../../data/menuItems';
import { CategoryType } from '../../types';
import { FoodCard } from './FoodCard';
import { Flame, Sparkles } from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';
import { playSound } from '../../utils/audio';

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const { menuList, soundEnabled } = useOrderStore();

  const handleCategoryChange = (cat: CategoryType) => {
    if (soundEnabled) playSound('click');
    setActiveCategory(cat);
  };

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return menuList;
    return menuList.filter((item) => item.category === activeCategory);
  }, [activeCategory, menuList]);

  return (
    <section id="menu-section" className="py-24 sm:py-32 relative z-10 bg-[#0b0b0e] dark:bg-[#0b0b0e] light:bg-[#f4f2eb] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blaze/10 border border-blaze/30 text-blaze font-street text-xs tracking-widest uppercase mb-3">
              <Flame className="w-3.5 h-3.5 fill-blaze" />
              <span>STREET RECIPES</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl uppercase tracking-tight text-cream dark:text-cream light:text-[#121216]">
              THE <span className="text-blaze">HEAT LIST</span>
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-cream/70 dark:text-cream/70 light:text-black/70 max-w-md">
            Every item is built to order on searing 750°F cast iron plates. Choose your smash, select your heat rating, and devour.
          </p>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 scrollbar-none mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id as CategoryType)}
                className={`px-5 py-2.5 rounded-full font-street text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-blaze text-black shadow-lg shadow-blaze/30 scale-105'
                    : 'bg-zinc-900/80 dark:bg-zinc-900/80 light:bg-white text-cream/70 dark:text-cream/70 light:text-black/70 border border-white/10 dark:border-white/10 light:border-black/10 hover:border-blaze/50 hover:text-cream'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Uniform Symmetrical Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
