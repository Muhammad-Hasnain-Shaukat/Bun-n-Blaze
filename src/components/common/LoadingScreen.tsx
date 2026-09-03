import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 700);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070709] transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center px-6">
        {/* Brand Fiery Logo */}
        <div className="relative mb-4 flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Bun n Blaze"
            className="w-64 sm:w-80 max-w-[90vw] h-auto object-contain drop-shadow-[0_20px_60px_rgba(255,77,0,0.65)] animate-float"
          />
          <div className="absolute inset-0 rounded-full bg-blaze/25 blur-3xl pointer-events-none animate-pulse" />
        </div>

        {/* Sleek Fire Loading Progress */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="w-44 sm:w-56 h-1 bg-white/10 rounded-full overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blaze via-amber-400 to-orange-500 rounded-full animate-pulse" />
          </div>

          <div className="flex items-center gap-2 font-sans text-[11px] tracking-[0.25em] text-cream/60 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blaze animate-ping" />
            <span>FIRING UP THE GRILL...</span>
          </div>
        </div>
      </div>
    </div>
  );
};
