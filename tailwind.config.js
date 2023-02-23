/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#31C699",
        "secondary-color": "#125F78",
        "trash-color": "#F9FAFB",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("flowbite/plugin"),
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};
