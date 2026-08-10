"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  const particleCount = 55;
  const maxLines = (particleCount * (particleCount - 1)) / 2;

  const { positions, velocities, linePositionsArray } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const lineArr = new Float32Array(maxLines * 6);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;

      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    return { positions: pos, velocities: vel, linePositionsArray: lineArr };
  }, [maxLines]);

  const glowPositions = useMemo(() => {
    return positions.slice(0, Math.floor(particleCount / 4) * 3);
  }, [positions]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const geom = meshRef.current.geometry;
    const posAttr = geom.getAttribute("position");
    if (!posAttr) return;
    const posArray = posAttr.array as Float32Array;

    // Animate particles
    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      for (let j = 0; j < 3; j++) {
        const bounds = j === 1 ? 4 : j === 0 ? 5 : 3;
        if (Math.abs(posArray[i * 3 + j]) > bounds) {
          velocities[i * 3 + j] *= -1;
        }
      }
    }

    posAttr.needsUpdate = true;

    // Build line connections using pre-allocated array (avoid GC)
    let lineIdx = 0;
    const connectionDistSq = 4.0; // 2.0 squared

    for (let i = 0; i < particleCount; i++) {
      const px = posArray[i * 3];
      const py = posArray[i * 3 + 1];
      const pz = posArray[i * 3 + 2];

      for (let j = i + 1; j < particleCount; j++) {
        const dx = px - posArray[j * 3];
        const dy = py - posArray[j * 3 + 1];
        const dz = pz - posArray[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < connectionDistSq) {
          linePositionsArray[lineIdx++] = px;
          linePositionsArray[lineIdx++] = py;
          linePositionsArray[lineIdx++] = pz;
          linePositionsArray[lineIdx++] = posArray[j * 3];
          linePositionsArray[lineIdx++] = posArray[j * 3 + 1];
          linePositionsArray[lineIdx++] = posArray[j * 3 + 2];
        }
      }
    }

    if (lineRef.current) {
      const lineGeom = lineRef.current.geometry;
      const lineAttr = lineGeom.getAttribute("position") as THREE.BufferAttribute;
      if (lineAttr) {
        lineAttr.needsUpdate = true;
        lineGeom.setDrawRange(0, lineIdx / 3);
      }
    }

    // Slow rotation
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    if (lineRef.current) {
      lineRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <group>
      {/* Nodes */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#60A5FA"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Connections with pre-allocated buffer */}
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositionsArray, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Glow nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[glowPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#8B5CF6"
          transparent
          opacity={0.4}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function NeuralNetwork() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={1}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <Particles />
      </Canvas>
    </div>
  );
}
