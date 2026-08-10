"use client";

import { motion } from "framer-motion";
import { textRevealContainer, textRevealWord } from "@/lib/animations";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}

export default function TextReveal({
  text,
  className = "",
  as: Tag = "p",
  delay = 0,
}: TextRevealProps) {
  const words = text.split(" ");

  return (
    <motion.div
      variants={textRevealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delayChildren: delay }}
    >
      <Tag className={className}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.3em]"
            variants={textRevealWord}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}
