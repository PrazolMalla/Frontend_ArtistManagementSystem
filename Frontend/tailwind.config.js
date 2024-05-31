/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/*/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#080727',
        'secondary-color':'#0B0A30',
        'button-color':'#FF516D',

      }
    }
  },
  plugins: []
}
