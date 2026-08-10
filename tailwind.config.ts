import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#050505",
          secondary: "#0a0a0f",
          tertiary: "#111118",
          card: "#0d0d14",
          "card-hover": "#12121c",
        },
        accent: {
          blue: "#3B82F6",
          "blue-light": "#60A5FA",
          "blue-glow": "rgba(59, 130, 246, 0.4)",
          purple: "#8B5CF6",
          "purple-light": "#A78BFA",
          "purple-glow": "rgba(139, 92, 246, 0.35)",
          cyan: "#06B6D4",
        },
        text: {
          primary: "#E2E8F0",
          secondary: "#94A3B8",
          muted: "#64748B",
          accent: "#CBD5E1",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.06)",
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          hover: "rgba(255, 255, 255, 0.12)",
          accent: "rgba(59, 130, 246, 0.3)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["5.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        display: ["4.5rem", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        "display-sm": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "heading-xl": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        heading: ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "heading-sm": ["1.75rem", { lineHeight: "1.3", letterSpacing: "-0.015em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        body: ["1rem", { lineHeight: "1.7" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        caption: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.05em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
        section: "8rem",
        "section-lg": "12rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "accent-gradient": "linear-gradient(135deg, #3B82F6, #8B5CF6)",
        "accent-gradient-h": "linear-gradient(90deg, #3B82F6, #6366F1, #8B5CF6)",
        "accent-gradient-v": "linear-gradient(180deg, #3B82F6, #8B5CF6)",
        "surface-gradient": "linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.05))",
        "glow-gradient": "radial-gradient(circle at center, rgba(59, 130, 246, 0.15), transparent 70%)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(59, 130, 246, 0.25)",
        "glow-lg": "0 0 40px rgba(59, 130, 246, 0.3)",
        "glow-purple": "0 0 30px rgba(139, 92, 246, 0.3)",
        "glow-intense": "0 0 60px rgba(59, 130, 246, 0.4), 0 0 120px rgba(139, 92, 246, 0.2)",
        card: "0 4px 24px rgba(0, 0, 0, 0.4)",
        "card-hover": "0 8px 48px rgba(0, 0, 0, 0.6), 0 0 20px rgba(59, 130, 246, 0.1)",
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 14s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        morph: "morph 20s ease-in-out infinite",
        orbit: "orbit 30s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        shimmer: "shimmer 3s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 8px rgba(59, 130, 246, 0.3)" },
          "50%": { boxShadow: "0 0 24px rgba(59, 130, 246, 0.5), 0 0 48px rgba(139, 92, 246, 0.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-18px) rotate(1deg)" },
          "66%": { transform: "translateY(8px) rotate(-1deg)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        morph: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "25%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
          "50%": { borderRadius: "50% 60% 30% 60% / 30% 60% 70% 40%" },
          "75%": { borderRadius: "60% 40% 60% 30% / 60% 40% 30% 70%" },
        },
        orbit: {
          from: { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          to: { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      transitionDuration: {
        "400": "400ms",
      },
    },
  },
  plugins: [],
};

export default config;
