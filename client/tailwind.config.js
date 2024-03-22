/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#0F113C",
        secondary: "#F3AF1C",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
