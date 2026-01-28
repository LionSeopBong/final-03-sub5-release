import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#003458",
        "primary-light": "#084168",
        "primary-dark": "#000080",
        secondary: "#000080",
        accent: "#2c7fb8",

        // Status colors
        success: "#34a853",
        warning: "#fbbc05",
        error: "#ea4335",
        info: "#0073ff",

        // Basic colors
        black: "#000000",
        white: "#ffffff",

        // Gray scale
        gray: {
          50: "#f8f8f8",
          100: "#f4f4f4",
          200: "#e8e8e8",
          300: "#d3d3d3",
          400: "#acacac",
          500: "#808080",
          600: "#686868",
          700: "#464545",
          800: "#1c1b1f",
          900: "#111111",
        },

        // Custom colors (기존)
        "gray-custom": "#c3c3c3",
        notselectbtn: "#F4F4F4",
        "notselectbtn-border": "#686868",
        customRed: "#E85C5C",
        "customRed-light": "#F56F6F",
        gaugeColor: "#0000FF",
      },

      textColor: {
        primary: "#000000",
        secondary: "#686868",
        tertiary: "#acacac",
        inverse: "#ffffff",
      },
      borderColor: {
        light: "#e8e8e8",
        medium: "#d3d3d3",
        dark: "#acacac",
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
