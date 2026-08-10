"use client";

import { motion } from "framer-motion";
import { aiCapabilities } from "@/lib/data";
import SectionLabel from "@/components/ui/SectionLabel";
import TextReveal from "@/components/ui/TextReveal";
import {
  staggerContainer,
  staggerItem,
  fadeInUp,
  viewportOnce,
} from "@/lib/animations";
import {
  HiCpuChip,
  HiCommandLine,
  HiMagnifyingGlass,
  HiCodeBracket,
  HiChatBubbleLeftRight,
  HiBolt,
  HiSignal,
  HiCog6Tooth,
} from "react-icons/hi2";

const iconMap: Record<string, React.ReactNode> = {
  brain: <HiCpuChip className="text-xl" />,
  agent: <HiCommandLine className="text-xl" />,
  search: <HiMagnifyingGlass className="text-xl" />,
  code: <HiCodeBracket className="text-xl" />,
  message: <HiChatBubbleLeftRight className="text-xl" />,
  bot: <HiBolt className="text-xl" />,
  stream: <HiSignal className="text-xl" />,
  workflow: <HiCog6Tooth className="text-xl" />,
};

export default function AIEngineering() {
  return (
    <section id="ai" className="relative py-section-lg overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] opacity-10"
          style={{
            background: "radial-gradient(circle, #3B82F6, #8B5CF6, transparent)",
          }}
        />
        <div className="absolute inset-0 dot-grid opacity-30" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <SectionLabel>AI Engineering</SectionLabel>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <TextReveal
              text="Engineering Intelligence"
              as="h2"
              className="font-heading font-bold text-heading-xl sm:text-display-sm text-text-primary mb-6"
            />
            <motion.p
              className="text-body-lg text-text-secondary leading-relaxed"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              I integrate AI at the core of every product — from GPT-powered automation
              and multi-agent workflow systems to local LLM pipelines and real-time
              streaming. Building intelligence that scales in production environments.
            </motion.p>
          </div>

          {/* AI Flow diagram */}
          <motion.div
            className="glass-card rounded-2xl p-8 glow-border"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="text-xs font-mono text-text-muted mb-6 tracking-widest uppercase">
              AI Pipeline Architecture
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: "User Input", color: "#64748B" },
                { label: "Prompt Engineering", color: "#3B82F6" },
                { label: "LLM Processing", color: "#8B5CF6" },
                { label: "Function Calling", color: "#06B6D4" },
                { label: "Action Execution", color: "#22C55E" },
                { label: "Response Delivery", color: "#F59E0B" },
              ].map((step, i) => (
                <motion.div
                  key={step.label}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: step.color }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 h-px" style={{ background: `${step.color}30` }} />
                  <span className="text-sm text-text-secondary font-medium">
                    {step.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Capability cards */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {aiCapabilities.map((capability) => (
            <motion.div
              key={capability.title}
              className="group glass-card rounded-2xl p-6 glow-border"
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <div className="w-10 h-10 rounded-xl bg-accent-gradient/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue mb-4 group-hover:shadow-glow transition-shadow duration-300">
                {iconMap[capability.icon]}
              </div>
              <h3 className="font-heading font-semibold text-text-primary mb-2">
                {capability.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {capability.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
