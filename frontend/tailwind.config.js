/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {  fontFamily: {
      galada: ['Galada', 'cursive',], 
      customH1: ['CustomFontH1', 'sans-serif'],  
    },},
  },
  plugins: [],
}


