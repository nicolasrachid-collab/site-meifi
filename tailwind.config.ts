import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        glass: 'rgba(255, 255, 255, 0.1)',
        glassDark: 'rgba(8, 19, 26, 0.4)',
        primary: '#08131A',
        black: '#08131A', // Substituindo black por #08131A
      },
      animation: {
        'scroll-right': 'scrollRight 20s linear infinite',
        'pulse-scale': 'pulseScale 3s infinite ease-in-out',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-out': 'fadeOut 0.3s ease-in forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'zoom-slow': 'zoomSlow 20s ease-in-out infinite alternate',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        scrollRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulseScale: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)' },
          '50%': { transform: 'scale(1.03)', boxShadow: '0 0 25px 0 rgba(255, 255, 255, 0.15)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoomSlow: {
          '0%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1.15)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;


