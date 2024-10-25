import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          'geometricBg': "url('/geometric_bg.svg')",
          'starBg': "url('/stars_bg.png')"
      },
      colors: {
        "date-grey": "#D9D9D9",
      },
    },
  },
  plugins: [require("rippleui")],
  /** @type {import('rippleui').Config} */
  rippleui: {
    themes: [
      {
        themeName: "dark",
        colorScheme: "dark",
        prefersColorScheme: true,
        colors: {
          primary: "#572647",
          backgroundPrimary: "#000000",
        },
        default: true,
      },
    ],
    removeThemes: ["light"],
  },
};
