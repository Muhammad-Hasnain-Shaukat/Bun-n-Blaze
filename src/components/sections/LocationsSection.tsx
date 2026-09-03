import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, ArrowUpRight, MessageSquare, PhoneCall, Flame, Send } from 'lucide-react';
import { STORE_LOCATIONS } from '../../data/locationsAndReviews';
import { useOrderStore } from '../../store/useOrderStore';
import { playSound } from '../../utils/audio';

export const LocationsSection: React.FC = () => {
  const [selectedLoc, setSelectedLoc] = useState(STORE_LOCATIONS[0]);
  const { soundEnabled } = useOrderStore();

  const handleSelect = (loc: typeof STORE_LOCATIONS[0]) => {
    if (soundEnabled) playSound('click');
    setSelectedLoc(loc);
  };

  const scrollToMenu = () => {
    if (soundEnabled) playSound('flame');
    const el = document.getElementById('menu-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="contact-section"
      className="py-24 sm:py-32 bg-[#09090c] dark:bg-[#09090c] light:bg-[#ebe7db] transition-colors relative border-t border-white/10 dark:border-white/10 light:border-black/10 scroll-mt-20"
    >
      <div id="locations-section" className="scroll-mt-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blaze/10 border border-blaze/30 text-blaze font-sans text-xs font-bold tracking-widest uppercase mb-3">
            <Flame className="w-3.5 h-3.5 fill-blaze" />
            <span>CONTACT & RAPID DISPATCH</span>
          </div>
          <h2 className="font-modern text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-cream dark:text-cream light:text-[#121216]">
            CONNECT & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blaze to-ember">ORDER DIRECT</span>
          </h2>
          <p className="mt-2 font-sans text-cream/70 dark:text-cream/70 light:text-black/70 max-w-xl text-base">
            Order instantly via WhatsApp, call our direct kitchen hotlines for rapid curbside pickup, or visit our street grill stations.
          </p>
        </div>

        {/* --- DEDICATED WHATSAPP & PHONE HOTLINES HUB --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Card 1: Order on WhatsApp */}
          <div className="lg:col-span-6 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c2417] via-[#091810] to-[#070e0a] border-2 border-emerald-500/50 p-7 sm:p-9 shadow-2xl flex flex-col justify-between group">
            {/* Ambient emerald backlight */}
            <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-sans text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>FAST TRACK ORDERS</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
              </div>

              <h3 className="font-modern font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                Order on WhatsApp
              </h3>
              
              <p className="mt-2 text-sm text-emerald-100/75 font-sans leading-relaxed">
                Skip the web checkout! Message our kitchen directly on WhatsApp to place orders, request customized fire levels, or arrange priority curbside dispatch.
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-black/40 border border-emerald-500/30 backdrop-blur-md">
                <div className="text-[11px] font-sans text-emerald-400 font-bold uppercase tracking-widest mb-1">
                  OFFICIAL WHATSAPP NUMBER
                </div>
                <div className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-wide flex items-center gap-2">
                  <span>+1 (555) 839-BLAZE</span>
                </div>
                <div className="text-xs text-emerald-200/60 font-sans mt-0.5">
                  Direct Line: +1 (555) 839-2529 • Available 11:00 AM – 3:00 AM
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-emerald-500/20">
              <a
                href="https://wa.me/15558392529?text=Hello%20Bun%20n%20Blaze!%20I%20would%20like%20to%20place%20an%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-sans font-extrabold text-sm tracking-wider uppercase text-center shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-[0.98]"
              >
                {/* WhatsApp Vector Icon */}
                <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>CLICK TO CHAT & ORDER ON WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Card 2: Phone Hotlines (Two numbers included) */}
          <div className="lg:col-span-6 relative overflow-hidden rounded-3xl bg-[#14141a] border-2 border-blaze/50 p-7 sm:p-9 shadow-2xl flex flex-col justify-between group">
            {/* Ambient flame backlight */}
            <div className="absolute top-0 right-0 w-60 h-60 bg-blaze/20 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blaze/20 border border-blaze/40 text-blaze font-sans text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 fill-blaze" />
                  <span>DIRECT KITCHEN HOTLINES</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blaze/20 border border-blaze/40 flex items-center justify-center text-blaze">
                  <PhoneCall className="w-5 h-5" />
                </div>
              </div>

              <h3 className="font-modern font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                Phone Hotlines
              </h3>
              
              <p className="mt-2 text-sm text-cream/70 font-sans leading-relaxed">
                Direct audio contact lines to our kitchen managers. Call for phone takeout orders, catering inquiries, or direct curbside delivery.
              </p>

              {/* Two Phone Numbers */}
              <div className="mt-6 space-y-3.5">
                {/* Number 1 */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-blaze/50 transition-colors flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-sans text-blaze font-bold uppercase tracking-widest">
                      PRIMARY HOTLINE // PICKUP & CURBSIDE
                    </div>
                    <div className="font-sans font-extrabold text-xl sm:text-2xl text-cream">
                      +1 (555) 742-FIRE
                    </div>
                    <div className="text-xs text-cream/50 font-sans">
                      (555) 742-3473 • Lines 1 & 2
                    </div>
                  </div>
                  <a
                    href="tel:+15557423473"
                    className="px-4 py-2.5 rounded-xl bg-blaze hover:bg-blaze/90 text-black font-sans font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-md shadow-blaze/30"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>CALL LINE 1</span>
                  </a>
                </div>

                {/* Number 2 (One more number requested) */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-ember/50 transition-colors flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-sans text-ember font-bold uppercase tracking-widest">
                      SECONDARY LINE // MIDNIGHT DELIVERY & CATERING
                    </div>
                    <div className="font-sans font-extrabold text-xl sm:text-2xl text-cream">
                      +1 (555) 928-3473
                    </div>
                    <div className="text-xs text-cream/50 font-sans">
                      (555) 928-FIRE • Dispatch Line
                    </div>
                  </div>
                  <a
                    href="tel:+15559283473"
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-cream font-sans font-bold text-xs tracking-wider uppercase border border-white/15 transition-all flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-ember" />
                    <span>CALL LINE 2</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-cream/50 font-sans">
              <span>Kitchen open daily until 3:00 AM</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Phone Operators On Duty
              </span>
            </div>
          </div>
        </div>

        {/* --- GRILL STATIONS & MAP FINDER --- */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-modern text-2xl sm:text-3xl font-bold uppercase tracking-wide text-cream dark:text-cream light:text-[#121216]">
            GRILL STATIONS // MAP & DIRECTIONS
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Location Selection Column */}
          <div className="lg:col-span-6 space-y-4">
            {STORE_LOCATIONS.map((loc) => {
              const isSelected = selectedLoc.id === loc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => handleSelect(loc)}
                  className={`p-6 sm:p-7 rounded-3xl cursor-pointer border transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#15151c] dark:bg-[#15151c] light:bg-white border-blaze shadow-2xl shadow-blaze/20 ring-1 ring-blaze scale-[1.01]'
                      : 'bg-[#101014] dark:bg-[#101014] light:bg-white/70 border-white/10 dark:border-white/10 light:border-black/10 hover:border-blaze/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-3 py-1 rounded-full bg-white/5 dark:bg-white/5 light:bg-black/5 text-blaze font-street text-[10px] tracking-widest uppercase font-bold border border-white/10">
                      {loc.tag}
                    </span>
                    <span className="font-street text-xs text-green-400 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      {loc.status}
                    </span>
                  </div>

                  <h3 className="font-modern text-xl sm:text-2xl font-bold uppercase tracking-wide text-cream dark:text-cream light:text-[#121216]">
                    {loc.name}
                  </h3>
                  <p className="text-xs font-sans text-cream/60 dark:text-cream/60 light:text-black/60 mt-1 mb-4">
                    {loc.area} • {loc.latLng}
                  </p>

                  <div className="space-y-2 text-sm text-cream/80 dark:text-cream/80 light:text-black/80 font-sans border-t border-white/5 dark:border-white/5 light:border-black/5 pt-4">
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-blaze shrink-0" />
                      <span>{loc.address}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-ember shrink-0" />
                      <span>{loc.hours}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-cream/50 shrink-0" />
                      <span>{loc.phone}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Preview & Quick Action Panel */}
          <div className="lg:col-span-6 bg-[#131318] dark:bg-[#131318] light:bg-white rounded-3xl border border-white/10 dark:border-white/10 light:border-black/10 p-6 sm:p-8 flex flex-col justify-between min-h-[440px] shadow-2xl">
            {/* Mock Dark Map Graphic */}
            <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-[#0d0d12] border border-white/10 flex items-center justify-center p-6 text-center">
              {/* Decorative Map Grid & Streets */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ff4d00_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute inset-0">
                <svg className="w-full h-full stroke-white/10" fill="none">
                  <line x1="0" y1="80" x2="100%" y2="80" strokeWidth="2" />
                  <line x1="0" y1="180" x2="100%" y2="180" strokeWidth="3" />
                  <line x1="120" y1="0" x2="120" y2="100%" strokeWidth="2" />
                  <line x1="280" y1="0" x2="280" y2="100%" strokeWidth="4" />
                </svg>
              </div>

              {/* Pin Center */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-blaze/30 animate-ping absolute inset-0" />
                  <div className="w-12 h-12 rounded-full bg-blaze text-black flex items-center justify-center shadow-xl shadow-blaze/50 relative z-10">
                    <MapPin className="w-6 h-6 fill-black" />
                  </div>
                </div>
                <div className="mt-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-blaze/40 font-modern text-sm tracking-wider uppercase text-cream font-bold">
                  {selectedLoc.name}
                </div>
              </div>
            </div>

            {/* Selected Location Details & Action Buttons */}
            <div className="mt-6 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-sans text-cream/50 dark:text-cream/50 light:text-black/50 uppercase tracking-widest font-semibold">
                    ACTIVE SELECTION
                  </div>
                  <div className="font-modern text-xl text-cream dark:text-cream light:text-[#121216] font-bold uppercase">
                    {selectedLoc.name}
                  </div>
                  <div className="text-xs text-cream/70 dark:text-cream/70 light:text-black/70">
                    {selectedLoc.address}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(selectedLoc.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl border border-white/15 dark:border-white/15 light:border-black/15 text-cream dark:text-cream light:text-black hover:border-blaze hover:text-blaze transition-all font-sans text-xs uppercase tracking-wider font-semibold flex items-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>DIRECTIONS</span>
                  </a>

                  <button
                    onClick={scrollToMenu}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blaze to-ember text-black font-sans text-sm tracking-wider font-bold shadow-lg shadow-blaze/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <span>ORDER HERE</span>
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
