"use client";

import { useRef } from "react";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Project — 3D tilt card with hover depth, glassmorphism, and gradient tags.
 * Preserves scroll-driven scale/opacity + adds tilt hover effect via CSS.
 */

type ProjectProps = (typeof projectsData)[number];

export default function Project({
  title,
  description,
  tags,
  imageUrl,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="group mb-5 sm:mb-8 last:mb-0 perspective-1000"
    >
      <section
        className="glass max-w-[42rem] rounded-2xl overflow-hidden sm:pr-8 relative sm:h-[22rem] transition-all duration-500 hover:shadow-glow-lg glow-border
        sm:group-even:pl-8
        hover:scale-[1.02] hover:-translate-y-1"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Content */}
        <div className="pt-6 pb-8 px-6 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem]">
          <h3 className="text-2xl font-bold gradient-text">{title}</h3>
          <p className="mt-3 leading-relaxed text-gray-600 dark:text-white/65 text-sm">
            {description}
          </p>
          <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
            {tags.map((tag, index) => (
              <li
                className="bg-accent-gradient text-white px-3 py-1 text-[0.65rem] uppercase tracking-wider rounded-full font-medium opacity-90"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Project image with hover animation */}
        <Image
          src={imageUrl}
          alt={`${title} screenshot`}
          quality={95}
          className="absolute hidden sm:block top-10 -right-40 w-[28.25rem] rounded-t-lg shadow-2xl
          transition-all duration-500
          group-hover:scale-[1.05]
          group-hover:-translate-x-3
          group-hover:translate-y-2
          group-hover:-rotate-2
          group-hover:shadow-glow

          group-even:right-[initial] group-even:-left-40
          group-even:group-hover:translate-x-3
          group-even:group-hover:translate-y-2
          group-even:group-hover:rotate-2"
        />
      </section>
    </motion.div>
  );
}
