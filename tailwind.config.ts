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
        background: "#080808",
        foreground: "#f0ece4",
        devil: {
          red: "#e63946",
          orange: "#f4a261",
          teal: "#2a9d8f",
          blue: "#457b9d",
          muted: "#444444",
          dim: "#1e1e1e",
          dark: "#111111",
          card: "#0f0f0f",
        },
      },
      fontFamily: {
        heading: ["Georgia", "serif"],
        sans: ["system-ui", "-apple-system", "sans-serif"],
      },
      animation: {
        "pulse-red": "pulse-red 2s ease-in-out infinite",
        "slide-up": "slide-up 0.3s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
      keyframes: {
        "pulse-red": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(230, 57, 70, 0.4)" },
          "50%": { boxShadow: "0 0 20px 10px rgba(230, 57, 70, 0.1)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
