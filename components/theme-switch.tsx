"use client";

import { useTheme } from "@/context/theme-context";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";

/**
 * ThemeSwitch — Glassmorphism floating toggle with smooth transition.
 */
export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="fixed bottom-5 right-5 glass w-[3rem] h-[3rem] rounded-full flex items-center justify-center hover:scale-110 active:scale-100 transition-all duration-300 hover:shadow-glow text-gray-700 dark:text-white/60"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "light" ? <BsSun /> : <BsMoon />}
    </button>
  );
}
