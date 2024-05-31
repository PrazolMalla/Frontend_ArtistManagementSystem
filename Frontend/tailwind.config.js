/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/*/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        'secondary-color':'#FF516D  ',
        'dark-primary-color':'#080727  ',
        'light-primary-color':'#0B0A30',
      }
    }
  },
  plugins: []
}
