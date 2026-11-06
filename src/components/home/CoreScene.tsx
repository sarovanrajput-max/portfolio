"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import { portals } from "@/lib/profile";
import { useUniverse } from "@/context/UniverseProvider";

/** Glowing digital core: solid emissive centre + wireframe shell. */
function Core({ still }: { still: boolean }) {
  const shell = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const { hoveredPortal } = useUniverse();
  const target = useMemo(() => new THREE.Color("#38bdf8"), []);

  useFrame((s, dt) => {
    const hovered = portals.find((p) => p.id === hoveredPortal);
    target.set(hovered?.color ?? "#38bdf8");
    mat.current?.emissive.lerp(target, 0.08);
    if (still) return;
    if (shell.current) {
      shell.current.rotation.y += dt * 0.25;
      shell.current.rotation.x += dt * 0.1;
    }
    if (inner.current) {
      const k = 1 + Math.sin(s.clock.elapsedTime * 1.6) * 0.03;
      inner.current.scale.setScalar(k);
    }
  });

  return (
    <group>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.9, 3]} />
        <meshStandardMaterial ref={mat} color="#0b1b3a" emissive="#38bdf8" emissiveIntensity={1.4} roughness={0.25} metalness={0.6} />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial color="#7dd3fc" wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function Rings({ still }: { still: boolean }) {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (still) return;
    if (a.current) a.current.rotation.z += dt * 0.15;
    if (b.current) b.current.rotation.z -= dt * 0.1;
  });
  return (
    <group rotation={[Math.PI / 2.4, 0, 0]}>
      <mesh ref={a}>
        <torusGeometry args={[2.1, 0.008, 8, 160]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} />
      </mesh>
      <mesh ref={b}>
        <torusGeometry args={[3.4, 0.006, 8, 200]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

function Particles({ count, still }: { count: number; still: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);
  useFrame((_, dt) => {
    if (!still && ref.current) ref.current.rotation.y += dt * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#93c5fd" transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/** Five clickable portals orbiting the core. */
function PortalNodes({ still }: { still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const router = useRouter();
  const { hoveredPortal, setHoveredPortal } = useUniverse();
  const radius = 3.4;

  useFrame((_, dt) => {
    if (!still && group.current && !hoveredPortal) group.current.rotation.y += dt * 0.12;
  });

  return (
    <group ref={group}>
      {portals.map((p, i) => {
        const angle = (i / portals.length) * Math.PI * 2;
        const pos: [number, number, number] = [Math.cos(angle) * radius, Math.sin(i * 1.7) * 0.5, Math.sin(angle) * radius];
        const active = hoveredPortal === p.id;
        return (
          <group key={p.id} position={pos}>
            <mesh
              scale={active ? 1.5 : 1}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredPortal(p.id);
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                setHoveredPortal(null);
                document.body.style.cursor = "";
              }}
              onClick={() => router.push(p.href)}
            >
              <octahedronGeometry args={[0.22, 0]} />
              <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={active ? 2.4 : 1.2} />
            </mesh>
            <Html center distanceFactor={9} position={[0, 0.5, 0]} zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
              <span
                aria-hidden
                className="whitespace-nowrap rounded-full border px-3 py-1 text-xs backdrop-blur-md transition-all"
                style={{
                  borderColor: active ? p.color : "rgb(148 197 255 / 0.25)",
                  background: "rgb(3 6 15 / 0.55)",
                  color: active ? "#fff" : "#dbe6ff",
                }}
              >
                {p.label}
              </span>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

/** Camera drifts gently toward the pointer; pulls back on narrow screens. */
function CameraRig({ still }: { still: boolean }) {
  const { camera, pointer, size } = useThree();
  const baseZ = size.width < 640 ? 11.5 : size.width < 1024 ? 9.5 : 8;
  useFrame(() => {
    const tx = still ? 0 : pointer.x * 0.9;
    const ty = still ? 0.6 : 0.6 + pointer.y * 0.5;
    camera.position.x += (tx - camera.position.x) * 0.04;
    camera.position.y += (ty - camera.position.y) * 0.04;
    camera.position.z += (baseZ - camera.position.z) * 0.06;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function CoreScene() {
  const { reducedMotion } = useUniverse();
  const count = typeof window !== "undefined" && window.innerWidth < 640 ? 350 : 900;
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.6, 8], fov: 45 }}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      aria-hidden
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={30} color="#38bdf8" distance={12} />
      <pointLight position={[6, 4, 4]} intensity={40} color="#8b5cf6" distance={20} />
      <pointLight position={[-6, -3, 2]} intensity={25} color="#22d3ee" distance={20} />
      <Core still={reducedMotion} />
      <Rings still={reducedMotion} />
      <PortalNodes still={reducedMotion} />
      <Particles count={count} still={reducedMotion} />
      <CameraRig still={reducedMotion} />
    </Canvas>
  );
}
