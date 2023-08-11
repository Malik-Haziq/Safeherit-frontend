/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "safe-blue": "#0C8AC1",
        "safe-white": "#FFFFFF",
        "safe-gray": "#F5FAFD",
      },
      colors: {
        "safe-color-blue": "#0C8AC1",
      },
      textColor: {
        "safe-text-gray": "#858992",
        "safe-text-dark-gray": "#4F4F4F",
        "safe-text-white": "#FFFFFF",
        "safe-text-dark-blue": "#082A44",
        "safe-text-link-blue": "#2F80ED",
        "safe-text-dark-link-blue": "#065A93",
      },
      fontFamily: {
        "safe-font-default": "Montserrat",
      },
      width: {
        "167px": "167px",
      },
    },
  },
  plugins: [],
}
