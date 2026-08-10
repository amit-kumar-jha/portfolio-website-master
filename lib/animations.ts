/* ═══════════════════════════════════════════════════════════
   ANIMATIONS — Shared Framer Motion variants & transitions
   ═══════════════════════════════════════════════════════════ */

import { type Variants } from "framer-motion";

// ─── Transition Presets ────────────────────────────────────
export const springSmooth = {
  type: "spring" as const,
  damping: 25,
  stiffness: 120,
};

export const springBounce = {
  type: "spring" as const,
  damping: 15,
  stiffness: 150,
};

export const easeOut = {
  duration: 0.8,
  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
};

export const easeOutSlow = {
  duration: 1.2,
  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
};

// ─── Fade Variants ─────────────────────────────────────────
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeOut,
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeOut,
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: easeOut,
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: easeOut,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

// ─── Scale Variants ────────────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springSmooth,
  },
};

// ─── Stagger Containers ───────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// ─── Stagger Items ────────────────────────────────────────
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...springSmooth,
      duration: 0.6,
    },
  },
};

export const staggerItemScale: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springSmooth,
  },
};

// ─── Text Reveal (word-by-word) ───────────────────────────
export const textRevealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const textRevealWord: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ─── Line Reveal ──────────────────────────────────────────
export const lineReveal: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ─── Mask Reveal (clip-path) ──────────────────────────────
export const maskRevealUp: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const maskRevealLeft: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ─── Card Hover Effects ───────────────────────────────────
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// ─── Viewport Settings ───────────────────────────────────
export const viewportOnce = { once: true, amount: 0.2 as const };
export const viewportHalf = { once: true, amount: 0.5 as const };
export const viewportQuarter = { once: true, amount: 0.1 as const };
