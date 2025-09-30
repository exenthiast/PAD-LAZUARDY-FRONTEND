/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#36a3b9',
        secondary: '#2d8a9c'
      }
    }
  },
  plugins: [],
}