"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { sendEmail } from "@/actions/sendEmail";
import SectionLabel from "@/components/ui/SectionLabel";
import TextReveal from "@/components/ui/TextReveal";
import { fadeInUp, fadeInLeft, fadeInRight, viewportOnce } from "@/lib/animations";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { HiEnvelope, HiMapPin, HiPhone } from "react-icons/hi2";
import { HiPaperAirplane } from "react-icons/hi2";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await sendEmail(formData);
      if (res.error) {
        setStatusMessage({ type: "error", text: res.error });
      } else {
        setStatusMessage({
          type: "success",
          text: "Message sent successfully! I'll get back to you soon.",
        });
        formRef.current?.reset();
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Something went wrong. Please email directly at " + personalInfo.email,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-section-lg overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[150px] opacity-10"
          style={{
            background: "radial-gradient(circle, #3B82F6, #8B5CF6, transparent)",
          }}
        />
        <div className="absolute inset-0 dot-grid opacity-30" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <SectionLabel>Contact</SectionLabel>

        <TextReveal
          text="Let's Build Something Exceptional"
          as="h2"
          className="font-heading font-bold text-heading-xl sm:text-display-sm text-text-primary mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Contact info */}
          <motion.div
            className="space-y-8"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="text-body-lg text-text-secondary leading-relaxed">
              I&apos;m always open to discussing new projects, AI product ideas,
              or opportunities to bring your vision to life with production-grade
              engineering.
            </p>

            {/* Availability */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl glass-card w-fit">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 availability-pulse" />
              <span className="text-sm font-medium text-green-400">
                Available for new opportunities
              </span>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 text-text-secondary hover:text-accent-blue transition-colors group"
              >
                <span className="btn-icon w-11 h-11 text-base group-hover:border-accent-blue group-hover:text-accent-blue">
                  <HiEnvelope />
                </span>
                <span className="text-sm">{personalInfo.email}</span>
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-4 text-text-secondary hover:text-accent-blue transition-colors group"
              >
                <span className="btn-icon w-11 h-11 text-base group-hover:border-accent-blue group-hover:text-accent-blue">
                  <HiPhone />
                </span>
                <span className="text-sm">{personalInfo.phone}</span>
              </a>

              <div className="flex items-center gap-4 text-text-secondary">
                <span className="btn-icon w-11 h-11 text-base">
                  <HiMapPin />
                </span>
                <span className="text-sm">{personalInfo.location}</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 pt-4">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label="LinkedIn"
              >
                <BsLinkedin />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label="GitHub"
              >
                <BsGithub />
              </a>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="glass-card rounded-3xl p-8 sm:p-10 glow-border">
              <form ref={formRef} className="space-y-5" action={handleSubmit}>
                <div>
                  <label
                    htmlFor="senderEmail"
                    className="block text-xs font-mono text-text-muted tracking-wider uppercase mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="senderEmail"
                    name="senderEmail"
                    type="email"
                    required
                    maxLength={500}
                    placeholder="your@email.com"
                    className="w-full h-12 px-4 rounded-xl bg-white/[0.03] border border-border-subtle text-text-primary placeholder:text-text-muted/50 outline-none transition-all duration-300 focus:border-accent-blue/50 focus:shadow-glow text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono text-text-muted tracking-wider uppercase mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    maxLength={5000}
                    rows={6}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-border-subtle text-text-primary placeholder:text-text-muted/50 outline-none transition-all duration-300 focus:border-accent-blue/50 focus:shadow-glow resize-none text-sm"
                  />
                </div>

                {statusMessage && (
                  <div
                    className={`p-4 rounded-xl text-sm font-medium ${
                      statusMessage.type === "success"
                        ? "bg-green-500/10 border border-green-500/20 text-green-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}
                  >
                    {statusMessage.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <HiPaperAirplane className="text-lg" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
