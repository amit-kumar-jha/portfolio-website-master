"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

/**
 * About — Glassmorphism card with highlight stats and scroll-triggered reveal.
 * Replaces plain text with a visually rich two-part layout.
 */

const highlights = [
  { label: "Years Experience", value: "4+" },
  { label: "Technologies", value: "20+" },
  { label: "Projects Delivered", value: "30+" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 100 },
  },
};

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[50rem] scroll-mt-28 sm:mb-40"
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.15 }}
    >
      <SectionHeading>About me</SectionHeading>

      {/* Highlight stats row */}
      <motion.div
        className="grid grid-cols-3 gap-4 mb-8"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {highlights.map((item) => (
          <motion.div
            key={item.label}
            className="glass rounded-2xl p-5 text-center glow-border"
            variants={cardVariants}
          >
            <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
              {item.value}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-white/50 font-medium">
              {item.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main about card */}
      <motion.div
        className="glass rounded-2xl p-8 sm:p-10 glow-border leading-7 text-gray-700 dark:text-white/75"
        variants={cardVariants}
      >
        <p className="mb-4">
          As a <span className="font-semibold text-gray-900 dark:text-white/90">Software Developer</span>,
          I am driven by a deep passion for creating immersive, scalable, and intuitive digital
          experiences across modern web applications and CRM platforms. With nearly 4 years of
          hands-on experience, I have built visually compelling and highly functional solutions
          using modern frontend technologies along with the Salesforce platform.
        </p>
        <p className="mb-4">
          I work extensively with{" "}
          <span className="font-semibold text-gray-900 dark:text-white/90">React.js</span> and{" "}
          <span className="font-semibold text-gray-900 dark:text-white/90">Next.js</span> to build
          high-performance web applications that emphasize clean code, reusable components,
          responsive design, and smooth user experiences. Alongside this, I develop scalable CRM
          solutions using{" "}
          <span className="font-semibold text-gray-900 dark:text-white/90">Lightning Web Components (LWC)</span>,
          Apex, and Salesforce platform features.
        </p>
        <p>
          I thrive in collaborative environments where attention to detail, problem-solving,
          and continuous improvement are valued. Beyond coding, I enjoy exploring modern UI/UX
          patterns, learning platform-specific best practices, and building solutions that
          deliver real business impact.
        </p>
      </motion.div>
    </motion.section>
  );
}
