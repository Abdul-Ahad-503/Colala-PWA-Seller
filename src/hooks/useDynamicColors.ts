import { useColor } from '../contexts/ColorContext';

export const useDynamicColors = () => {
  const { primaryColor } = useColor();

  return {
    primaryColor,
    
    // Helper functions for common color patterns
    getPrimaryBg: () => ({ backgroundColor: primaryColor }),
    
    getPrimaryText: () => ({ color: primaryColor }),
    
    getPrimaryBorder: () => ({ borderColor: primaryColor }),
    
    getPrimaryRing: () => ({ '--tw-ring-color': primaryColor } as React.CSSProperties),
    
    getPrimaryLight: (opacity = 0.1) => ({ 
      backgroundColor: primaryColor + Math.round(opacity * 255).toString(16).padStart(2, '0') 
    }),
    
    // Combined styles for common use cases
    getFocusRing: () => ({ '--tw-ring-color': primaryColor } as React.CSSProperties),
    
    getButtonStyle: () => ({ 
      backgroundColor: primaryColor,
      color: 'white'
    }),
    
    getHoverButtonStyle: () => ({ 
      backgroundColor: `var(--color-primary-hover)`,
      color: 'white'
    }),
    
    getToggleStyle: (isActive: boolean) => ({
      backgroundColor: isActive ? primaryColor : '#d1d5db'
    }),
    
    getCategoryStyle: () => ({
      backgroundColor: primaryColor + '20',
      color: primaryColor
    }),

    // SVG fill color
    getSVGFill: () => primaryColor,
    
    // CSS classes for common patterns
    getPrimaryClasses: () => 'bg-primary text-white hover:bg-primary-hover',
    getOutlineClasses: () => 'border-primary text-primary bg-transparent hover:bg-primary-light',
    getTextClasses: () => 'text-primary'
  };
};
