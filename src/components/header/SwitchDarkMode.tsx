'use client';

import React from 'react';
import { MoonIcon } from '@heroicons/react/24/solid';
import { SunIcon } from '@heroicons/react/24/outline';
import { useThemeMode } from '@/hooks/useThemeMode';
export interface SwitchDarkModeProps {
  className?: string;
}
const SwitchDarkMode: React.FC<SwitchDarkModeProps> = ({ className = '' }) => {
  const { _toogleDarkMode, isDarkMode, toDark, toLight } = useThemeMode();

  return (
    <button
      onClick={_toogleDarkMode}
      className={`self-center w-10 h-10 md:w-12 md:h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center ${className}`}
    >
      <span className='sr-only'>Enable dark mode</span>
      {isDarkMode ? (
        <MoonIcon className='w-5 h-5 md:w-7 md:h-7' aria-hidden='true' />
      ) : (
        <SunIcon className='w-5 h-5 md:w-7 md:h-7' aria-hidden='true' />
      )}
    </button>
  );
};

export default SwitchDarkMode;
