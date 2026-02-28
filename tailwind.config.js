/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          1: "#6366f1",
          2: "#8b5cf6",
          3: "#a78bfa",
          4: "#c084fc",
        },
        surface: {
          light: "rgba(255, 255, 255, 0.7)",
          dark: "rgba(15, 23, 42, 0.6)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "accent-gradient": "linear-gradient(135deg, #6366f1, #c084fc)",
        "accent-gradient-h": "linear-gradient(90deg, #6366f1, #8b5cf6, #c084fc)",
        "mesh-gradient":
          "radial-gradient(at 40% 20%, #6366f1 0px, transparent 50%), radial-gradient(at 80% 0%, #8b5cf6 0px, transparent 50%), radial-gradient(at 0% 50%, #a78bfa 0px, transparent 50%)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(99, 102, 241, 0.3)",
        "glow-lg": "0 0 40px rgba(99, 102, 241, 0.4)",
        "glow-accent": "0 0 30px rgba(139, 92, 246, 0.35)",
        "glow-soft": "0 0 60px rgba(99, 102, 241, 0.15)",
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 14s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        morph: "morph 20s ease-in-out infinite",
        orbit: "orbit 30s linear infinite",
        "rotate-border": "rotate-border 4s linear infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
