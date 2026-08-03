import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
          950: "#022C22",
        },
        // Hero + Visão Geral palette (docs/PETRY_HERO_REDESIGN.md, docs/PETRY_VISAO_GERAL_REDESIGN.md) — additive, does not replace `brand`.
        hero: {
          graphite: "#0C0F0E",
          brass: "#C9A961",
          aluminum: "#AEB4B2",
          ivory: "#EDEAE2",
        },
      },
      fontFamily: {
        // Hero + Visão Geral type scale — the rest of the site keeps its default font stack.
        display: ["var(--font-hero-display)"],
        "mono-hero": ["var(--font-hero-mono)"],
      },
    },
  },
  plugins: [],
};
export default config;
