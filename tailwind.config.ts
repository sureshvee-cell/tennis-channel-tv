import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "tc-orange": {
          DEFAULT: "#E8772E",
          dark: "#D66B1A",
          light: "#F49454",
        },
        "tc-teal": {
          DEFAULT: "#0B1719",
          light: "#1A2F33",
        },
        "tc-live": {
          DEFAULT: "#4CAF50",
          dark: "#388E3C",
        },
        "tc-dark": {
          DEFAULT: "#0A0A0A",
          100: "#1A1A1A",
          200: "#222222",
          300: "#2A2A2A",
          400: "#333333",
        },
        "tc-gray": {
          DEFAULT: "#888888",
          light: "#B0B0B0",
          dark: "#555555",
        },
      },
      fontFamily: {
        sans: ["Poppins", "Arial", "sans-serif"],
      },
      fontSize: {
        "tv-xs": "0.875rem",
        "tv-sm": "1rem",
        "tv-base": "1.25rem",
        "tv-lg": "1.5rem",
        "tv-xl": "2rem",
        "tv-2xl": "2.5rem",
        "tv-3xl": "3.5rem",
      },
      spacing: {
        "tv-gap": "1.5rem",
        "tv-padding": "3rem",
      },
      borderRadius: {
        "tv": "0.75rem",
      },
      animation: {
        "pulse-live": "pulse-live 2s ease-in-out infinite",
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-right": "slideRight 0.3s ease-out",
      },
      keyframes: {
        "pulse-live": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
