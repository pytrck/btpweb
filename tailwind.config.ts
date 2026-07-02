import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0B",
        paper: "#FAFAF8",
        muted: "#8B8B93",
        line: "rgba(255,255,255,0.10)",
        accent: { from: "#FF10F0", to: "#130013" },
      },
      fontFamily: {
        head: ["var(--font-space)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        h1: ["clamp(3rem,7vw,6rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        h2: ["clamp(2rem,4vw,3rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        h3: ["1.5rem", { lineHeight: "1.2" }],
        label: ["0.75rem", { letterSpacing: "0.12em", lineHeight: "1" }],
      },
      borderRadius: { DEFAULT: "2px", sm: "2px", md: "4px" },
      spacing: { section: "clamp(3.5rem,10vw,10rem)" },
      backgroundImage: {
        fracture: "linear-gradient(90deg,#FF10F0,#130013)",
      },
      maxWidth: { content: "80rem" },
    },
  },
  plugins: [],
} satisfies Config;
