"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

/**
 * TextReveal — Word-by-word text reveal animation.
 * Splits text into words and animates each with a staggered fade + slide.
 */

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    once?: boolean;
    /** Element to render: "h1", "h2", "p", "span" etc. */
    as?: keyof JSX.IntrinsicElements;
}

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.04,
        },
    },
};

const wordVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
        filter: "blur(4px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 100,
        },
    },
};

export default function TextReveal({
    text,
    className = "",
    delay = 0,
    once = true,
    as: Tag = "p",
}: TextRevealProps) {
    const words = text.split(" ");

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: 0.5 }}
            transition={{ delay }}
            className={className}
            aria-label={text}
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    variants={wordVariants}
                    className="inline-block mr-[0.3em]"
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}
