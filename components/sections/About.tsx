"use client";

import { motion } from "framer-motion";
import { aboutData } from "@/lib/data";
import SectionLabel from "@/components/ui/SectionLabel";
import TextReveal from "@/components/ui/TextReveal";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/lib/animations";

const timeline = [
  { year: "2016–2020", label: "B.E. Computer Science", type: "education" },
  { year: "2021–2023", label: "Frontend Engineer", type: "work" },
  { year: "2023–2024", label: "Frontend Engineer — Carbon Investments", type: "work" },
  { year: "2024–2025", label: "Freelance Full Stack Developer", type: "work" },
  { year: "2025–Now", label: "Software Engineer & AI Application Developer", type: "current" },
];

export default function About() {
  return (
    <section id="about" className="relative py-section-lg">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <SectionLabel>About</SectionLabel>

        {/* Headline */}
        <TextReveal
          text={aboutData.headline}
          as="h2"
          className="font-heading font-bold text-heading-xl sm:text-display-sm text-text-primary mb-16"
        />

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-20">
          {/* Left — narrative (3 cols) */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {aboutData.summary.map((paragraph, i) => (
              <motion.p
                key={i}
                className="text-body-lg text-text-secondary leading-relaxed"
                variants={fadeInUp}
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Education */}
            <motion.div
              className="pt-6 border-t border-border-subtle"
              variants={fadeInUp}
            >
              <p className="text-sm text-text-muted mb-1">Education</p>
              <p className="text-text-primary font-medium">
                {aboutData.education.degree}
              </p>
              <p className="text-sm text-text-secondary">
                {aboutData.education.location} · {aboutData.education.period}
              </p>
            </motion.div>
          </motion.div>

          {/* Right — timeline (2 cols) */}
          <motion.div
            className="lg:col-span-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h3 className="text-sm font-mono text-text-muted tracking-widest uppercase mb-8">
              Career Timeline
            </h3>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-3 top-2 bottom-2 w-px bg-border-subtle" />

              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    className="relative flex items-start gap-6 pl-10"
                    variants={staggerItem}
                  >
                    {/* Dot */}
                    <div
                      className={`absolute left-1.5 top-2 w-3 h-3 rounded-full border-2 ${
                        item.type === "current"
                          ? "bg-accent-blue border-accent-blue shadow-glow"
                          : item.type === "education"
                          ? "bg-accent-purple/30 border-accent-purple"
                          : "bg-bg-primary border-border-hover"
                      }`}
                    />

                    <div>
                      <p className="text-xs font-mono text-accent-blue mb-1">
                        {item.year}
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          item.type === "current"
                            ? "text-text-primary"
                            : "text-text-secondary"
                        }`}
                      >
                        {item.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Philosophy cards */}
        <motion.div
          className="grid sm:grid-cols-3 gap-6 mt-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {aboutData.philosophy.map((card, i) => (
            <motion.div
              key={i}
              className="glass-card rounded-2xl p-8 glow-border"
              variants={staggerItem}
            >
              <div className="w-10 h-10 rounded-xl bg-accent-gradient flex items-center justify-center text-white text-lg mb-5 shadow-glow">
                <span className="font-heading font-bold text-sm">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-lg text-text-primary mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
