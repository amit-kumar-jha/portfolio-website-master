"use client";

import React, { Suspense, useRef } from "react";
import SectionHeading from "./section-heading";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useMobile } from "@/lib/useMobile";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const FloatingGrid = dynamic(
  () => import("@/components/three/FloatingGrid"),
  { ssr: false }
);

/**
 * Experience — Premium animated timeline.
 * Clean alternating layout with scroll-driven gradient line.
 */

const cardVariants = {
  hidden: (isLeft: boolean) => ({
    opacity: 0,
    x: isLeft ? -60 : 60,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 90,
      duration: 0.7,
    },
  },
};

export default function Experience() {
  const { ref } = useSectionInView("Experience");
  const isMobile = useMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 50%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative scroll-mt-28 mb-28 sm:mb-40 max-w-[54rem] mx-auto"
    >
      {/* Three.js Network Background — desktop only */}
      {!isMobile && (
        <Suspense fallback={null}>
          <div className="absolute inset-0 -inset-x-20 -inset-y-10 opacity-40 pointer-events-none">
            <FloatingGrid />
          </div>
        </Suspense>
      )}

      <div className="relative z-10">
        <SectionHeading>My experience</SectionHeading>

        <div ref={containerRef} className="relative mt-10">
          {/* Animated timeline line */}
          <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] rounded-full bg-gray-200/50 dark:bg-white/[0.06]">
            <motion.div
              className="absolute top-0 left-0 w-full rounded-full"
              style={{
                height: lineHeight,
                background:
                  "linear-gradient(to bottom, #6366f1, #8b5cf6, #c084fc)",
                boxShadow: "0 0 16px rgba(99,102,241,0.35)",
              }}
            />
          </div>

          {/* Entries */}
          <div className="flex flex-col gap-12">
            {experiencesData.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex items-start ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-1/2 z-20 top-8"
                    style={{ x: "-50%" }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div className="w-4 h-4 rounded-full bg-accent-gradient shadow-glow ring-4 ring-white/80 dark:ring-[#0a0a1a]/80" />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    className={`ml-14 sm:ml-0 sm:w-[47%] ${isLeft ? "sm:pr-10" : "sm:pl-10"
                      }`}
                    variants={cardVariants}
                    custom={isLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="group glass rounded-2xl p-6 glow-border transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5">
                      {/* Date pill */}
                      <div className="mb-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-accent-gradient text-white">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {item.date}
                        </span>
                      </div>

                      {/* Title row */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="shrink-0 w-10 h-10 rounded-xl bg-accent-gradient flex items-center justify-center text-white text-lg shadow-glow group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-lg leading-snug text-gray-900 dark:text-white/95">
                            {item.title}
                          </h3>
                          <p className="text-sm text-accent-2 dark:text-accent-3 font-medium">
                            {item.location}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm leading-relaxed text-gray-600 dark:text-white/60">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Timeline end cap */}
          <motion.div
            className="absolute -bottom-2 left-6 sm:left-1/2 -translate-x-1/2 z-20"
            style={{ x: "-50%" }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-6 h-6 rounded-full glass glow-border flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-accent-gradient animate-pulse-glow" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
