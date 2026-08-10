"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experienceData } from "@/lib/data";
import SectionLabel from "@/components/ui/SectionLabel";
import TextReveal from "@/components/ui/TextReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/lib/animations";

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = experienceData[activeIndex];

  return (
    <section id="experience" className="relative py-section-lg">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <SectionLabel>Experience</SectionLabel>

        <TextReveal
          text="Where I've Built & Shipped"
          as="h2"
          className="font-heading font-bold text-heading-xl sm:text-display-sm text-text-primary mb-16"
        />

        {/* Company tabs */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Company selector */}
          <motion.div
            className="lg:w-64 shrink-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
              {experienceData.map((exp, i) => (
                <motion.button
                  key={exp.id}
                  onClick={() => setActiveIndex(i)}
                  className={`relative text-left px-5 py-4 rounded-xl transition-all duration-300 whitespace-nowrap lg:whitespace-normal ${
                    i === activeIndex
                      ? "bg-accent-blue/10 border border-accent-blue/20"
                      : "border border-transparent hover:bg-white/[0.02] hover:border-border-subtle"
                  }`}
                  variants={staggerItem}
                >
                  {i === activeIndex && (
                    <motion.div
                      layoutId="exp-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 rounded-full bg-accent-gradient hidden lg:block"
                      transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    />
                  )}
                  <p
                    className={`text-sm font-semibold ${
                      i === activeIndex ? "text-text-primary" : "text-text-secondary"
                    }`}
                  >
                    {exp.company}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5">{exp.period}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right: Experience details */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-heading font-bold text-heading-sm text-text-primary">
                      {active.role}
                    </h3>
                    <span className="pill-accent text-xs">{active.type}</span>
                  </div>
                  <p className="text-text-secondary">
                    {active.company} · {active.location}
                  </p>
                </div>

                {/* Description */}
                <p className="text-body text-text-secondary mb-8 leading-relaxed">
                  {active.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                  {active.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="glass-card rounded-xl p-4 text-center"
                    >
                      <div className="text-2xl font-heading font-bold gradient-text">
                        <AnimatedCounter
                          end={parseInt(metric.value)}
                          suffix={metric.value.replace(/\d/g, "")}
                        />
                      </div>
                      <p className="text-xs text-text-muted mt-1">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Achievements */}
                <div className="space-y-4 mb-10">
                  <h4 className="text-sm font-mono text-text-muted tracking-widest uppercase">
                    Key Achievements
                  </h4>
                  {active.achievements.map((achievement, i) => (
                    <motion.div
                      key={i}
                      className="flex gap-4 text-sm text-text-secondary leading-relaxed"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="shrink-0 w-5 h-5 rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                      </span>
                      <span>{achievement}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Tech stack */}
                <div>
                  <h4 className="text-sm font-mono text-text-muted tracking-widest uppercase mb-4">
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {active.techStack.map((tech) => (
                      <span key={tech} className="pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
