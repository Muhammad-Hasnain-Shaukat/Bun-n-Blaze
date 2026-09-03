import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';

export const HeroSection: React.FC = () => {
  const videoPcRef = useRef<HTMLVideoElement>(null);
  const videoMobileRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoPcRef.current) videoPcRef.current.muted = !isMuted;
    if (videoMobileRef.current) videoMobileRef.current.muted = !isMuted;
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-[calc(100dvh-65px)] sm:h-[calc(100dvh-69px)] bg-black overflow-hidden flex items-center justify-center">
      {/* PC / Desktop Video (hidden on mobile, visible on md and up) */}
      <video
        ref={videoPcRef}
        src="/pc.mp4"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="hidden md:block absolute inset-0 w-full h-full object-cover"
      />

      {/* Mobile Video (visible on mobile, hidden on md and up) */}
      <video
        ref={videoMobileRef}
        src="/mobile.mp4"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="block md:hidden absolute inset-0 w-full h-full object-cover"
      />

      {/* Bottom Video Sound Control - Icon Only, Smaller */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20">
        <button
          onClick={toggleMute}
          className="p-2 sm:p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white/90 backdrop-blur-md border border-white/20 transition-all hover:scale-110 flex items-center justify-center shadow-lg"
          title={isMuted ? 'Unmute' : 'Mute'}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/80" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff4d00]" />
          )}
        </button>
      </div>
    </section>
  );
};
