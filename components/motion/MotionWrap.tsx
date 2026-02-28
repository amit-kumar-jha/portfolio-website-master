"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

/**
 * MotionWrap — Reusable scroll-triggered reveal wrapper.
 * Wraps children with a whileInView animation that fades + slides in.
 *
 * @param direction - Slide direction: "up" | "down" | "left" | "right"
 * @param delay - Animation delay in seconds
 * @param duration - Animation duration in seconds
 * @param className - Additional CSS classes
 * @param once - Whether animation triggers only once (default: true)
 */

type Direction = "up" | "down" | "left" | "right";

interface MotionWrapProps {
    children: React.ReactNode;
    direction?: Direction;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
}

const getVariants = (direction: Direction, duration: number): Variants => {
    const offsets: Record<Direction, { x: number; y: number }> = {
        up: { x: 0, y: 60 },
        down: { x: 0, y: -60 },
        left: { x: 60, y: 0 },
        right: { x: -60, y: 0 },
    };

    return {
        hidden: {
            opacity: 0,
            x: offsets[direction].x,
            y: offsets[direction].y,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 100,
                duration,
            },
        },
    };
};

export default function MotionWrap({
    children,
    direction = "up",
    delay = 0,
    duration = 0.6,
    className = "",
    once = true,
}: MotionWrapProps) {
    return (
        <motion.div
            variants={getVariants(direction, duration)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: 0.2 }}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * StaggerWrap — Container that staggers its children's entrance.
 * Wrap MotionWrap items inside this for stagger effects.
 */
interface StaggerWrapProps {
    children: React.ReactNode;
    staggerDelay?: number;
    className?: string;
}

const staggerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

export function StaggerWrap({
    children,
    staggerDelay = 0.08,
    className = "",
}: StaggerWrapProps) {
    return (
        <motion.div
            variants={{
                hidden: {},
                visible: {
                    transition: { staggerChildren: staggerDelay },
                },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
