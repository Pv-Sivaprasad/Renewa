
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
      animation: {
        heartbeat: 'heartbeat 1s ease-in-out infinite',
      },
      colors: {
        'footer-color': 'rgba(28,12,60,255)', 
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],

}
