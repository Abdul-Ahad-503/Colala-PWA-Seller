import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ColorContextType {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  updateTheme: (color: string) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const useColor = () => {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error('useColor must be used within a ColorProvider');
  }
  return context;
};

interface ColorProviderProps {
  children: ReactNode;
}

export const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState('#E53E3E');

  // Load saved color from localStorage on initialization
  useEffect(() => {
    const savedColor = localStorage.getItem('store-primary-color');
    if (savedColor) {
      setPrimaryColor(savedColor);
      updateTheme(savedColor);
    }
  }, []);

  // Function to update CSS custom properties
  const updateTheme = (color: string) => {
    const root = document.documentElement;
    
    // Update primary color and related properties
    root.style.setProperty('--color-primary', color);
    root.style.setProperty('--color-text-important', color);
    
    // Calculate color variations
    const rgb = hexToRgb(color);
    if (rgb) {
      // Calculate hover color (darker)
      const hoverColor = `rgb(${Math.max(0, rgb.r - 20)}, ${Math.max(0, rgb.g - 20)}, ${Math.max(0, rgb.b - 20)})`;
      root.style.setProperty('--color-primary-hover', hoverColor);
      
      // Calculate light variant
      const lightColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`;
      root.style.setProperty('--color-primary-light', lightColor);
      
      // Calculate color shades for red variants
      root.style.setProperty('--color-primary-50', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05)`);
      root.style.setProperty('--color-primary-100', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`);
      root.style.setProperty('--color-primary-200', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`);
      root.style.setProperty('--color-primary-600', `rgb(${Math.max(0, rgb.r - 30)}, ${Math.max(0, rgb.g - 30)}, ${Math.max(0, rgb.b - 30)})`);
      root.style.setProperty('--color-primary-700', `rgb(${Math.max(0, rgb.r - 50)}, ${Math.max(0, rgb.g - 50)}, ${Math.max(0, rgb.b - 50)})`);
    }
    
    // Update gradient colors to match the primary color
    root.style.setProperty('--color-gradient-start', color);
    
    // Create darker shade for gradient end
    if (rgb) {
      const darkerColor = `rgb(${Math.max(0, rgb.r - 40)}, ${Math.max(0, rgb.g - 40)}, ${Math.max(0, rgb.b - 40)})`;
      root.style.setProperty('--color-gradient-end', darkerColor);
    }
    
    // Save to localStorage
    localStorage.setItem('store-primary-color', color);
    
    // Update state
    setPrimaryColor(color);
  };

  // Helper function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const value = {
    primaryColor,
    setPrimaryColor,
    updateTheme,
  };

  return (
    <ColorContext.Provider value={value}>
      {children}
    </ColorContext.Provider>
  );
};
