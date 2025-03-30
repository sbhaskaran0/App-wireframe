/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00C805',
          dark: '#00B804',
          light: '#00E806',
        },
        secondary: {
          DEFAULT: '#1E2124',
          dark: '#171A1D',
          light: '#2A2D31',
        },
      },
    },
  },
  plugins: [],
};