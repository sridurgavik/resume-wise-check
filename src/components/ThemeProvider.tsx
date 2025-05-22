
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

type ThemeProviderContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'greecodeats_theme_preference';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Try to get the theme from localStorage first
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
        return savedTheme;
      }
    }
    
    // Default to light theme
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Save theme preference to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
