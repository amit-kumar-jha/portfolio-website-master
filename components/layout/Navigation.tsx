"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/data";
import { useScrollDirection, useScrollProgress, useActiveSection } from "@/lib/hooks";

export default function Navigation() {
  const [mounted, setMounted] = useState(false);
  const { direction, scrollY } = useScrollDirection();
  const progress = useScrollProgress();
  const activeSection = useActiveSection(
    navLinks.map((l) => l.href.replace("#", ""))
  );

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isHidden = direction === "down" && scrollY > 200;

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-[2px]"
        style={{
          scaleX: progress,
          transformOrigin: "left",
          background: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
        }}
      />

      {/* Navigation */}
      <motion.header
        className="fixed top-6 left-1/2 z-50"
        initial={{ y: -100, x: "-50%" }}
        animate={{
          y: isHidden ? -100 : 0,
          x: "-50%",
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav className="flex items-center gap-1 px-2 py-2 rounded-full glass-strong">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-300"
                style={{
                  color: isActive
                    ? "var(--text-primary)"
                    : "var(--text-muted)",
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "rgba(59, 130, 246, 0.1)",
                      border: "1px solid rgba(59, 130, 246, 0.2)",
                    }}
                    transition={{
                      type: "spring",
                      damping: 25,
                      stiffness: 200,
                    }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>
      </motion.header>
    </>
  );
}
