"use client";

import { personalInfo } from "@/lib/data";
import { motion } from "framer-motion";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { HiArrowUp } from "react-icons/hi2";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border-subtle">
      {/* Gradient line */}
      <div className="glow-line w-full" />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="text-center sm:text-left">
            <p className="text-sm text-text-secondary">
              Designed & Built by{" "}
              <span className="gradient-text font-semibold">
                {personalInfo.name}
              </span>
            </p>
            <p className="text-xs text-text-muted mt-1">
              © {new Date().getFullYear()} · All rights reserved
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
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

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="btn-icon"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <HiArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
