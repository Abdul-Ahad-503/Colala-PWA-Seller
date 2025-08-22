/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: '#E53E3E',
        
        // Background Colors
        background: '#F9F9F9',
        'background-light': '#FAFAFA',
        'card-bg': '#FFFFFF',
        
        // Text Colors
        'text-primary': '#222222',
        'text-primary-alt': '#1A1A1A',
        'text-secondary': '#555555',
        'text-tertiary': '#666666',
        'text-important': '#E53E3E',
        
        // Border Colors
        'border-light': '#F2F2F2',
        'border-gray': '#E0DFDF',
        
        // Gradient Colors
        'gradient-start': '#FF0000',
        'gradient-end': '#70064B',
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
