/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      sans: ["sans-serif"],
    },
    extend: {
      colors: {
        black: "#000000",
        white: "#ffffff",
        gray: {
          100: "#f5f5f5",
          200: "#d4d4d4",
          300: "#a3a3a3",
          400: "#737373",
          500: "#4a4a4a",
          600: "#2f2f2f",
          700: "#1e1e1e",
          800: "#0f0f0f",
          900: "#050505",
        },
        yellows: {
          200: "#FFFF00",
        },
      },
    },
  },
  plugins: [],
};
