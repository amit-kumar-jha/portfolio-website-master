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
       As a <span className="font-medium">Software Developer</span>, I am driven by a deep
passion for creating immersive, scalable, and intuitive digital experiences
across modern web applications and CRM platforms. With nearly 4 years of
hands-on experience, I have built visually compelling and highly functional
solutions using modern frontend technologies along with the Salesforce
platform. My journey in development has been shaped by a relentless pursuit of
excellence and a strong commitment to staying current with evolving industry
trends and best practices. I work extensively with <span className="font-medium">React.js</span> and{" "}
<span className="font-medium">Next.js</span> to build high-performance web
applications that emphasize clean code, reusable components, responsive design,
and smooth user experiences. Alongside this, I develop scalable CRM solutions
using <span className="font-medium">Lightning Web Components (LWC)</span>, Apex,
and Salesforce platform features to support real-world business workflows and
enterprise use cases. I thrive in collaborative environments where attention to detail,
problem-solving, and continuous improvement are valued. Beyond coding, I enjoy
exploring modern UI/UX patterns, learning platform-specific best practices, and
building solutions that deliver real business impact. As I continue to grow in
this dynamic field, I am eager to take on new challenges and contribute
meaningfully across both web and Salesforce-driven ecosystems.
      </motion.p>
    </motion.section>
  );
}
