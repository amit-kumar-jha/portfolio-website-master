import React from "react";

/**
 * Footer — Premium footer with gradient separator and subtle styling.
 */
export default function Footer() {
  return (
    <footer className="mb-10 px-4 text-center text-gray-500 dark:text-white/40">
      {/* Gradient separator line */}
      <div className="w-24 h-[2px] bg-accent-gradient mx-auto mb-6 rounded-full opacity-50" />

      <small className="mb-2 block text-xs">
        &copy; 2026 Amit. All rights reserved.
      </small>
      <p className="text-xs leading-relaxed">
        <span className="font-semibold">About this website:</span> built with
        React & Next.js (App Router & Server Actions), TypeScript, Tailwind CSS,
        Framer Motion, Three.js, React Email & Resend.
      </p>
    </footer>
  );
}
