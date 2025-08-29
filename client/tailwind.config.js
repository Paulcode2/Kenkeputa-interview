/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'prata': ['Prata', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'playfair': ['Playfair', 'serif'],
        'manrope': ['Manrope', 'sans-serif'],
      },
      colors: {
        'primary': '#414141',
        'darkBlue': '#1e40af', // Adding the darkBlue color that was referenced
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}