"use client";

import React, { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * ParticleField — Interactive floating particle system.
 * Responds to mouse movement with subtle parallax.
 * Uses instanced points for performance.
 */

const PARTICLE_COUNT = 800;

function Particles() {
    const ref = useRef<THREE.Points>(null);
    const { mouse, viewport } = useThree();

    // Generate random particle positions once
    const positions = useMemo(() => {
        const pos = new Float32Array(PARTICLE_COUNT * 3);
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;         // x
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;     // y
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;     // z
        }
        return pos;
    }, []);

    // Generate random sizes for variation
    const sizes = useMemo(() => {
        const s = new Float32Array(PARTICLE_COUNT);
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            s[i] = Math.random() * 0.5 + 0.1;
        }
        return s;
    }, []);

    useFrame((state, delta) => {
        if (!ref.current) return;
        // Slow rotation
        ref.current.rotation.y += delta * 0.02;
        ref.current.rotation.x += delta * 0.01;
        // Mouse parallax — subtle shift
        ref.current.position.x = THREE.MathUtils.lerp(
            ref.current.position.x,
            (mouse.x * viewport.width) / 12,
            0.02
        );
        ref.current.position.y = THREE.MathUtils.lerp(
            ref.current.position.y,
            (mouse.y * viewport.height) / 12,
            0.02
        );
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={PARTICLE_COUNT}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <PointMaterial
                transparent
                color="#8b5cf6"
                size={0.05}
                sizeAttenuation
                depthWrite={false}
                opacity={0.6}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Floating geometric shapes for tech visual
function FloatingShapes() {
    const groupRef = useRef<THREE.Group>(null);
    const { mouse } = useThree();

    const shapes = useMemo(() => {
        return Array.from({ length: 6 }, (_, i) => ({
            position: [
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 4 - 2,
            ] as [number, number, number],
            rotation: Math.random() * Math.PI,
            scale: Math.random() * 0.4 + 0.15,
            speed: Math.random() * 0.3 + 0.1,
            type: i % 3,
        }));
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.children.forEach((child, i) => {
            const mesh = child as THREE.Mesh;
            mesh.rotation.x += shapes[i].speed * 0.01;
            mesh.rotation.y += shapes[i].speed * 0.015;
            // Gentle float
            mesh.position.y += Math.sin(state.clock.elapsedTime * shapes[i].speed + i) * 0.002;
        });
        // Mouse parallax on group
        groupRef.current.position.x = THREE.MathUtils.lerp(
            groupRef.current.position.x,
            mouse.x * 0.5,
            0.02
        );
        groupRef.current.position.y = THREE.MathUtils.lerp(
            groupRef.current.position.y,
            mouse.y * 0.3,
            0.02
        );
    });

    return (
        <group ref={groupRef}>
            {shapes.map((shape, i) => (
                <mesh
                    key={i}
                    position={shape.position}
                    rotation={[shape.rotation, shape.rotation, 0]}
                    scale={shape.scale}
                >
                    {shape.type === 0 && <octahedronGeometry args={[1, 0]} />}
                    {shape.type === 1 && <icosahedronGeometry args={[1, 0]} />}
                    {shape.type === 2 && <tetrahedronGeometry args={[1, 0]} />}
                    <meshBasicMaterial
                        color="#6366f1"
                        wireframe
                        transparent
                        opacity={0.2}
                    />
                </mesh>
            ))}
        </group>
    );
}

// Memoized scene to prevent unnecessary re-renders
const Scene = React.memo(function Scene() {
    return (
        <>
            <Particles />
            <FloatingShapes />
            <ambientLight intensity={0.5} />
        </>
    );
});

interface ParticleFieldProps {
    className?: string;
}

export default function ParticleField({ className = "" }: ParticleFieldProps) {
    return (
        <div className={`absolute inset-0 ${className}`} style={{ zIndex: 0 }}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
                style={{ background: "transparent" }}
            >
                <React.Suspense fallback={null}>
                    <Scene />
                </React.Suspense>
            </Canvas>
        </div>
    );
}
