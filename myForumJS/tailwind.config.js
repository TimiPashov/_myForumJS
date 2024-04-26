const plugin = require("tailwindcss/plugin");

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
        custom: "0 0 0.5em 0.1em rgba(0, 0, 0, 0.4)",
        hover: "0 0 0.5em 0.1em rgba(0, 0, 0, 0.2)",
        inset: "0 0 1em 0 rgba(0, 0, 0, 0.1) inset",
        bottom: "0 0.1em 0.3em rgba(0, 0, 0, 0.2)",
      },
      margin: {
        center: "0 auto",
      },
      backgroundImage: {
        "header-background":
          "url('https://unsplash.com/photos/a-robot-hand-holding-a-letter-that-says-ai-OFxYMp8VkdI')",
        "footer-texture": "url('/img/footer-texture.png')",
      },
    },
  },
  plugins: [
    // plugin(function ({ addBase }) {
    //   addBase({
    //     html: { fontSize: "16px" },
    //   });
    // }),
  ],
};
