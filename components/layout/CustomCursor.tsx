"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for pointer precision
    const hasPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasPointer) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      // Smooth lerp for outer ring only
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`;
      }

      rafId = requestAnimationFrame(loop);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea")) {
        isHovering = true;
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea")) {
        isHovering = false;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Outer subtle glow ring — doesn't block native cursor */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9997] w-8 h-8 rounded-full border border-blue-500/30 pointer-events-none transition-transform duration-200 ease-out"
        style={{ willChange: "transform" }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9998] w-2 h-2 rounded-full bg-blue-500/80 pointer-events-none"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
