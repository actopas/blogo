import { addDynamicIconSelectors } from '@iconify/tailwind';
import { fontFamily } from 'tailwindcss/defaultTheme';

import { type Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    debugScreens: {
      position: ['bottom', 'right'],
      ignore: ['dark'],
    },
    extend: {
      letterSpacing: {
        custom63: '0.63rem',
        custom60: '0.60rem',
        custom58: '0.58rem',
        custom54: '0.54rem',
        custom52: '0.52rem',
        custom43: '0.43rem',
        custom25: '0.25rem',
        custom23: '0.23rem',
        custom20: '0.20rem',
        custom18: '0.18rem',
        custom16: '0.16rem',
        custom07: '0.07rem',
        custom05: '0.05rem',
        custom03: '0.03rem',
        custom01: '0.01rem',
        'custom-05': '-0.05rem',
        'custom-08': '-0.08rem',
      },
      margin: {
        '0.8': '0.2rem',
      },
      minHeight: {
        '3/5': '60vh',
      },
      lineHeight: {
        '14': '3.5rem !important',
        '32': '8rem !important',
        '48': '12rem !important',
        '72': '20rem !important',
      },
      padding: {
        'custom0.7': '0.7rem',
      },
      zIndex: {
        '9': '9',
      },
      inset: {
        'custom14.7': '14.7rem',
      },
      width: {
        '9/10': '90%',
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        custom: '840px',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Poppins', 'PingFang', ...fontFamily.sans],
        mono: [...fontFamily.mono],
        danfo: ['Danfo', 'sans-serif'],
        'rubik-puddles': ['var(--font-rubik-puddles)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'cursor-blink': {
          '50%': { borderColor: 'transparent' },
        },
        'move-up': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-10px)' },
        },
        'intro-scroll': {
          '0%': {
            transform: 'translateY(0)',
            opacity: '0',
          },
          '20%': {
            transform: 'translateY(2px)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(8px)',
            opacity: '0',
          },
        },
        'move-up-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '40%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(0)',
          },
        },
        loader: {
          '90%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' },
        },
        'loader-finish': {
          '100%': { transform: 'scale(0)', opacity: '0' },
        },
      },
      clipPath: {
        'custom-arc': 'ellipse(100% 50% at 50% 100%)',
        'rain-drop': 'ellipse(50% 60% at 50% 40%)',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'move-up-down': 'move-up-down 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        // Cursor blinking animation
        'cursor-blink': 'cursor-blink 0.6s step-end infinite alternate',
        'intro-scroll': 'intro-scroll 3s ease infinite',
        'move-up': 'move-up 2s ease infinite alternate',
        spin: 'spin 1s linear infinite',
      },
      textShadow: {
        'light-glow':
          '0 0 5px rgba(255, 255, 255, 0.5), 0 0 2px rgba(255, 255, 255, 0.7), 0 0 2px rgba(255, 255, 255, 0.9)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    // Load the plugin to display the screen size in development mode
    process.env.NODE_ENV === 'development' &&
      require('tailwindcss-debug-screens'),
    // Iconify plugin
    addDynamicIconSelectors(),
    // Animation plugin
    require('tailwindcss-animated'),
    require('tailwindcss-textshadow'),
  ],
} satisfies Config;
