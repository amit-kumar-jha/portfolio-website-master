"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";

/**
 * Skills — Animated grid with glow effects and staggered entrance.
 * Each skill pill has a gradient glow-border on hover.
 */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 120,
    },
  },
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>My skills</SectionHeading>
      <motion.ul
        className="flex flex-wrap justify-center gap-3 text-base"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {skillsData.map((skill, index) => (
          <motion.li
            className="group relative glass rounded-xl px-5 py-3 text-gray-800 dark:text-white/80 cursor-default glow-border transition-all duration-300 hover:shadow-glow hover:scale-105 hover:-translate-y-0.5"
            key={index}
            variants={itemVariants}
          >
            {skill}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
