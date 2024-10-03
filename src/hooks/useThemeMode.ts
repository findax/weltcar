import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export const useThemeMode = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isDarkMode =
    theme === 'system' ? systemTheme === 'dark' : theme === 'dark';

  return { isDarkMode, toggleTheme, mounted };
};
