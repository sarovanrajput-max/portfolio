"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function Core() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (a.current) { a.current.rotation.y += dt * 0.3; a.current.rotation.x += dt * 0.12; }
    if (b.current) b.current.rotation.z -= dt * 0.2;
  });
  return (
    <group>
      <mesh ref={a}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial color="#0b1b3a" emissive="#22d3ee" emissiveIntensity={1.1} wireframe />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial color="#0b1b3a" emissive="#8b5cf6" emissiveIntensity={1.6} />
      </mesh>
      <mesh ref={b} rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[1.9, 0.01, 8, 120]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
    </group>
  );
}

export default function LabCore() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 4]} intensity={30} color="#38bdf8" />
      <Stars radius={30} depth={20} count={900} factor={2} fade speed={0.6} />
      <Core />
    </Canvas>
  );
}
