'use client';

import React, { FC, useEffect, useState } from 'react';
import Logo from '@/shared/Logo';
import Navigation from '@/shared/Navigation/Navigation';
import SearchDropdown from './SearchDropdown';
import ButtonPrimary from '@/shared/ButtonPrimary';
import MenuBar from '@/shared/MenuBar';
import SwitchDarkMode from '@/shared/SwitchDarkMode';
import LangDropdown from './LangDropdown';
import { useThemeMode } from '@/utils/useThemeMode';
import AvatarDropdown from './AvatarDropdown';
import NavbarMobile from '@/components/NavbarMobile';
import { HeartIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  //
  useThemeMode();
  //

  useEffect(() => {
    document.addEventListener('scroll', () => {
      window.scrollY > 20 ? setScrolled(true) : setScrolled(false);
    });
  }, []);

  return (
    <header
      className={`z-30 sticky hidden md:block top-0 bg-white dark:bg-neutral-900 shadow-sm dark:border-b dark:border-neutral-700 ${
        scrolled && 'z-50 shadow-md bg-opacity-80 backdrop-blur'
      } duration-300`}
    >
      <div className='px-4 lg:container h-20 relative flex justify-between'>
        <div className='hidden md:flex justify-start flex-1 space-x-4 sm:space-x-10'>
          <Logo className='w-60' />

          <Navigation />
        </div>

        <div className='hidden md:flex flex-shrink-0 justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100'>
          <div className='hidden xl:flex space-x-0.5'>
            {/* <SearchDropdown className='flex items-center' /> */}
            {/* <LangDropdown /> */}
            <SwitchDarkMode />
            {/* <button
              onClick={goToFavorite()}
              className={`self-center text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center`}
            >
              <span className='sr-only'>Enable dark mode</span>
              <HeartIcon className='w-7 h-7' />
            </button> */}
            <AvatarDropdown />
          </div>

          <div className='flex xl:hidden items-center'>
            <SwitchDarkMode />
            <div className='px-0.5' />
            <MenuBar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
