import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export const useThemeMode = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isDarkMode = theme === 'dark';

  return { isDarkMode, toggleTheme };
};
