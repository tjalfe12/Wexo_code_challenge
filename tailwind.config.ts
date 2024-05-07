import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        comfortaa: ["Comfortaa", "cursive"],
        dosis: ["Dosis", "sans-serif"],
        josefine: ["Josefin Sans", "sans-serif"],
        prompt: ["Prompt", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
      },
      boxShadow: {
        glow: "0px 0px 10px 3px #a2d2ff",
      },
      colors: {
        primary: "#ffafcc",
        secondary: "#ffc8dd",
        tertiary: "#cdb4db",
        accent: "#bde0fe",
        background: "#a2d2ff",
      },
    },
  },
  plugins: [],
} satisfies Config;
