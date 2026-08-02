import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

// Self-hosted by Next.js at build time — no runtime request to fonts.googleapis.com.
// Scoped to the homepage Hero only; the rest of the site keeps its current font stack.
export const heroDisplay = Space_Grotesk({
    subsets: ["latin"],
    weight: ["700"],
    variable: "--font-hero-display",
    display: "swap",
});

export const heroMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["500"],
    variable: "--font-hero-mono",
    display: "swap",
});
