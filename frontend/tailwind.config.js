/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // this line enables dark mode
  theme: {
    extend: {
      colors: {
        "dark-primary": "#212121",
        "dark-secondary": "#44475a",
        "dark-accent": "#1f1b24",
      },
    },
  },
  plugins: [],
};
