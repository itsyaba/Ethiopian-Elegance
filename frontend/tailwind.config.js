/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Courier: ["Courier New", "Courier", "monospace"],
        Kanit: ["Kanit", "sans-serif"],
      },
      colors: {
        NavColor: "#D9DBE9",
      },
    },
  },
  plugins: [],
};

