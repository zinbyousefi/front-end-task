export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0ab2b3",
        secondary: "#8dbf2a",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
