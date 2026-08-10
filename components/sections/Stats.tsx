"use client";

import { motion } from "framer-motion";
import { statsData } from "@/lib/data";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import {
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/lib/animations";

export default function Stats() {
  return (
    <section className="relative py-section">
      {/* Gradient line top */}
      <div className="glow-line w-full mb-20" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              variants={staggerItem}
            >
              <div className="text-4xl sm:text-5xl font-heading font-bold gradient-text mb-2">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-xs sm:text-sm text-text-muted font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Gradient line bottom */}
      <div className="glow-line w-full mt-20" />
    </section>
  );
}
