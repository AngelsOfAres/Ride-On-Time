/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        'cinzel-decorative': ['Cinzel Decorative', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        gold: {
          100: '#fdf4d3',
          200: '#f5e088',
          300: '#e8c84a',
          400: '#c9a227',
          500: '#a07c10',
          600: '#6e5508',
        },
        steel: {
          DEFAULT: '#8899aa',
          light: '#aabbc8',
        },
        navy: {
          deep: '#06080f',
          900: '#0a0e1a',
          800: '#0d1420',
          700: '#111c2e',
          600: '#1a2744',
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #f5e088 0%, #c9a227 40%, #e8c84a 70%, #a07c10 100%)',
      },
    },
  },
  plugins: [],
};
