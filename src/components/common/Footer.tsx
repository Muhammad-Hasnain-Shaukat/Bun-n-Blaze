import React, { useState } from 'react';
import { Flame, Check, Gem } from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';
import { playSound } from '../../utils/audio';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { soundEnabled, setCurrentPage, setAdminOpen } = useOrderStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (soundEnabled) playSound('success');
    setSubscribed(true);
  };

  const scrollTo = (id: string) => {
    if (soundEnabled) playSound('click');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070709] text-cream border-t border-white/10 pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Bun n Blaze Logo"
                className="h-10 w-auto object-contain drop-shadow-[0_2px_10px_rgba(255,77,0,0.4)]"
              />
              <span className="font-sans font-bold text-2xl tracking-tight text-cream">
                BUN <span className="text-blaze">N</span> BLAZE
              </span>
            </div>

            <p className="font-sans text-sm text-cream/70 max-w-sm leading-relaxed">
              Street culture meets 750°F open-flame smash burgers. Crafted without compromise for midnight runs, loaded cravings, and bold appetites.
            </p>

            <div className="flex items-center gap-3 text-cream/70">
              {/* Instagram */}
              <a href="#" className="p-2.5 rounded-full bg-white/5 hover:text-blaze hover:bg-white/10 transition-all">
                <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a href="#" className="p-2.5 rounded-full bg-white/5 hover:text-blaze hover:bg-white/10 transition-all">
                <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a href="#" className="p-2.5 rounded-full bg-white/5 hover:text-blaze hover:bg-white/10 transition-all">
                <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.02 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xs font-sans text-blaze uppercase tracking-widest font-bold">
              NAVIGATION
            </div>
            <ul className="space-y-2.5 font-sans text-xs uppercase tracking-wider text-cream/70">
              <li>
                <button onClick={() => setCurrentPage('home')} className="hover:text-blaze transition-colors">
                  Home & Story
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('menu')} className="hover:text-blaze transition-colors">
                  The Menu
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('featured')} className="hover:text-blaze transition-colors">
                  Double Inferno
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('philosophy')} className="hover:text-blaze transition-colors">
                  Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('locations')} className="hover:text-blaze transition-colors">
                  Grill Spots
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Service */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xs font-street text-blaze uppercase tracking-widest font-bold">
              HOURS
            </div>
            <div className="space-y-2 text-xs font-sans text-cream/70">
              <p><strong className="text-cream">Mon – Thu:</strong> 11am – 2am</p>
              <p><strong className="text-cream">Fri – Sat:</strong> 11am – 4am</p>
              <p><strong className="text-cream">Sunday:</strong> 11am – 1am</p>
              <p className="text-blaze pt-1 font-street font-bold">24/7 DRIVE-THRU</p>
            </div>
          </div>

          {/* Newsletter Drops */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-street text-blaze uppercase tracking-widest font-bold">
              SECRET DROP CLUB
            </div>
            <p className="text-xs font-sans text-cream/70">
              Subscribe to unlock secret menu drops, pop-up events, and midnight flash deals.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-street flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>YOU’RE ON THE VIP LIST 🔥</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-xs text-cream focus:border-blaze focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-blaze text-black font-display tracking-wider text-xs font-bold hover:bg-ember transition-colors"
                >
                  JOIN
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-cream/50">
          <div className="flex items-center gap-2">
            <span>© 2026 BUN N BLAZE RESTAURANT GROUP. ALL RIGHTS RESERVED.</span>
            <button
              onClick={() => {
                if (soundEnabled) playSound('click');
                setAdminOpen(true);
              }}
              title="Secret Admin Portal"
              aria-label="Secret Admin Portal"
              className="text-cream/30 hover:text-blaze transition-all p-1 cursor-pointer group inline-flex items-center"
            >
              <Gem className="w-3.5 h-3.5 text-cream/40 group-hover:text-blaze group-hover:scale-125 transition-all" />
            </button>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blaze">PRIVACY POLICY</a>
            <a href="#" className="hover:text-blaze">TERMS OF SERVICE</a>
            <a href="#" className="hover:text-blaze">NUTRITIONAL INFO</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
