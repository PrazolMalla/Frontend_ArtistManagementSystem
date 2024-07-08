/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'secondary-color': '#ff4000',
        'dark-primary-color': '#f6f3eb',
        'light-primary-color': '#ECE6D5 ',
        'gray-text-color': '#4e4e71',
        'primary-text-color': '#302f31'
      },
      theme: {

      }
    },
  },
  plugins: [
    // require('@tailwindcss/aspect-ratio'),
  ]
}