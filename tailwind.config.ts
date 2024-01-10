import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // this setting is for enabling the dark-mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        IranSansWeb: "var(--font-IranSansWeb)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  //i add this to make material ui work
  corePlugins: {
    preflight: false,
  },
};
export default config;
