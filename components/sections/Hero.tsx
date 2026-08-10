"use client";

import { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { heroData, personalInfo } from "@/lib/data";
import { useMobile } from "@/lib/hooks";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { HiArrowDown, HiArrowRight } from "react-icons/hi2";
import { HiDownload } from "react-icons/hi";

const NeuralNetwork = dynamic(
  () => import("@/components/three/NeuralNetwork"),
  { ssr: false }
);

export default function Hero() {
  const isMobile = useMobile();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % heroData.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      {!isMobile && (
        <Suspense
          fallback={
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-purple/5" />
          }
        >
          <NeuralNetwork />
        </Suspense>
      )}

      {/* Mobile fallback gradient */}
      {isMobile && (
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/8 via-transparent to-accent-purple/8" />
      )}

      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent 70%)",
            animation: "ambient-drift 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent 70%)",
            animation: "ambient-drift 25s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Role badge */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle bg-white/[0.02]">
            <span className="w-2 h-2 rounded-full bg-green-500 availability-pulse" />
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                className="text-sm font-mono text-text-secondary"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {heroData.roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <div className="mb-8">
          {heroData.headline.map((line, lineIndex) => (
            <motion.div
              key={lineIndex}
              className="overflow-hidden"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5 + lineIndex * 0.15,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <h1
                className={`font-heading font-bold tracking-tight ${
                  lineIndex === 0
                    ? "text-4xl sm:text-6xl lg:text-display"
                    : "text-3xl sm:text-5xl lg:text-display-sm"
                } ${
                  lineIndex > 0 ? "gradient-text" : "text-text-primary"
                }`}
              >
                {line}
              </h1>
            </motion.div>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          className="max-w-2xl mx-auto text-body-lg text-text-secondary mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {heroData.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <a href="#projects" className="btn-primary">
            View Projects
            <HiArrowRight className="text-lg" />
          </a>

          <a href={personalInfo.resumeUrl} download className="btn-ghost">
            Download Resume
            <HiDownload className="text-lg opacity-60" />
          </a>

          <div className="flex items-center gap-3 ml-2">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label="LinkedIn"
            >
              <BsLinkedin />
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label="GitHub"
            >
              <BsGithub />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono text-text-muted tracking-widest uppercase">
            Scroll
          </span>
          <HiArrowDown className="text-text-muted text-lg" />
        </motion.div>
      </motion.div>
    </section>
  );
}
