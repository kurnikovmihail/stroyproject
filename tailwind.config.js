/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui'],
        display: ['Sora', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        ink: '#121518',
        slate: '#2a3138',
        ivory: '#f6f1e8',
        sand: '#e9dfd1',
        bronze: '#b48756',
        bronzeDark: '#7f5d3a',
      },
      boxShadow: {
        'premium-sm': '0 12px 30px rgba(16, 19, 22, 0.08)',
        'premium-lg': '0 28px 60px rgba(16, 19, 22, 0.18)',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowSoft: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '0.72', transform: 'scale(1.08)' },
        },
      },
      animation: {
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'glow-soft': 'glowSoft 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
