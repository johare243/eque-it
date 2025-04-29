// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2563eb", // your accent
          fg: "#ffffff",
          subtle: "#dbeafe",
          muted: "#1f2937", // dark-mode card bg
        },
        surface: {
          light: "#ffffff",    // card / table bg in light mode
          DEFAULT: "#f9fafb",  // page bg in light mode (if you want)
          dark: "#020202",    // card / table bg in dark mode
          muted: "#151515",    // zebra-stripe bg in dark mode
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // better form controls
  ],
};

export default config;

