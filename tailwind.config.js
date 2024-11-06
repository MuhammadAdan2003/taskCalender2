/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}",
    "./node_modules/flowbite/**/*.js" // Add this line to include Flowbite's JS
  ],

  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

