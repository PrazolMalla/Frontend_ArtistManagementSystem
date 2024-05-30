/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        'button-color':'#FF516D  ',
        'primary-color':'#080727  ',
        'secondary-color':'#0B0A30',
      }
    },
  },
  plugins: []
}
