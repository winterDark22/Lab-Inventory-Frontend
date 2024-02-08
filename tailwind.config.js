/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        auto: "auto 1fr",
      },

      colors: {
        //primary: "#bf1430",
        primary: "#991B1B",
        pinky: "#A43535",
        //pinky: "#f71b40",
        myBG: "#f9f9f9",
        
        myText: "#5e5e5e",
        myCard: "#f0e0e0",
      },
      spacing: {
        0.5: "0.125rem",
      },
      boxShadow: {
        red: "0 3px 5px 2px rgba(255, 0, 0, .3)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      borderColor: ["hover", "focus"],
    },
  },
  variants: {
    extend: {
      boxShadow: ["hover"],
    },
  },
  plugins: [],
};
