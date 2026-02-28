"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * FloatingGrid — Animated grid of connected nodes that gently floats.
 * Creates a neural-network / constellation aesthetic.
 * Used as ambient background for the Experience / Skills sections.
 */

const NODE_COUNT = 60;
const CONNECTION_DISTANCE = 2.5;

function NetworkNodes() {
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);

    const { positions, velocities } = useMemo(() => {
        const pos = new Float32Array(NODE_COUNT * 3);
        const vel = new Float32Array(NODE_COUNT * 3);
        for (let i = 0; i < NODE_COUNT; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 16;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
            vel[i * 3] = (Math.random() - 0.5) * 0.005;
            vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
            vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
        }
        return { positions: pos, velocities: vel };
    }, []);

    // Line geometry buffer — preallocate max possible connections
    const maxLines = (NODE_COUNT * (NODE_COUNT - 1)) / 2;
    const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
    const lineGeometry = useMemo(() => {
        const geom = new THREE.BufferGeometry();
        geom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
        geom.setDrawRange(0, 0);
        return geom;
    }, [linePositions]);

    useFrame(() => {
        if (!pointsRef.current) return;
        const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array;

        // Move nodes
        for (let i = 0; i < NODE_COUNT; i++) {
            posArr[i * 3] += velocities[i * 3];
            posArr[i * 3 + 1] += velocities[i * 3 + 1];
            posArr[i * 3 + 2] += velocities[i * 3 + 2];
            // Bounce at boundaries
            if (Math.abs(posArr[i * 3]) > 8) velocities[i * 3] *= -1;
            if (Math.abs(posArr[i * 3 + 1]) > 5) velocities[i * 3 + 1] *= -1;
            if (Math.abs(posArr[i * 3 + 2]) > 3) velocities[i * 3 + 2] *= -1;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Update connections
        let lineIdx = 0;
        for (let i = 0; i < NODE_COUNT; i++) {
            for (let j = i + 1; j < NODE_COUNT; j++) {
                const dx = posArr[i * 3] - posArr[j * 3];
                const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
                const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (dist < CONNECTION_DISTANCE) {
                    linePositions[lineIdx * 6] = posArr[i * 3];
                    linePositions[lineIdx * 6 + 1] = posArr[i * 3 + 1];
                    linePositions[lineIdx * 6 + 2] = posArr[i * 3 + 2];
                    linePositions[lineIdx * 6 + 3] = posArr[j * 3];
                    linePositions[lineIdx * 6 + 4] = posArr[j * 3 + 1];
                    linePositions[lineIdx * 6 + 5] = posArr[j * 3 + 2];
                    lineIdx++;
                }
            }
        }
        if (linesRef.current) {
            linesRef.current.geometry.attributes.position.needsUpdate = true;
            linesRef.current.geometry.setDrawRange(0, lineIdx * 2);
        }
    });

    return (
        <>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={NODE_COUNT}
                        array={positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    transparent
                    color="#8b5cf6"
                    size={0.06}
                    sizeAttenuation
                    depthWrite={false}
                    opacity={0.7}
                    blending={THREE.AdditiveBlending}
                />
            </points>
            <lineSegments ref={linesRef} geometry={lineGeometry}>
                <lineBasicMaterial
                    transparent
                    color="#6366f1"
                    opacity={0.15}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </lineSegments>
        </>
    );
}

const Scene = React.memo(function Scene() {
    return (
        <>
            <NetworkNodes />
            <ambientLight intensity={0.3} />
        </>
    );
});

interface FloatingGridProps {
    className?: string;
}

export default function FloatingGrid({ className = "" }: FloatingGridProps) {
    return (
        <div className={`absolute inset-0 ${className}`} style={{ zIndex: 0 }}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
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
