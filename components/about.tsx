"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

const textVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20,
    },
  },
};

const hoverVariants = {
  hover: {
    scale: 1.05,
    rotate: 1,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.2, delayChildren: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <motion.p
        className="mb-3"
        // variants={textVariants}
        whileHover="hover"
        variants={hoverVariants}
      >
        As a <span className="font-medium">frontend developer</span>, I am
        driven by a deep passion for creating immersive and intuitive digital
        experiences. With nearly 3 years of hands-on experience, I have honed my
        skills in crafting visually stunning and highly functional websites and
        applications. My journey in web development has been marked by a
        relentless pursuit of excellence, coupled with a commitment to staying
        updated with the latest industry trends and technologies. I thrive in
        collaborative environments, where I can leverage my expertise in{" "}
        <span className="font-medium">React.js</span> and{" "}
        <span className="font-medium">Next.js</span> to bring creative ideas to
        life. A strong believer in the power of clean code and responsive
        design, I prioritize user experience above all else. My approach is
        characterized by meticulous attention to detail and a constant drive for
        improvement. Outside of coding, I enjoy exploring new design trends,
        experimenting with innovative techniques, and contributing to
        open-source projects. As I continue to grow and evolve in this dynamic
        field, I am eager to tackle new challenges and make meaningful
        contributions to the ever-changing landscape of frontend development.{" "}
      </motion.p>
    </motion.section>
  );
}
