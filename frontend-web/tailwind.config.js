/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "safe-blue": "#0C8AC1",
        "safe-white": "#FFFFFF",
        "safe-white-shade": "#f2f2f2",
        "safe-gray": "#F5FAFD",
        "safe-blue-shade": "#04477B",
        "safe-black": "#000000",
      },
      colors: {
        "safe-color-blue": "#0C8AC1",
        "safe-color-gray": "#D8D8D8",
      },
      textColor: {
        "safe-text-black": "#000000",
        "safe-text-gray": "#858992",
        "safe-text-dark-gray": "#4F4F4F",
        "safe-text-white": "#FFFFFF",
        "safe-text-dark-blue": "#082A44",
        "safe-text-link-blue": "#2F80ED",
        "safe-text-dark-link-blue": "#065A93",
        "safe-text-blue-shade": "#04477B",
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
