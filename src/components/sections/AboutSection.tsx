import React from 'react';
import { Flame, Target, Trophy, Heart, ArrowRight, Quote } from 'lucide-react';

interface AboutSectionProps {
  onNavigateToMenu?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigateToMenu }) => {
  return (
    <section id="about" className="py-24 sm:py-36 bg-[#0a0a0d] text-cream relative overflow-hidden border-t border-white/10">
      {/* Ambient Flame Backlight */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-blaze/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-ember/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Overline & Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blaze/15 border border-blaze/30 text-blaze font-sans text-xs font-bold tracking-widest uppercase mb-4 shadow-lg shadow-blaze/20">
            <Flame className="w-4 h-4 fill-blaze animate-pulse" />
            <span>OUR STORY // BORN IN THE FLAMES</span>
          </div>
          
          <h2 className="font-modern text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.08]">
            From A Broken Skillet To A{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blaze via-orange-400 to-amber-300">
              Street Revolution
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-cream/75 font-sans leading-relaxed">
            We started with empty pockets, a beat-up 1984 food cart, and a fierce obsession: smash burgers without compromise. No corporate freezers. No microwave shortcuts. Just pure heat, heart, and uncompromising street grit.
          </p>
        </div>

        {/* Motivational Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Visual Showcase Collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl group">
                <img
                  src="/assets/about_chef.jpg"
                  alt="Grill Master at Work"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-sans font-bold tracking-widest text-blaze uppercase block">
                    THE HUSTLE
                  </span>
                  <span className="text-sm font-bold text-white font-modern">
                    Morning Prep at 5:00 AM
                  </span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#14141a] border border-white/10 shadow-xl">
                <div className="font-modern text-3xl sm:text-4xl font-extrabold text-blaze">
                  750°F
                </div>
                <div className="text-xs text-cream/70 font-sans mt-1 font-semibold uppercase tracking-wider">
                  Cast iron sear temperature to forge caramelized lace edges.
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-blaze/20 to-black/60 border border-blaze/30 shadow-xl">
                <Quote className="w-7 h-7 text-blaze mb-2 opacity-80" />
                <p className="text-xs sm:text-sm font-sans text-cream/90 italic leading-relaxed">
                  "If you aren’t willing to burn your hands perfecting the crust, you don’t deserve to feed the neighborhood."
                </p>
                <div className="text-[11px] font-sans font-bold text-blaze uppercase tracking-wider mt-3">
                  — Chef & Founder Marcus Blaze
                </div>
              </div>

              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl group">
                <img
                  src="/assets/about_flame.jpg"
                  alt="Open Fire Grill Searing"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-sans font-bold tracking-widest text-emerald-400 uppercase block">
                    STREET ENERGY
                  </span>
                  <span className="text-sm font-bold text-white font-modern">
                    100% Never-Frozen Angus
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Motivational Narrative Breakdown */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h3 className="font-modern text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
                The Relentless Pursuit of Pure Fire
              </h3>
              <p className="font-sans text-sm sm:text-base text-cream/80 leading-relaxed">
                Everyone told us we were crazy. They said fast food has to be frozen patties, bulk-bought buns, and automated presses. They said customers only care about cheap speed.
              </p>
              <p className="font-sans text-sm sm:text-base text-cream/80 leading-relaxed">
                We refused. We spent cold midnight shifts smoking hundreds of spice blends, adjusting humidity inside our brioche ovens, and smashing fresh prime beef onto roaring cast iron until the lace crust was paper-thin and shattering with flavor.
              </p>
            </div>

            {/* 3 Core Values / Tenets */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blaze/20 border border-blaze/40 flex items-center justify-center text-blaze shrink-0 mt-0.5">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-modern font-bold text-base text-white uppercase tracking-wide">
                    Zero Compromises, Zero Freezers
                  </h4>
                  <p className="text-xs text-cream/70 font-sans mt-0.5 leading-relaxed">
                    Our ground beef is freshly blended every morning from brisket, chuck, and short-rib. If it isn't fresh today, it never touches our grill.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-ember/20 border border-ember/40 flex items-center justify-center text-ember shrink-0 mt-0.5">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-modern font-bold text-base text-white uppercase tracking-wide">
                    The 750°F Maillard Mastery
                  </h4>
                  <p className="text-xs text-cream/70 font-sans mt-0.5 leading-relaxed">
                    We use custom cast iron weights to press each patty paper-thin against blistering steel plates, producing an ultra-concentrated savory crust that standard chains can never replicate.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-400/20 border border-orange-400/40 flex items-center justify-center text-orange-400 shrink-0 mt-0.5">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-modern font-bold text-base text-white uppercase tracking-wide">
                    Fueling Street Culture
                  </h4>
                  <p className="text-xs text-cream/70 font-sans mt-0.5 leading-relaxed">
                    Bun n Blaze belongs to the night runners, the skaters, the midnight dreamers, and the food lovers who demand authentic soul in every single bite.
                  </p>
                </div>
              </div>
            </div>

            {/* Motivational Action Button to Menu */}
            {onNavigateToMenu && (
              <div className="pt-4">
                <button
                  onClick={onNavigateToMenu}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blaze to-ember text-black font-sans font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-blaze/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                >
                  <span>TASTE THE PASSION • EXPLORE MENU</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Milestone Proof Bar */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#121218] border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="font-modern text-3xl sm:text-5xl font-extrabold text-white">
              500K+
            </div>
            <div className="text-xs font-sans text-blaze font-bold uppercase tracking-wider mt-1">
              Burgers Smashed by Hand
            </div>
          </div>
          <div>
            <div className="font-modern text-3xl sm:text-5xl font-extrabold text-white">
              750°F
            </div>
            <div className="text-xs font-sans text-ember font-bold uppercase tracking-wider mt-1">
              Cast Iron Flame Heat
            </div>
          </div>
          <div>
            <div className="font-modern text-3xl sm:text-5xl font-extrabold text-white">
              0
            </div>
            <div className="text-xs font-sans text-orange-400 font-bold uppercase tracking-wider mt-1">
              Microwaves or Freezers
            </div>
          </div>
          <div>
            <div className="font-modern text-3xl sm:text-5xl font-extrabold text-white">
              4.9 ★
            </div>
            <div className="text-xs font-sans text-emerald-400 font-bold uppercase tracking-wider mt-1">
              Cult Street Rating
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
