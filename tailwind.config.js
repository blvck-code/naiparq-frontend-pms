/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {},
    screens: {
      sm: "320px",
      mobile: "480px",
      tablet: "600px",
      tabletLand: "768px",
      laptop: "1024px",
      desktop: "1280px",
      desktopLand: "1440px",
      bigScreen: "1920px",
    },
  },
  plugins: [],
};
