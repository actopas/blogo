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
        custom16: '0.16rem',
        custom07: '0.07rem',
        custom05: '0.05rem',
        custom03: '0.03rem',
        'custom-05': '-0.05rem',
        'custom-08': '-0.08rem',
      },
      lineHeight: {
        '14': '3.5rem !important',
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
        nerko: ['NerkoOne', 'sans-serif'],
        bungeeShade: ['BungeeShade', 'sans-serif'],
        rubikGlitch: ['RubikGlitch', 'sans-serif'],
        bebasNeue: ['BebasNeue', 'sans-serif'],
        josefinSans: ['JosefinSans', 'sans-serif'],
        rubikVinyl: ['RubikVinyl', 'sans-serif'],
        spaceMono: ['SpaceMono', 'sans-serif'],
        rubikPuddles: ['RubikPuddles', 'sans-serif'],
        rowdies: ['Rowdies', 'sans-serif'],
        aclonica: ['Aclonica', 'sans-serif'],
        ibm: ['IBM', 'sans-serif'],
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
      },
      clipPath: {
        'custom-arc': 'ellipse(100% 50% at 50% 100%)',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        // 光标闪烁动画
        'cursor-blink': 'cursor-blink 0.6s step-end infinite alternate',
        'intro-scroll': 'intro-scroll 3s ease infinite',
        'move-up': 'move-up 2s ease infinite alternate',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    // 开发模式下加载显示屏幕大小的插件
    process.env.NODE_ENV === 'development' &&
      require('tailwindcss-debug-screens'),
    // Iconify plugin
    addDynamicIconSelectors(),
    // 动画插件
    require('tailwindcss-animated'),
  ],
} satisfies Config;
