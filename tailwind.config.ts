// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      /* --- your custom palette here --- */
      colors: {
        brand: {
          DEFAULT: "#2563eb", // blue-600
          fg: "#ffffff",
          subtle: "#dbeafe"
        }
      }
    }
  },
  plugins: []
};

export default config;
