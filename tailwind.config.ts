import path from "node:path";
import type { Config } from "tailwindcss";

// Palette driven by CSS variables (see globals.css) so `.dark` can flip it without touching components.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  // Absolute so the scan works regardless of the directory the dev server is launched from.
  content: [path.join(__dirname, "src/**/*.{ts,tsx}").split(path.sep).join("/")],
  theme: {
    extend: {
      colors: {
        white: v("c-white"),
        black: v("c-black"),
        stone: {
          50: v("s-50"),
          100: v("s-100"),
          200: v("s-200"),
          300: v("s-300"),
          400: v("s-400"),
          500: v("s-500"),
          600: v("s-600"),
          700: v("s-700"),
          800: v("s-800"),
          900: v("s-900"),
        },
      },
      keyframes: {
        "zoom-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.14)" },
        },
      },
      animation: {
        "zoom-pulse": "zoom-pulse 1.8s ease-in-out infinite",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        jet: ["var(--font-jet)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
