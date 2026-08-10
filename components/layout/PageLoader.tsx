"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ROLES = [
  "Full Stack Engineer",
  "AI Application Developer",
  "System Architect",
];

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    // Skip if already visited this session
    if (sessionStorage.getItem("portfolio-loaded")) {
      setIsLoading(false);
      return;
    }

    // Cycle through roles
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => Math.min(prev + 1, ROLES.length - 1));
    }, 600);

    // End loading
    const endTimer = setTimeout(() => {
      clearInterval(roleTimer);
      sessionStorage.setItem("portfolio-loaded", "true");
      setIsLoading(false);
    }, 2400);

    return () => {
      clearInterval(roleTimer);
      clearTimeout(endTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ background: "#050505" }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] },
          }}
        >
          {/* Name */}
          <motion.div className="flex overflow-hidden mb-4">
            {"AMIT JHA".split("").map((char, i) => (
              <motion.span
                key={i}
                className="text-4xl sm:text-6xl font-heading font-bold tracking-wider"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>

          {/* Role */}
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              className="text-sm sm:text-base font-mono tracking-widest uppercase"
              style={{ color: "var(--text-muted)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {ROLES[roleIndex]}
            </motion.span>
          </AnimatePresence>

          {/* Progress bar */}
          <motion.div
            className="mt-10 h-[2px] rounded-full overflow-hidden"
            style={{
              width: "120px",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
