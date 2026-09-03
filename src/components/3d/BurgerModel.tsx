import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BurgerModelProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scrollProgress?: number;
}

export const BurgerModel: React.FC<BurgerModelProps> = ({ mouse }) => {
  const groupRef = useRef<THREE.Group>(null);
  const topBunRef = useRef<THREE.Mesh>(null);
  const bottomBunRef = useRef<THREE.Mesh>(null);
  const patty1Ref = useRef<THREE.Mesh>(null);
  const patty2Ref = useRef<THREE.Mesh>(null);
  const cheese1Ref = useRef<THREE.Mesh>(null);
  const cheese2Ref = useRef<THREE.Mesh>(null);
  const lettuceRef = useRef<THREE.Mesh>(null);

  // Generate 3D Sesame Seeds positions on the top bun
  const sesameSeeds = useMemo(() => {
    const seeds: { pos: [number, number, number]; rot: [number, number, number] }[] = [];
    const seedCount = 65;
    for (let i = 0; i < seedCount; i++) {
      const phi = Math.acos(1 - Math.random() * 0.7); // top dome hemisphere
      const theta = Math.random() * Math.PI * 2;
      const r = 1.32; // slightly above top bun surface
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi) + 0.95;
      const z = r * Math.sin(phi) * Math.sin(theta);
      seeds.push({
        pos: [x, y, z],
        rot: [phi, theta, Math.random() * 0.5],
      });
    }
    return seeds;
  }, []);

  // Frame animation: continuous gentle float, mouse parallax, and smooth rotation
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Gentle floating
    groupRef.current.position.y = -0.15 + Math.sin(time * 1.4) * 0.1;

    // Smooth mouse parallax interpolation
    const targetRotX = mouse.current.y * 0.3 + 0.05;
    const targetRotY = time * 0.35 + mouse.current.x * 0.5;

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      3,
      delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      3,
      delta
    );
  });

  return (
    <group ref={groupRef} position={[0, -0.15, 0]} scale={[1.0, 1.0, 1.0]}>
      {/* 1. TOP BRIOCHE BUN (Golden Glazed Dome) */}
      <mesh ref={topBunRef} position={[0, 1.05, 0]} castShadow>
        <sphereGeometry args={[1.3, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
        <meshStandardMaterial
          color="#d97724"
          roughness={0.25}
          metalness={0.1}
          bumpScale={0.05}
        />
      </mesh>

      {/* Sesame Seeds */}
      {sesameSeeds.map((seed, idx) => (
        <mesh key={idx} position={seed.pos} rotation={seed.rot}>
          <boxGeometry args={[0.04, 0.02, 0.08]} />
          <meshStandardMaterial color="#fae8c8" roughness={0.4} />
        </mesh>
      ))}

      {/* 2. MELTED CHEDDAR DRIP TOP */}
      <mesh ref={cheese1Ref} position={[0, 0.72, 0]} rotation={[0, 0.4, 0]}>
        <boxGeometry args={[2.0, 0.08, 2.0]} />
        <meshStandardMaterial
          color="#ff9d00"
          roughness={0.2}
          metalness={0.15}
          emissive="#ff5500"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* 3. PRIME SMASH BEEF PATTY #1 */}
      <mesh ref={patty1Ref} position={[0, 0.52, 0]} castShadow>
        <cylinderGeometry args={[1.35, 1.38, 0.32, 32]} />
        <meshStandardMaterial
          color="#2e170b"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* 4. MELTED CHEDDAR DRIP BOTTOM */}
      <mesh ref={cheese2Ref} position={[0, 0.32, 0]} rotation={[0, -0.3, 0]}>
        <boxGeometry args={[2.1, 0.08, 2.1]} />
        <meshStandardMaterial
          color="#ffa812"
          roughness={0.25}
          metalness={0.1}
        />
      </mesh>

      {/* 5. PRIME SMASH BEEF PATTY #2 */}
      <mesh ref={patty2Ref} position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[1.38, 1.4, 0.34, 32]} />
        <meshStandardMaterial
          color="#261309"
          roughness={0.92}
          metalness={0.1}
        />
      </mesh>

      {/* 6. CRISP RUFFLED GREEN LETTUCE */}
      <mesh ref={lettuceRef} position={[0, -0.15, 0]} rotation={[0.05, 0.8, -0.05]}>
        <cylinderGeometry args={[1.45, 1.48, 0.12, 16]} />
        <meshStandardMaterial
          color="#4ade80"
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>

      {/* 7. SLICE OF RIPE TOMATO */}
      <mesh position={[0.15, -0.28, 0.1]}>
        <cylinderGeometry args={[1.25, 1.25, 0.14, 24]} />
        <meshStandardMaterial
          color="#dc2626"
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* 8. TOASTED BOTTOM BRIOCHE BUN */}
      <mesh ref={bottomBunRef} position={[0, -0.55, 0]} receiveShadow>
        <cylinderGeometry args={[1.25, 1.18, 0.38, 32]} />
        <meshStandardMaterial
          color="#c86d1b"
          roughness={0.35}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
};
