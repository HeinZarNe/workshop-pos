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
//         base: "#B19777",
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
//     primary: "#B19777",
//   },
// };
/**   @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#B19777",
        secondary: "#535353",
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
    primary: "#B19777",
  },
};
