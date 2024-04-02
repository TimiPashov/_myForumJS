/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        customFont: ['"Fira Code"'],
        // Add more custom font families as needed
      },
      boxShadow: {
        'custom': '0 0 0.5em 0.1em rgba(0, 0, 0, 0.4)',
        'hover': '0 0 0.5em 0.1em rgba(0, 0, 0, 0.2)'
      },
      margin: {
        'center': '0 auto'
      },
    },
  },
  plugins: [],
}
