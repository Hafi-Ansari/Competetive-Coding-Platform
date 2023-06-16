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
        "dark-primary": "#29263c",
        "dark-secondary": "#282a36",
        "dark-accent": "#15141b",
        "dark-accent-2": "#44475a",
        "dark-accent-3": "#bd93f9",
        "dark-accent-4": "#393c4b",
        "dark-accent-5": "#3d375e7f", 
        "dark-accent-6": "#1e0026",
        "dark-accent-7": "#23002c",
        
      },
    },
  },
  plugins: [],
};
