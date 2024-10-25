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
      colors: {
        'footer-color': 'rgba(28,12,60,255)', // Example custom color
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()], // Add NextUI as a plugin
};


// // /** @type {import('tailwindcss').Config} */
// // module.exports = {
// //   content: [
// //     "./index.html",
// //     "./src/**/*.{js,ts,jsx,tsx}",
// //   ],
// //   theme: {
// //     extend: {
// //       colors:{
// //         'footer-color': 'rgba(28,12,60,255)',
// //       }
// //     },
// //   },
// //   plugins: [],
// // }





// // tailwind.config.js
// const { nextui } = require("@nextui-org/react");

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     // ...
//     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
//   ],
//   theme: {
//     extend: {},
//   },
//   darkMode: "class",
//   plugins: [nextui()]
// }