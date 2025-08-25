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
    
    // Update CSS custom properties
    root.style.setProperty('--color-primary', color);
    root.style.setProperty('--color-text-important', color);
    
    // Update Tailwind CSS variables if needed
    root.style.setProperty('--tw-color-primary', color);
    
    // Save to localStorage
    localStorage.setItem('store-primary-color', color);
    
    // Update state
    setPrimaryColor(color);
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
