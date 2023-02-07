/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        "primary-color": "#31C699",
        "secondary-color": "#125F78",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};
