/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        foundation: {
          purple: "#93329E", // Primary brand color
        },
        purpose: "#93329E",       // Reinforces brand purple
        wisdom: "#5E548E",        // Deep indigo for strategy, thought
        empowerment: "#F5A623",   // Vibrant gold for action and impact
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};