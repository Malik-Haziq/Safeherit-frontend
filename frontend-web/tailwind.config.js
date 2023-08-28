/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "safe-blue": "#0C8AC1",
        "safe-white": "#FFFFFF",
        "safe-white-shade": "#f2f2f2",
        "safe-white-shade-1": "#EDEDED",
        "safe-gray": "#F5FAFD",
        "safe-gray-shade": "#D7D7D7",
        "safe-gray-shade-1": "#E0E0E0",
        "safe-blue-shade": "#04477B",
        "safe-blue-tint": "#0971AA",
        "safe-blue-light": "#B4DBEC",
        "safe-light-blue-tint": "#E7F4F9",
        "safe-black": "#000000",
        "safe-green-light": "##5CEAD2",
        "safe-green-shade": "rgba(82, 206, 183, .23)",
      },
      colors: {
        "safe-color-blue": "#0C8AC1",
        "safe-color-gray": "#D8D8D8",
      },
      textColor: {
        "safe-text-black": "#000000",
        "safe-text-black-tint": "#00192B",
        "safe-text-gray": "#858992",
        "safe-text-gray-shade": "#74777E",
        "safe-text-dark-gray": "#4F4F4F",
        "safe-text-light-gray": "#B4B4B4",
        "safe-text-light-gray-tint": "#828282",
        "safe-text-white": "#FFFFFF",
        "safe-text-dark-blue": "#082A44",
        "safe-text-link-blue": "#2F80ED",
        "safe-text-dark-link-blue": "#065A93",
        "safe-text-blue-shade": "#04477B",
      },
      backgroundImage: {
        "linear-gradient": "linear-gradient(180deg, #5CEAD2 0%, #065A93 100%);",
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
