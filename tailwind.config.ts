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
        "primary-light": "#004d7a",
        "primary-dark": "#002340",
        secondary: "#60A5FA",
        "gray-custom": "#c3c3c3",
        notselectbtn: "#F4F4F4",
        "notselectbtn-border": "#686868",
      },
    },
  },
  plugins: [],
};

export default config;
