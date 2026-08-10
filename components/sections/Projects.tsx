"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "@/lib/data";
import SectionLabel from "@/components/ui/SectionLabel";
import TextReveal from "@/components/ui/TextReveal";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/lib/animations";
import { HiArrowRight, HiXMark } from "react-icons/hi2";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const selected = projectsData.find((p) => p.id === selectedProject);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="relative py-section-lg">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionLabel>Projects</SectionLabel>

        <TextReveal
          text="Products I've Engineered"
          as="h2"
          className="font-heading font-bold text-heading-xl sm:text-display-sm text-text-primary mb-6"
        />

        <motion.p
          className="text-body-lg text-text-secondary max-w-2xl mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          Each project is a production system — architected for scale, built with
          modern engineering practices, and delivering measurable business impact.
        </motion.p>

        {/* Project grid — asymmetric editorial layout */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {projectsData.map((project, i) => (
            <motion.article
              key={project.id}
              className={`group glass-card rounded-3xl overflow-hidden glow-border cursor-pointer ${
                i === 0 ? "md:col-span-2" : ""
              }`}
              variants={staggerItem}
              onClick={() => setSelectedProject(project.id)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              layout
            >
              {/* Gradient header */}
              <div
                className={`h-48 ${i === 0 ? "sm:h-64" : "sm:h-52"} bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
              >
                {/* Animated mesh */}
                <div className="absolute inset-0 dot-grid-dense opacity-60" />
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `radial-gradient(circle at 30% 50%, ${project.accentColor}33, transparent 60%)`,
                  }}
                />

                {/* Category badge */}
                <div className="absolute top-6 left-6">
                  <span
                    className="px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md"
                    style={{
                      background: `${project.accentColor}20`,
                      border: `1px solid ${project.accentColor}30`,
                      color: project.accentColor,
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* View arrow */}
                <div className="absolute bottom-6 right-6">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                  >
                    <HiArrowRight />
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-xs font-mono text-text-muted mb-2 tracking-wider uppercase">
                  {project.subtitle}
                </p>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-text-primary mb-3 group-hover:gradient-text transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <span key={tech} className="pill text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 5 && (
                    <span className="pill text-xs">
                      +{project.techStack.length - 5}
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal */}
            <motion.div
              data-lenis-prevent="true"
              data-lenis-prevent-touch="true"
              className="fixed inset-4 sm:inset-10 lg:inset-x-[15%] lg:inset-y-10 z-50 overflow-y-auto rounded-3xl"
              style={{ background: "#0a0a0f" }}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Header gradient */}
              <div
                className={`h-48 sm:h-64 bg-gradient-to-br ${selected.gradient} relative`}
              >
                <div className="absolute inset-0 dot-grid-dense opacity-60" />
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `radial-gradient(circle at 30% 50%, ${selected.accentColor}33, transparent 60%)`,
                  }}
                />

                {/* Close button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                >
                  <HiXMark className="text-xl" />
                </button>

                {/* Category */}
                <div className="absolute bottom-6 left-8">
                  <span
                    className="px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md"
                    style={{
                      background: `${selected.accentColor}20`,
                      border: `1px solid ${selected.accentColor}30`,
                      color: selected.accentColor,
                    }}
                  >
                    {selected.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 sm:p-12">
                <p className="text-sm font-mono text-text-muted mb-3 tracking-wider uppercase">
                  {selected.subtitle}
                </p>
                <h2 className="font-heading font-bold text-3xl sm:text-4xl text-text-primary mb-6">
                  {selected.title}
                </h2>
                <p className="text-body-lg text-text-secondary leading-relaxed mb-10">
                  {selected.description}
                </p>

                {/* Detailed description */}
                <div className="space-y-6 mb-12">
                  <h3 className="text-sm font-mono text-text-muted tracking-widest uppercase">
                    Deep Dive
                  </h3>
                  {selected.longDescription.map((para, i) => (
                    <div key={i} className="flex gap-4 text-text-secondary leading-relaxed">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                      </span>
                      <p>{para}</p>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div>
                  <h3 className="text-sm font-mono text-text-muted tracking-widest uppercase mb-4">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selected.techStack.map((tech) => (
                      <span key={tech} className="pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
