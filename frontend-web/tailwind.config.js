/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        'safe-blue': '#0C8AC1',
      },
      colors: {
        'safe-color-blue': '#0C8AC1',
      },
      textColor: {
        'safe-text-gray': '#858992',
        'safe-text-white': '#FFFFFF'
      },
      fontFamily: {
        'safe-font-default':'Montserrat'
      },
    },
  },
  plugins: [],
}

