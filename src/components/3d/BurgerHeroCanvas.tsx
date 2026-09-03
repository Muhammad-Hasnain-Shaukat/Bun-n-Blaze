import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { BurgerModel } from './BurgerModel';
import { EmberParticles } from './EmberParticles';

export const BurgerHeroCanvas: React.FC = () => {
  const mouse = useRef({ x: 0, y: 0 });
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Detect WebGL capability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch (e) {
      setHasWebGL(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalized coordinates: -1 to 1
      mouse.current.x = (e.clientX / innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <img
          src="/assets/double_inferno.jpg"
          alt="Bun n Blaze Signature Burger"
          className="w-4/5 max-w-lg object-contain drop-shadow-[0_20px_50px_rgba(255,77,0,0.5)] animate-float"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[420px] lg:min-h-[560px]">
      <Canvas
        camera={{ position: [0, 0.05, 6.2], fov: 38 }}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          {/* Studio Lighting */}
          <ambientLight intensity={0.7} />
          
          {/* Main Key Light (Warm Sunlight) */}
          <directionalLight
            position={[4, 6, 4]}
            intensity={2.2}
            color="#fff4e0"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />

          {/* Fiery Blaze Rim Light (Brand Orange from behind) */}
          <directionalLight
            position={[-4, 2, -3]}
            intensity={4.5}
            color="#ff4d00"
          />

          {/* Hot Ember Fill Light from below */}
          <pointLight
            position={[0, -2.5, 1]}
            intensity={3.0}
            color="#ff7700"
            distance={7}
          />

          {/* Top highlight */}
          <pointLight
            position={[0, 4, 2]}
            intensity={1.5}
            color="#ffe6b8"
          />

          {/* 3D Objects */}
          <BurgerModel mouse={mouse} />
          <EmberParticles />
        </Suspense>
      </Canvas>

      {/* Floating 3D badge */}
      <div className="absolute bottom-4 right-4 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[11px] font-street tracking-wider text-cream/70 uppercase">
        <span className="w-2 h-2 rounded-full bg-blaze animate-ping" />
        Interactive 3D • Drag / Move Cursor
      </div>
    </div>
  );
};
