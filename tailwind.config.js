/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "btn-gold": "#FCCB31",
        "btn-orange": "#F45755",
      },
      fontFamily: {
        libreFranklin: ["Libre Franklin"],
        trocchi: ["Trocchi"],
        archivo: ["Archivo Black"],
      },
    },
  },
  plugins: [require("daisyui")],
};
