"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * SectionDivider — Gradient line with glow effect, replacing plain gray bar.
 */
export default function SectionDivider() {
  return (
    <motion.div
      className="my-24 hidden sm:flex justify-center"
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ delay: 0.125, duration: 0.5 }}
    >
      <div className="h-16 w-[2px] bg-accent-gradient rounded-full shadow-glow opacity-60" />
    </motion.div>
  );
}
