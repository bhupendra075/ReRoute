/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        emergency: { 50: '#fff5f5', 500: '#ef4444', 700: '#b91c1c', 900: '#7f1d1d' },
        medical: { 50: '#f0fdf4', 500: '#22c55e', 700: '#15803d' },
        warning: { 50: '#fffbeb', 500: '#f59e0b', 700: '#b45309' },
        neumorphism: {
          light: {
            surface: '#fafafa',
            shadow: 'rgba(0, 0, 0, 0.1)',
            innerShadow: 'rgba(255, 255, 255, 0.8)',
          },
          dark: {
            surface: '#18181b',
            shadow: 'rgba(0, 0, 0, 0.3)',
            innerShadow: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
  },
  plugins: [],
}