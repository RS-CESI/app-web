/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFD93D',
        secondary: '#6BCB77',
        accent: '#4D96FF',
        danger: '#FF6B6B',
        info: '#845EC2',
      },
    },
  },
  plugins: [],
};
