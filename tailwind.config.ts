import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD93D',
        'primary-dark': '#e0b100',
        secondary: '#6BCB77',
        accent: '#4D96FF',
        danger: '#FF6B6B',
        info: '#845EC2',
        dark: '#1F2937',
        light: '#F9FAFB',
        border: '#E5E7EB',
      },
      fontFamily: {
        sans: ['GeistSans', 'sans-serif'],
        mono: ['GeistMono', 'monospace'],
      },
      spacing: {
        section: '4rem',
        'section-sm': '2rem',
        'container-px': '1.5rem',
      },
      borderRadius: {
        card: '1.25rem',
        button: '0.75rem',
        soft: '0.5rem',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.06)',
        button: '0 2px 6px rgba(0, 0, 0, 0.04)',
        header: '0 1px 4px rgba(0,0,0,0.05)',
        glow: '0 0 20px rgba(255, 217, 61, 0.6)',
      },
      screens: {
        xs: '400px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      scale: {
        '101': '1.01',
        '102': '1.02',
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out',
        float: 'float 3s ease-in-out infinite',
        pulseSlow: 'pulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config