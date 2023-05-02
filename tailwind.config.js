/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {},
    fontFamily: {
      Modernist: ["SK-Modernist", "sans-serif"],
    },
    screens: {
      xl: "0px",
      sm: "320px",
      mobile: "480px",
      tablet: "600px",
      laptop: "1024px",
      desktop: "1200px",
      bigScreen: "1920px",
    },
  },
  plugins: [],
};
