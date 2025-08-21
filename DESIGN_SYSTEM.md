# Colala PWA Seller - Design System

## Overview
This design system provides consistent styling guidelines for the Colala PWA Seller application, built with React, TypeScript, and Tailwind CSS.

## Colors

### Primary Colors
- **Primary Red**: `#E53E3E` (Tailwind: `primary`)
  - Used for buttons, highlights, active states, and accents
  - Tailwind classes: `bg-primary`, `text-primary`, `border-primary`

### Gradient
- **Gradient**: From `#FF0000` to `#70064B`
  - Used in leaderboard and points cards
  - Tailwind class: `bg-gradient-primary`

### Background Colors
- **Main Background**: `#F9F9F9` (Tailwind: `background`)
- **Light Background**: `#FAFAFA` (Tailwind: `background-light`)
- **Card Background**: `#FFFFFF` (Tailwind: `card-bg`)

### Text Colors
- **Primary Text**: `#222222` (Tailwind: `text-primary`)
- **Primary Alt**: `#1A1A1A` (Tailwind: `text-primary-alt`)
- **Secondary Text**: `#555555` (Tailwind: `text-secondary`)
- **Tertiary Text**: `#666666` (Tailwind: `text-tertiary`)
- **Important Numbers**: `#E53E3E` (Tailwind: `text-important`)

### Border Colors
- **Light Border**: `#F2F2F2` (Tailwind: `border-light`)
- **Gray Border**: `#E0DFDF` (Tailwind: `border-gray`)
- **Active Border**: `#E53E3E` (Tailwind: `border-primary`)

## Typography

### Fonts
1. **Primary Font**: 'Manrope', sans-serif
   - Applied globally for body text and most headings
   - Tailwind class: `font-sans`

2. **Decorative Font**: 'Oleo Script', cursive
   - Used for main h2 in pop-ups and special headings
   - Tailwind class: `font-decorative`
   - CSS class: `.decorative-heading`

### Font Weights
- Light: 200-300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700-800

## Layout

### Container Constraints
- **Maximum Width**: 1080px (never exceed this)
- **Custom Container**: Use `.container-custom` class
- **Tailwind**: `max-w-container`

### Responsive Breakpoints
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Large: 1280px+

## Component Classes

### Buttons
```css
.btn-primary {
  @apply bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200;
}
```

### Cards
```css
.card {
  @apply bg-card-bg border border-border-light rounded-lg shadow-sm;
}
```

### Important Text
```css
.text-important {
  @apply text-primary font-semibold;
}
```

## Utility Classes

### Animations
- `.animate-spin-slow` - Slow spinning animation
- `.btn-hover-scale` - Scale on hover
- `.loading-shimmer` - Loading shimmer effect

### Gradients
- `.text-gradient` - Gradient text effect
- `.bg-gradient-primary` - Primary gradient background

### Shadows
- `.shadow-card` - Standard card shadow
- `.shadow-card-hover` - Enhanced hover shadow

### Status Colors
- `.status-success` - Success state styling
- `.status-warning` - Warning state styling
- `.status-error` - Error state styling

## Usage Examples

### Basic Layout
```tsx
<div className="min-h-screen bg-background">
  <div className="container-custom py-8">
    {/* Your content */}
  </div>
</div>
```

### Card Component
```tsx
<div className="card p-6">
  <h2 className="decorative-heading text-2xl text-text-primary-alt mb-4">
    Card Title
  </h2>
  <p className="text-text-secondary">Card content</p>
  <button className="btn-primary mt-4">
    Action Button
  </button>
</div>
```

### Important Numbers Display
```tsx
<span className="text-important text-2xl font-bold">
  {points}
</span>
```

### Gradient Elements
```tsx
<div className="bg-gradient-primary p-6 rounded-lg text-white">
  Leaderboard content
</div>
```

## Best Practices

1. **Always use the container-custom class** for main content areas
2. **Stick to the defined color palette** - avoid custom colors
3. **Use decorative-heading class** for main headings in popups
4. **Implement proper hover states** for interactive elements
5. **Maintain consistent spacing** using Tailwind's spacing scale
6. **Use semantic color classes** (text-important for key numbers)
7. **Apply focus states** for accessibility
8. **Keep maximum width at 1080px** for all containers

## File Structure
```
src/
├── index.css          # Tailwind directives and base styles
├── utilities.css      # Custom utility classes
├── App.tsx           # Main app component with examples
└── components/       # Reusable components
```

## Development Notes
- The design system is built with mobile-first responsive design
- All colors are defined in the Tailwind config for consistency
- Custom utility classes are available in utilities.css
- Font loading is optimized with preconnect headers
- The system supports both light theme (current) and can be extended for dark theme

// TASK: Set up TailwindCSS to allow dynamic primary color based on user input.
// Default primary color is #E53E3E, but users can change it via UI (e.g., color picker).
// We want to update the theme color across the whole app dynamically.

// 1. In tailwind.config.js, define primary color using a CSS variable:
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)', // dynamic primary color
      },
    },
  },
  // other Tailwind settings...
};

// 2. In global CSS (e.g., index.css or App.css), set the initial value for the variable:
:root {
  --color-primary: #E53E3E; /* default primary color */
}

// 3. In React, create a ThemeContext to allow changing the primary color at runtime
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState('#E53E3E');

  // Load color from localStorage on initial render
  useEffect(() => {
    const storedColor = localStorage.getItem('primaryColor');
    if (storedColor) setPrimaryColor(storedColor);
  }, []);

  // Apply the color to the root element when it changes
  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', primaryColor);
    localStorage.setItem('primaryColor', primaryColor);
  }, [primaryColor]);

  return (
    <ThemeContext.Provider value={{ primaryColor, setPrimaryColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Wrap your <App /> component with <ThemeProvider /> in main.jsx or index.js

// 5. Use the primary color class in your components like this:
<button className="bg-primary text-white p-2 rounded">
  Dynamic Theme Button
</button>

// 6. In any component, use useContext to access and update the primary color:
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeSwitcher = () => {
  const { primaryColor, setPrimaryColor } = useContext(ThemeContext);

  return (
    <input
      type="color"
      value={primaryColor}
      onChange={(e) => setPrimaryColor(e.target.value)}
    />
  );
};