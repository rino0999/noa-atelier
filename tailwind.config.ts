import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        softCream: "#FAF7F2",
        ivory: "#F5F0E8",
        warmGold: "#C9A96E",
        dustyRose: "#D4A5A5",
        charcoal: "#2C2C2C",
        deepEspresso: "#1A1008",
        antiqueBrass: "#8B6914",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        fadeIn: "fadeIn 0.4s ease forwards",
        slideInRight: "slideInRight 0.3s ease forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
