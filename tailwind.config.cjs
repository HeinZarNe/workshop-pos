// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/flowbite/**/*.js"
//     // "node_modules/daisyui/dist/**/*.js",
//     // "node_modules/react-daisyui/dist/**/*.js",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         base: "#BB86FC",
//         secondary: "#535353",
//         transparent: "transparent",
//         current: "currentColor",
//       },
//       backgroundImage: {
//         "login-bg": "url('/assets/bg.png')",
//       },
//     },
//   },
//   plugins: [require( "flowbite/plugin","daisyui")],
//   colors: {
//     primary: "#BB86FC",
//   },
// };
/**   @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    // "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#BB86FC",
        secondary: "#1E1E1E",
        back: "#121212",
        tcolor: "#E9E9E9",
        tscolor: "#A7A7A7",
        transparent: "transparent",
        current: "currentColor",
      },
      backgroundImage: {
        "login-bg": "url('/assets/bg.png')",
      },
    },
  },
  plugins: [require("daisyui", "flowbite/plugin")],
  colors: {
    primary: "#BB86FC",
  },
};
