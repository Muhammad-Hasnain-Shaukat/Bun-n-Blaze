/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blaze: {
          DEFAULT: '#ff4d00',
          hover: '#ff661a',
          dark: '#cc3700',
          glow: 'rgba(255, 77, 0, 0.4)',
        },
        ember: {
          DEFAULT: '#ff9900',
          light: '#ffb733',
        },
        charcoal: {
          bg: '#0a0a0c',
          card: '#121216',
          surface: '#18181f',
          border: '#262630',
          muted: '#8e8e9f',
        },
        cream: {
          DEFAULT: '#f5f3e9',
          muted: '#cfcbb8',
          card: '#ffffff',
          surface: '#ede9dc',
          border: '#dcd7c7',
        }
      },
      fontFamily: {
        modern: ['"Plus Jakarta Sans"', '"Outfit"', '"Inter"', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Inter"', '-apple-system', 'sans-serif'],
        street: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      animation: {
        'flame-pulse': 'flamePulse 3s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marqueeRev 25s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        flamePulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.08)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRev: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
