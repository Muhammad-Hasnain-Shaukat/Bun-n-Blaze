import React from 'react';
import { Flame, Clock, Sparkles, Layers } from 'lucide-react';

export const BrandPillars: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'REAL FLAVOR',
      subtitle: 'NO BORING BITES',
      desc: 'Zero pre-cooked patties warming in steam drawers. We blend prime brisket, chuck, and short rib seared hot on 750°F cast iron.',
      icon: Flame,
    },
    {
      num: '02',
      title: 'BUILT FRESH',
      subtitle: 'PREPARED WHEN ORDERED',
      desc: 'From the hand-sliced dill pickles to our twice-daily baked brioche buns, your food hits the bag moments after leaving the flame.',
      icon: Clock,
    },
    {
      num: '03',
      title: 'EXTRA CRISPY',
      subtitle: 'TEXTURE IS KING',
      desc: 'Our smash technique creates ultra-thin, crunchy caramelized lace edges that provide the ultimate satisfying contrast to melted cheese.',
      icon: Sparkles,
    },
    {
      num: '04',
      title: 'ALWAYS LOADED',
      subtitle: 'MORE IS ALWAYS BETTER',
      desc: 'Generous molten cheese cascades, mountain-high crinkle fries, and double-dipped buttermilk fried chicken thighs that overflow the bun.',
      icon: Layers,
    },
  ];

  return (
    <section id="story-section" className="py-24 sm:py-32 bg-[#0c0c10] dark:bg-[#0c0c10] light:bg-[#f6f4ec] transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-block px-3 py-1 rounded bg-blaze/10 border border-blaze/30 text-blaze font-street text-xs tracking-widest uppercase mb-4">
            THE CODE // 4 LAWS OF THE BLAZE
          </div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-cream dark:text-cream light:text-[#121216]">
            WHY <span className="text-blaze">BUN N BLAZE?</span>
          </h2>
          <p className="mt-4 font-sans text-base sm:text-lg text-cream/70 dark:text-cream/70 light:text-black/70">
            Fast food lost its soul to frozen shortcuts and microwave heat lamps. We brought open fire, street hustle, and obsessive craft back to the grill.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="group relative p-8 rounded-3xl bg-[#121217] dark:bg-[#121217] light:bg-white border border-white/10 dark:border-white/10 light:border-black/10 hover:border-blaze/60 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-display text-4xl text-blaze/50 group-hover:text-blaze transition-colors">
                      {pillar.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 flex items-center justify-center text-blaze group-hover:bg-blaze group-hover:text-black transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl uppercase tracking-wide text-cream dark:text-cream light:text-[#121216]">
                    {pillar.title}
                  </h3>
                  <div className="font-street text-xs text-blaze tracking-wider uppercase font-semibold mt-1 mb-4">
                    {pillar.subtitle}
                  </div>

                  <p className="font-sans text-sm text-cream/70 dark:text-cream/70 light:text-black/70 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 dark:border-white/5 light:border-black/5 font-street text-[10px] text-cream/40 dark:text-cream/40 light:text-black/40 uppercase tracking-widest">
                  CERTIFIED BLAZE STANDARD
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
