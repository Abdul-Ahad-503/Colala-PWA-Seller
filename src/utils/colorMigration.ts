/**
 * Color Migration Utility
 * This file contains utilities and instructions for migrating hardcoded colors
 * to use the dynamic color system throughout the project.
 */

// Common color replacements that should be made across the project:

export const COLOR_REPLACEMENTS = {
  // Background colors
  'bg-[#E53E3E]': 'bg-primary',
  'hover:bg-red-600': 'hover:bg-primary-hover',
  'hover:bg-red-700': 'hover:bg-primary-hover',
  'bg-red-500': 'bg-primary',
  'bg-red-50': 'bg-red-50', // This now uses CSS custom property
  'bg-red-100': 'bg-red-100', // This now uses CSS custom property
  'bg-red-200': 'bg-red-200', // This now uses CSS custom property
  
  // Text colors
  'text-[#E53E3E]': 'text-primary',
  'text-red-500': 'text-primary',
  'text-red-600': 'text-red-600', // This now uses CSS custom property
  'text-red-700': 'text-red-700', // This now uses CSS custom property
  
  // Border colors
  'border-[#E53E3E]': 'border-primary',
  'border-red-500': 'border-primary',
  'border-red-600': 'border-red-600', // This now uses CSS custom property
  
  // SVG fills (for manual replacement in code)
  'fill="#E53E3E"': 'fill={colors.getSVGFill()}', // Requires importing useDynamicColors hook
  
  // Style objects (for manual replacement in inline styles)
  "backgroundColor: '#E53E3E'": 'backgroundColor: colors.primaryColor',
  "color: '#E53E3E'": 'color: colors.primaryColor',
};

// Instructions for manual updates:

export const MANUAL_UPDATE_INSTRUCTIONS = `
1. For components using hardcoded colors:
   - Import: import { useDynamicColors } from '../../hooks/useDynamicColors';
   - Add hook: const colors = useDynamicColors();
   - Replace hardcoded values with dynamic ones

2. Common patterns:
   - Button styling: Use 'bg-primary hover:bg-primary-hover'
   - Text colors: Use 'text-primary' for primary color text
   - SVG fills: Use fill={colors.getSVGFill()}
   - Inline styles: Use colors.getPrimaryBg(), colors.getPrimaryText(), etc.

3. Files that need manual updates (examples shown in this implementation):
   - src/pages/settings/Reviews.tsx ✓ (partially updated)
   - src/pages/settings/SavedCards.tsx ✓ (partially updated)
   - src/pages/settings/ShoppingWallet.tsx (needs: hover:bg-red-600 → hover:bg-primary-hover)
   - src/pages/settings/Referrals.tsx (needs: multiple instances)
   - src/pages/settings/Support.tsx (needs: multiple instances)
   - src/pages/ProductDetails/index.tsx (needs: multiple instances)
   - src/pages/ServiceDetails/index.tsx (needs: multiple instances)
   - All other files with hardcoded #E53E3E or red-* classes

4. CSS Custom Properties available:
   - --color-primary: Main brand color
   - --color-primary-hover: Darker shade for hover states
   - --color-primary-light: Light shade for backgrounds
   - --color-primary-50 to --color-primary-700: Various shades
`;

// Helper function to get all available color utilities
export const getColorUtilities = () => {
  return {
    classes: {
      primary: 'bg-primary text-white hover:bg-primary-hover',
      primaryOutline: 'border-primary text-primary bg-transparent hover:bg-primary-light',
      primaryText: 'text-primary',
      primaryBorder: 'border-primary',
    },
    
    // For use with useDynamicColors hook
    dynamicStyles: {
      primaryButton: 'colors.getButtonStyle()',
      primaryText: 'colors.getPrimaryText()',
      primaryBorder: 'colors.getPrimaryBorder()',
      svgFill: 'colors.getSVGFill()',
    }
  };
};

export default COLOR_REPLACEMENTS;
