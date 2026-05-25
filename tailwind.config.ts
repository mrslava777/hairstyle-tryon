import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          950: "#07070b",
          900: "#0b0b12",
          800: "#11111b",
          700: "#1a1a26",
          600: "#262635",
        },
        accent: {
          violet: "#a78bfa",
          indigo: "#818cf8",
          pink: "#f472b6",
          cyan: "#22d3ee",
        },
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse at top, rgba(167,139,250,0.18), transparent 60%), radial-gradient(ellipse at bottom right, rgba(34,211,238,0.12), transparent 60%)",
        "hero-gradient":
          "linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #22d3ee 100%)",
      },
      boxShadow: {
        glass:
          "0 8px 32px 0 rgba(0,0,0,0.45), inset 0 1px 0 0 rgba(255,255,255,0.06)",
        glow: "0 0 40px rgba(167,139,250,0.35)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.2s linear infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
