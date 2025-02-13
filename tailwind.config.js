/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      lineClamp: {
        2: "2",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
