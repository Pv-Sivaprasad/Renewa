
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'footer-color': 'rgba(28,12,60,255)',
      }
    },
  },
  plugins: [],
}


