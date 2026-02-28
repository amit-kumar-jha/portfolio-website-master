"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * SectionHeading — Premium gradient text heading with scroll reveal.
 * Animated entrance: fade up + blur clear.
 */
type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <motion.h2
      className="text-3xl sm:text-4xl font-bold capitalize mb-10 text-center gradient-text"
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.h2>
  );
}
