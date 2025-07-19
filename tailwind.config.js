/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pretendard': ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        '40': ['40px', '1.2'],
      },
      colors: {
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        custom: {
          pink: '#FF6E75',
          pink80: 'rgba(255, 110, 117, 0.8)',
          gray: '#8A898E',
        }
      }
    },
  },
  plugins: [],
}

