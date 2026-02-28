"use client";

import Image from "next/image";
import React, { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useMousePosition } from "@/lib/useMousePosition";
import { useMobile } from "@/lib/useMobile";
import { PROFILE_ICON } from "@/public";
import dynamic from "next/dynamic";

// Dynamic import of Three.js canvas — avoids SSR issues
const ParticleField = dynamic(
  () => import("@/components/three/ParticleField"),
  { ssr: false }
);

/**
 * Rotating role titles for the hero section.
 * Cycles through roles with AnimatePresence crossfade.
 */
const ROLES = [
  "Software Developer",
  "React Specialist",
  "Next.js Engineer",
  "Salesforce Developer",
  "UI/UX Craftsman",
];

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const mouse = useMousePosition();
  const isMobile = useMobile();
  const [roleIndex, setRoleIndex] = useState(0);

  // Rotate role titles every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center mb-28 sm:mb-0 scroll-mt-[100rem] overflow-hidden"
    >
      {/* Three.js particle background — hidden on mobile for performance */}
      {!isMobile && (
        <Suspense
          fallback={
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent" />
          }
        >
          <ParticleField />
        </Suspense>
      )}

      {/* Mobile fallback gradient */}
      {isMobile && (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent" />
      )}

      {/* Content layer */}
      <div className="relative z-10 max-w-[52rem] text-center px-4">
        {/* Profile image with parallax */}
        <div className="flex items-center justify-center">
          <motion.div
            className="relative"
            style={{
              x: isMobile ? 0 : mouse.x * 8,
              y: isMobile ? 0 : mouse.y * 8,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.1, duration: 0.8 }}
            >
              {/* Glow ring behind avatar */}
              <div className="absolute inset-0 rounded-full bg-accent-gradient blur-xl opacity-40 animate-pulse-glow scale-110" />
              <Image
                src={PROFILE_ICON}
                alt="Amit portrait"
                width={192}
                height={192}
                quality={95}
                priority
                className="relative h-28 w-28 rounded-full object-cover border-[0.3rem] border-white/60 shadow-glow-lg dark:border-white/20"
              />
            </motion.div>

            <motion.span
              className="absolute -bottom-1 -right-1 text-4xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 125, delay: 0.4 }}
            >
              👋
            </motion.span>
          </motion.div>
        </div>

        {/* Hero heading with text reveal */}
        <motion.h1
          className="mb-6 mt-8 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.span
            className="font-bold block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Hello, I&apos;m{" "}
            <span className="gradient-text">Amit.</span>
          </motion.span>

          {/* Rotating role title */}
          <span className="block mt-2">
            I&apos;m a{" "}
            <span className="relative inline-block min-w-[14rem] sm:min-w-[18rem]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  className="font-bold gradient-text"
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                  transition={{ duration: 0.5 }}
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="mb-10 text-base sm:text-lg text-gray-600 dark:text-white/60 max-w-[38rem] mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          With nearly <span className="font-semibold text-gray-900 dark:text-white/90">4+ years</span> of
          experience crafting immersive web applications and scalable CRM solutions
          using <span className="font-semibold">React</span>,{" "}
          <span className="font-semibold">Next.js</span>, and{" "}
          <span className="font-semibold">Salesforce LWC</span>.
        </motion.p>

        {/* CTAs with glassmorphism */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 text-lg font-medium"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {/* Primary CTA */}
          <Link
            href="#contact"
            className="group relative bg-accent-gradient text-white px-8 py-3.5 flex items-center gap-2 rounded-full outline-none focus:scale-105 hover:scale-105 active:scale-100 transition-all shadow-glow hover:shadow-glow-lg"
            onClick={() => {
              setActiveSection("Contact");
              setTimeOfLastClick(Date.now());
            }}
          >
            Contact me here{" "}
            <BsArrowRight className="opacity-80 group-hover:translate-x-1.5 transition-transform" />
          </Link>

          {/* Download CV */}
          <a
            className="group glass px-8 py-3.5 flex items-center gap-2 rounded-full outline-none focus:scale-105 hover:scale-105 active:scale-100 transition-all cursor-pointer text-gray-700 dark:text-white/80"
            href="/AmitJha.pdf"
            download
          >
            Download CV{" "}
            <HiDownload className="opacity-60 group-hover:translate-y-0.5 transition-transform" />
          </a>

          {/* Social links */}
          <div className="flex gap-3">
            <a
              className="glass p-4 text-gray-700 hover:text-accent-1 flex items-center rounded-full focus:scale-110 hover:scale-110 active:scale-105 transition-all cursor-pointer dark:text-white/60 dark:hover:text-accent-3"
              href="https://www.linkedin.com/in/amit-kumar-jha-00405a185/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsLinkedin />
            </a>
            <a
              className="glass p-4 text-gray-700 hover:text-accent-1 flex items-center text-[1.35rem] rounded-full focus:scale-110 hover:scale-110 active:scale-105 transition-all cursor-pointer dark:text-white/60 dark:hover:text-accent-3"
              href="https://github.com/amit-kumar-jha"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithubSquare />
            </a>
          </div>
        </motion.div>


      </div>
    </section>
  );
}
