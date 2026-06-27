/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#100B22',
        'ink-2': '#1B1438',
        paper: '#FBFAFF',
        'paper-2': '#F2EEFF',
        line: '#E5E0F5',
        muted: '#6B6586',
        body: '#241C3C',
        // Track + accent system
        indigo: '#6366F1',
        violet: '#8B5CF6',
        blue: '#3B82F6',
        teal: '#14B8A6',
        emerald: '#10B981',
        pink: '#EC4899',
        amber: '#F59E0B',
        fuchsia: '#D946EF',
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: {
        page: '74rem',
      },
      keyframes: {
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'gradient-pan': 'gradient-pan 14s ease infinite',
        float: 'float 9s ease-in-out infinite',
        'spin-slow': 'spin-slow 28s linear infinite',
      },
    },
  },
  plugins: [],
};
