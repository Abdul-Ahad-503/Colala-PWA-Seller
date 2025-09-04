/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - now using CSS custom properties
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-light': 'var(--color-primary-light)',
        
        // Red color variations using CSS custom properties
        red: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)', 
          200: 'var(--color-primary-200)',
          500: 'var(--color-primary)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
        },
        
        // Background Colors
        background: 'var(--color-background)',
        'background-light': 'var(--color-background-light)',
        'card-bg': 'var(--color-card-bg)',
        
        // Text Colors
        'text-primary': 'var(--color-text-primary)',
        'text-primary-alt': 'var(--color-text-primary-alt)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary': 'var(--color-text-tertiary)',
        'text-important': 'var(--color-text-important)',
        
        // Border Colors
        'border-light': 'var(--color-border-light)',
        'border-gray': 'var(--color-border-gray)',
        
        // Gradient Colors
        'gradient-start': 'var(--color-gradient-start)',
        'gradient-end': 'var(--color-gradient-end)',
      },
      fontFamily: {
        'sans': ['Manrope', 'sans-serif'],
        'decorative': ['Oleo Script', 'cursive'],
      },
      maxWidth: {
        'container': '1080px',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #FF0000, #70064B)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      spacing: {
        '13': '3.25rem',
        '14': '3.5rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '25': '6.25rem',
        '35': '8.75rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
