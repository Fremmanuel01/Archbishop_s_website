import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0a0f1e",
          light: "#141c35",
          dark: "#060b16",
          800: "#0d1428",
          700: "#111c38",
          600: "#172248",
        },
        gold: {
          DEFAULT: "#b8922f",
          light: "#d4a84b",
          dark: "#9a7820",
          50:  "#fdf7e9",
          100: "#f9ead0",
          200: "#f0ce8f",
          300: "#e5b050",
          400: "#d4a84b",
          500: "#b8922f",
          600: "#9a7820",
          700: "#7a5e18",
        },
        cream: {
          DEFAULT: "#e8e0d0",
          muted: "#c8bda8",
          dark: "#a89f90",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body:    ["var(--font-body)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in":      "fadeIn 0.6s ease forwards",
        "slide-up":     "slideUp 0.7s ease forwards",
        "gold-shimmer": "goldShimmer 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn:      { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp:     { "0%": { opacity: "0", transform: "translateY(30px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        goldShimmer: { "0%,100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
      },
      backgroundImage: {
        "gold-gradient":    "linear-gradient(135deg, #b8922f, #d4a84b, #b8922f)",
        "navy-gradient":    "linear-gradient(180deg, #0a0f1e 0%, #060b16 100%)",
        "hero-gradient":    "linear-gradient(180deg, rgba(10,15,30,0.4) 0%, rgba(10,15,30,0.85) 100%)",
      },
      boxShadow: {
        "gold": "0 0 30px rgba(184,146,47,0.25)",
        "gold-lg": "0 0 60px rgba(184,146,47,0.3)",
      },
    },
  },
  plugins: [typography],
};
export default config;
