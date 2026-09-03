import React, { useState } from 'react';
import { ShoppingBag, Menu, X, PhoneCall } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useOrderStore } from '../../store/useOrderStore';
import { playSound } from '../../utils/audio';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { setCartOpen, getItemCount } = useCartStore();
  const { soundEnabled, currentPage, setCurrentPage } = useOrderStore();
  const itemCount = getItemCount();

  const handleNav = (page: 'home' | 'menu' | 'featured' | 'philosophy' | 'feed' | 'locations') => {
    if (soundEnabled) playSound('click');
    setMobileMenuOpen(false);
    setCurrentPage(page);
  };

  const handleContactClick = () => {
    if (soundEnabled) playSound('click');
    setMobileMenuOpen(false);
    setCurrentPage('locations');
    setTimeout(() => {
      const el = document.getElementById('contact-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#160602] via-[#260a03] to-[#160602] border-b-2 border-[#ff4d00]/50 shadow-[0_8px_45px_rgba(255,77,0,0.35)] relative overflow-hidden transition-all">
      {/* Deep Rich Orange Glow Layer */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-[650px] h-[110px] bg-[#d63a00]/30 rounded-full blur-[45px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 -translate-y-1/2 w-[550px] h-[95px] bg-[#ff4d00]/25 rounded-full blur-[40px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#ff4d00]/15 via-transparent to-black/40 pointer-events-none" />
      
      {/* Glowing Neon Orange Bottom Rim */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff4d00] to-transparent shadow-[0_0_15px_#ff4d00]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[68px] flex items-center justify-between relative z-10">
        {/* Brand Logo - Navigates Home */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 group cursor-pointer text-left"
        >
          <img
            src="/logo.png"
            alt="Bun n Blaze Logo"
            className="h-9 sm:h-11 w-auto object-contain drop-shadow-[0_2px_12px_rgba(255,77,0,0.6)] group-hover:scale-105 transition-transform duration-200"
          />
          <span className="font-sans font-extrabold text-xl sm:text-2xl tracking-tight text-white leading-none drop-shadow-sm">
            BUN <span className="text-[#ff4d00]">N</span> BLAZE
          </span>
        </button>

        {/* Desktop Navigation Links - Separate Pages */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-sans font-bold tracking-wide">
          <button
            onClick={() => handleNav('home')}
            className={`transition-all py-1 border-b-2 ${
              currentPage === 'home'
                ? 'text-[#ffaa33] border-[#ffaa33]'
                : 'text-white border-transparent hover:text-[#ffaa33]'
            } drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('menu')}
            className={`transition-all py-1 border-b-2 ${
              currentPage === 'menu'
                ? 'text-[#ffaa33] border-[#ffaa33]'
                : 'text-white border-transparent hover:text-[#ffaa33]'
            } drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]`}
          >
            The Menu
          </button>
          <button
            onClick={() => handleNav('featured')}
            className={`transition-all py-1 border-b-2 ${
              currentPage === 'featured'
                ? 'text-[#ffaa33] border-[#ffaa33]'
                : 'text-white border-transparent hover:text-[#ffaa33]'
            } drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]`}
          >
            Double Inferno
          </button>
          <button
            onClick={() => handleNav('philosophy')}
            className={`transition-all py-1 border-b-2 ${
              currentPage === 'philosophy'
                ? 'text-[#ffaa33] border-[#ffaa33]'
                : 'text-white border-transparent hover:text-[#ffaa33]'
            } drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]`}
          >
            Philosophy
          </button>
          <button
            onClick={() => handleNav('feed')}
            className={`transition-all py-1 border-b-2 ${
              currentPage === 'feed'
                ? 'text-[#ffaa33] border-[#ffaa33]'
                : 'text-white border-transparent hover:text-[#ffaa33]'
            } drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]`}
          >
            Feed
          </button>
          <button
            onClick={() => handleNav('locations')}
            className={`transition-all py-1 border-b-2 ${
              currentPage === 'locations'
                ? 'text-[#ffaa33] border-[#ffaa33]'
                : 'text-white border-transparent hover:text-[#ffaa33]'
            } drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]`}
          >
            Spots
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Contact Symbol Button */}
          <button
            onClick={handleContactClick}
            title="Call Us or Order on WhatsApp"
            aria-label="Contact Hotline & WhatsApp"
            className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-lg bg-zinc-900/90 hover:bg-[#ff4d00]/20 border border-[#ff4d00]/60 hover:border-[#ff4d00] text-cream hover:text-blaze transition-all shadow-[0_0_15px_rgba(255,77,0,0.3)] group cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-blaze group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-sans text-xs font-bold tracking-wider text-white group-hover:text-blaze">
              CONTACT
            </span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => {
              setCartOpen(true);
              if (soundEnabled) playSound('click');
            }}
            className="relative flex items-center justify-center p-2 sm:px-3.5 sm:py-2 rounded-lg bg-zinc-900 dark:bg-zinc-900 light:bg-zinc-100 border border-white/10 dark:border-white/10 light:border-black/10 text-cream dark:text-cream light:text-black hover:border-blaze/50 transition-all group"
          >
            <ShoppingBag className="w-4 h-4 sm:mr-2 text-blaze" />
            <span className="hidden sm:inline font-sans text-xs font-medium tracking-wide">BAG</span>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-blaze text-black font-sans text-xs font-bold flex items-center justify-center shadow-md shadow-blaze/40">
                {itemCount}
              </span>
            )}
          </button>

          {/* Order Now CTA */}
          <button
            onClick={() => handleNav('menu')}
            className="hidden lg:flex items-center justify-center px-4 py-2 rounded-lg font-sans text-sm font-semibold tracking-wide bg-gradient-to-r from-blaze to-ember text-black shadow-md shadow-blaze/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            ORDER NOW
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-white/10 dark:border-white/10 light:border-black/10 text-cream dark:text-cream light:text-black"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] z-40 bg-[#0a0a0c] p-6 flex flex-col justify-between overflow-y-auto border-t border-white/10">
          <div className="flex flex-col gap-5 pt-4 font-sans font-semibold text-xl">
            <div className="text-xs font-sans text-blaze uppercase tracking-widest font-semibold">
              Select Page
            </div>
            <button
              onClick={() => handleNav('home')}
              className={`text-left transition-colors ${currentPage === 'home' ? 'text-blaze font-bold' : 'text-cream hover:text-blaze'}`}
            >
              Home & Origin Story
            </button>
            <button
              onClick={() => handleNav('menu')}
              className={`text-left transition-colors ${currentPage === 'menu' ? 'text-blaze font-bold' : 'text-cream hover:text-blaze'}`}
            >
              The Menu (Heat List)
            </button>
            <button
              onClick={() => handleNav('featured')}
              className={`text-left transition-colors ${currentPage === 'featured' ? 'text-blaze font-bold' : 'text-cream hover:text-blaze'}`}
            >
              Double Inferno Showcase
            </button>
            <button
              onClick={() => handleNav('philosophy')}
              className={`text-left transition-colors ${currentPage === 'philosophy' ? 'text-blaze font-bold' : 'text-cream hover:text-blaze'}`}
            >
              Our Philosophy & Pillars
            </button>
            <button
              onClick={() => handleNav('feed')}
              className={`text-left transition-colors ${currentPage === 'feed' ? 'text-blaze font-bold' : 'text-cream hover:text-blaze'}`}
            >
              Street Feed & Reviews
            </button>
            <button
              onClick={() => handleNav('locations')}
              className={`text-left transition-colors ${currentPage === 'locations' ? 'text-blaze font-bold' : 'text-cream hover:text-blaze'}`}
            >
              Spots, Map & Contact
            </button>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <button
              onClick={() => handleNav('menu')}
              className="w-full py-3.5 rounded-xl font-sans text-base font-bold bg-gradient-to-r from-blaze to-ember text-black shadow-lg shadow-blaze/20 text-center"
            >
              VIEW FULL MENU 🔥
            </button>
            <div className="flex justify-between items-center text-xs font-sans text-cream/50">
              <span>BUN N BLAZE © 2026</span>
              <span>STREET SMASH & FIRE</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
