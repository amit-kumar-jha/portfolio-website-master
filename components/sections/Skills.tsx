"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillsData, type SkillCategory } from "@/lib/data";
import SectionLabel from "@/components/ui/SectionLabel";
import TextReveal from "@/components/ui/TextReveal";
import {
  staggerContainer,
  staggerItemScale,
  viewportOnce,
} from "@/lib/animations";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="relative py-section-lg">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <SectionLabel>Skills</SectionLabel>

        <TextReveal
          text="Technology Arsenal"
          as="h2"
          className="font-heading font-bold text-heading-xl sm:text-display-sm text-text-primary mb-16"
        />

        {/* Category constellation — interactive clusters */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {skillsData.map((category) => {
            const isActive = activeCategory === category.name;

            return (
              <motion.div
                key={category.name}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                  isActive
                    ? "sm:col-span-2 lg:col-span-2 row-span-2"
                    : ""
                }`}
                variants={staggerItemScale}
                onClick={() =>
                  setActiveCategory(isActive ? null : category.name)
                }
                layout
                transition={{ layout: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }}
              >
                <div
                  className="glass-card rounded-2xl p-6 h-full glow-border"
                  style={{
                    borderColor: isActive
                      ? `${category.color}30`
                      : undefined,
                  }}
                >
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: category.color,
                        boxShadow: `0 0 12px ${category.color}50`,
                      }}
                    />
                    <h3 className="font-heading font-semibold text-text-primary">
                      {category.name}
                    </h3>
                    <span className="ml-auto text-xs text-text-muted font-mono">
                      {category.skills.length}
                    </span>
                  </div>

                  {/* Skills */}
                  <AnimatePresence>
                    <motion.div
                      className="flex flex-wrap gap-2"
                      layout
                    >
                      {(isActive
                        ? category.skills
                        : category.skills.slice(0, 4)
                      ).map((skill, i) => (
                        <motion.span
                          key={skill}
                          className="pill text-xs"
                          style={{
                            borderColor: isActive
                              ? `${category.color}25`
                              : undefined,
                          }}
                          initial={
                            isActive && i >= 4
                              ? { opacity: 0, scale: 0.8 }
                              : false
                          }
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.03 }}
                          whileHover={{
                            background: `${category.color}15`,
                            borderColor: `${category.color}40`,
                            color: category.color,
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                      {!isActive && category.skills.length > 4 && (
                        <span
                          className="pill text-xs"
                          style={{
                            color: category.color,
                            borderColor: `${category.color}30`,
                          }}
                        >
                          +{category.skills.length - 4} more
                        </span>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
