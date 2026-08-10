"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/data";
import { useScrollDirection, useScrollProgress, useActiveSection } from "@/lib/hooks";

export default function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { direction, scrollY } = useScrollDirection();
  const progress = useScrollProgress();
  const activeSection = useActiveSection(
    navLinks.map((l) => l.href.replace("#", ""))
  );

  useEffect(() => setMounted(true), []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  if (!mounted) return null;

  const isHidden = direction === "down" && scrollY > 200 && !mobileOpen;

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

      {/* ── Desktop Navigation ── */}
      <motion.header
        className="fixed top-6 left-1/2 z-50 hidden md:block"
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

      {/* ── Mobile Hamburger Button ── */}
      <motion.button
        className="fixed top-5 right-5 z-[60] flex md:hidden items-center justify-center w-11 h-11 rounded-xl glass-strong"
        initial={{ y: -100 }}
        animate={{ y: isHidden && !mobileOpen ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
      >
        <div className="relative w-5 h-4 flex flex-col justify-between">
          <motion.span
            className="block w-full h-[2px] rounded-full bg-white origin-left"
            animate={
              mobileOpen
                ? { rotate: 45, y: 0, x: 1 }
                : { rotate: 0, y: 0, x: 0 }
            }
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-full h-[2px] rounded-full bg-white"
            animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-full h-[2px] rounded-full bg-white origin-left"
            animate={
              mobileOpen
                ? { rotate: -45, y: 0, x: 1 }
                : { rotate: 0, y: 0, x: 0 }
            }
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.button>

      {/* ── Mobile Fullscreen Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "rgba(5, 5, 15, 0.95)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <nav className="flex flex-col items-center gap-2">
              {navLinks.map((link, i) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={closeMobile}
                    className="relative px-8 py-3 text-lg font-medium rounded-xl transition-colors duration-300"
                    style={{
                      color: isActive
                        ? "var(--text-primary)"
                        : "var(--text-muted)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill-mobile"
                        className="absolute inset-0 rounded-xl"
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
                  </motion.a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
