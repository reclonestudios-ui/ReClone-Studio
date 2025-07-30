/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blood-red': '#B90000',
      },
      fontFamily: {
        'axiforma': ['Axiforma', 'sans-serif'],
        'cinzel': ['"Cinzel Decorative"', 'cursive'],
        'audiowide': ['Audiowide', 'cursive'],
        'orbitron': ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
