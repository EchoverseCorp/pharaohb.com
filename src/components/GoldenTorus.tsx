import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface TorusProps {
  scrollProgress: number;
}

function Torus({ scrollProgress }: TorusProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create golden material
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D4AF37'),
      metalness: 0.9,
      roughness: 0.2,
      emissive: new THREE.Color('#B8860B'),
      emissiveIntensity: 0.1,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
      
      // Subtle breathing effect
      const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.scale.setScalar(1 + breathe);
      
      // Parallax based on scroll
      meshRef.current.position.y = -scrollProgress * 3;
      meshRef.current.rotation.z = scrollProgress * Math.PI * 0.5;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <mesh ref={meshRef} material={material}>
        <torusGeometry args={[1.8, 0.45, 24, 72]} />
      </mesh>
    </Float>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight 
        position={[10, 10, 10]} 
        intensity={1.5} 
        color="#D4AF37" 
      />
      <pointLight 
        position={[-10, -10, -10]} 
        intensity={0.5} 
        color="#B8860B" 
      />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#FFD700"
      />
    </>
  );
}

interface GoldenTorusProps {
  scrollProgress: number;
}

export function GoldenTorus({ scrollProgress }: GoldenTorusProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ 
          opacity: Math.max(0.08, 0.35 - scrollProgress * 0.2),
          transition: 'opacity 0.3s ease-out'
        }}
      >
        <Lighting />
        <Torus scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

export default GoldenTorus;
