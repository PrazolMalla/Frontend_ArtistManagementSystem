/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/*/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#080727',
        'light-primary':'#0B0A30',
        'secondary':'#FF516D',

      }
    }
  },
  plugins: []
}
