/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/*/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'btn-yellow': '#ca994d',
        'hover-yellow':'#b68945',
        'dark-primary': '#080727',
        'light-primary':'#0B0A30',
        'secondary':'#2aed91 ',
        'secondary2':'#FF516D',

      }
    }
  },
  plugins: []
}
