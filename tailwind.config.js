/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        cursive: ['Pacifico', 'cursive'],
        handwriting: ['Great Vibes', 'cursive'],
        elegant: ['Cormorant Garamond', 'serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        'love-pink': '#ff6b6b',
        'deep-purple': '#2d1b2e',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.8)' },
        }
      }
    },
  },
  plugins: [],
}
