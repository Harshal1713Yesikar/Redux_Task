/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      animation: {
        fadeInUp: 'fadeInUp 1s ease-in-out',
        slideIn: 'slideInFromLeft 1s ease-in-out',
         slideFromLeft: 'slideFromLeft 2s ease-out'
      },
    },
  },
  plugins: [],
}

