import { colors } from "./src/styles/colors";

/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: { max: "640px" },
        sm: { min: "640px" },
        md: { min: "768px" },
        lg: { min: "1024px" },
        xl: { min: "1280px" },
        "2xl": { min: "1536px" },
      },
      colors: {
        primary: {
          ...colors.primary,
          primary: colors.primary[600],
        },
        secondary: {
          ...colors.secondary,
          primary: colors.secondary[600],
        },
        error: colors.error,
      },
    },
  },
  plugins: [],
};
