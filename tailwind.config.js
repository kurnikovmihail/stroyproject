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
        base0: '#0A1428',
        base1: '#111C33',
        base2: '#1A2640',
        panel: '#16233D',
        panelSoft: '#1E2B47',
        textMain: '#E0E0E0',
        textMuted: '#A7B0C1',
        gold: '#C9A96E',
        goldBright: '#D4AF37',
        emerald: '#0A5C3A',
        teal: '#00C4B4',
        cta: '#FF6B35',
      },
      boxShadow: {
        soft: '0 18px 45px rgba(4, 8, 18, 0.35)',
        premium: '0 26px 70px rgba(3, 6, 14, 0.48)',
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
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
