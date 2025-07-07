/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        accent: '#FFE66D',
        surface: '#FFF5F5',
        background: '#FFFBF7',
        success: '#95E1A3',
        warning: '#FFB347',
        error: '#FF6B6B',
        info: '#74C0FC',
      },
      fontFamily: {
        'display': ['Fredoka One', 'cursive'],
        'body': ['Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'bounce-gentle': 'bounce 0.5s ease-in-out',
        'shake': 'shake 0.5s ease-in-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}