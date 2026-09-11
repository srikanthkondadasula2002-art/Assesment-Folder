/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fk-blue': '#2874f0',
        'fk-yellow': '#ffe500',
        'fk-orange': '#fb641b',
        'fk-green': '#388e3c',
        'fk-lightgreen': '#26a541',
        'fk-gray': '#878787',
        'fk-bg': '#f1f3f6',
        'fk-border': '#f0f0f0',
        'fk-dark': '#212121'
      },
      borderRadius: {
        'xs': '2px'
      },
      fontFamily: {
        sans: ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']
      }
    },
  },
  plugins: [],
}
