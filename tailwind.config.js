/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui'],
        display: ['Montserrat', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        ink: '#14171c',
        graphite: '#2a2f36',
        cloud: '#f7f5f1',
        stone: '#ece7df',
        pine: '#18453f',
        navy: '#1f2e44',
        bronze: '#a67a4f',
        bronzeSoft: '#c7a67f',
      },
      boxShadow: {
        soft: '0 14px 35px rgba(20, 23, 28, 0.08)',
        premium: '0 28px 70px rgba(20, 23, 28, 0.18)',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.1)' },
        },
      },
      animation: {
        'float-slow': 'floatSlow 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
