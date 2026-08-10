"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import TextReveal from "@/components/ui/TextReveal";
import { fadeInUp, viewportOnce } from "@/lib/animations";

const nodes = [
  { id: "client", label: "Next.js Client", x: 50, y: 5, color: "#3B82F6", size: "lg" },
  { id: "gateway", label: "API Gateway", x: 50, y: 25, color: "#6366F1", size: "lg" },
  { id: "auth", label: "Auth\n(JWT / OAuth)", x: 15, y: 25, color: "#F59E0B", size: "md" },
  { id: "services", label: "Microservices\n(Node.js / Go)", x: 85, y: 25, color: "#8B5CF6", size: "md" },
  { id: "ai", label: "AI Services\n(OpenAI / Ollama)", x: 15, y: 50, color: "#22C55E", size: "md" },
  { id: "mysql", label: "MySQL", x: 38, y: 50, color: "#06B6D4", size: "sm" },
  { id: "mongo", label: "MongoDB", x: 50, y: 50, color: "#06B6D4", size: "sm" },
  { id: "redis", label: "Redis", x: 62, y: 50, color: "#EF4444", size: "sm" },
  { id: "aws", label: "AWS Cloud\n(EC2, S3, Lambda)", x: 85, y: 50, color: "#F59E0B", size: "md" },
  { id: "whatsapp", label: "WhatsApp\nWebhooks", x: 15, y: 75, color: "#22C55E", size: "sm" },
  { id: "salesforce", label: "Salesforce\nAPIs", x: 38, y: 75, color: "#3B82F6", size: "sm" },
  { id: "slack", label: "Slack\nBot SDK", x: 62, y: 75, color: "#8B5CF6", size: "sm" },
  { id: "cicd", label: "CI/CD\n(GitHub Actions)", x: 85, y: 75, color: "#EC4899", size: "sm" },
];

const connections = [
  [50, 10, 50, 22],
  [50, 28, 50, 47],
  [18, 25, 45, 25],
  [55, 25, 82, 25],
  [18, 30, 18, 47],
  [82, 30, 82, 47],
  [18, 55, 18, 72],
  [38, 55, 38, 72],
  [62, 55, 62, 72],
  [82, 55, 82, 72],
];

export default function Architecture() {
  return (
    <section className="relative py-section-lg">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <SectionLabel>Architecture</SectionLabel>

        <TextReveal
          text="System Architecture"
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
          Production-grade distributed systems with microservices, AI integrations,
          real-time data processing, and cloud-native deployment.
        </motion.p>

        {/* Architecture diagram */}
        <motion.div
          className="glass-card rounded-3xl p-8 sm:p-12 glow-border"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="relative w-full" style={{ paddingBottom: "60%" }}>
            {/* Connection lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 80"
              preserveAspectRatio="none"
            >
              {connections.map(([x1, y1, x2, y2], i) => (
                <motion.line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(59, 130, 246, 0.15)"
                  strokeWidth="0.3"
                  strokeDasharray="2 2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                />
              ))}
            </svg>

            {/* Nodes */}
            {nodes.map((node, i) => (
              <motion.div
                key={node.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3 + i * 0.08,
                  type: "spring",
                  damping: 20,
                  stiffness: 150,
                }}
              >
                <div
                  className={`group relative px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-center cursor-default transition-all duration-300 hover:scale-110 ${
                    node.size === "lg"
                      ? "min-w-[100px] sm:min-w-[140px]"
                      : node.size === "md"
                      ? "min-w-[80px] sm:min-w-[120px]"
                      : "min-w-[60px] sm:min-w-[90px]"
                  }`}
                  style={{
                    background: `${node.color}10`,
                    border: `1px solid ${node.color}25`,
                  }}
                >
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                    style={{ background: `${node.color}20` }}
                  />
                  <span
                    className="text-[10px] sm:text-xs font-medium whitespace-pre-line leading-tight"
                    style={{ color: node.color }}
                  >
                    {node.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
