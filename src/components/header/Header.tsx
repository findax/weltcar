'use client';

import { useEffect, useState, useRef } from 'react';
import Logo from '@/shared/Logo';
import Navigation from '@/shared/Navigation/Navigation';
import SearchDropdown from './SearchDropdown';
import MenuBar from '@/shared/MenuBar';
import SwitchDarkMode from '@/shared/SwitchDarkMode';
import LangDropdown from './LangDropdown';
import { useThemeMode } from '@/utils/useThemeMode';
import AvatarDropdown from './AvatarDropdown';
import { HeartIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/outline';
import isInViewport from '@/utils/isInViewport';
import Modal from '@/shared/Modal';
import Authorization from '@/components/authorization/Authorization';

let WIN_PREV_POSITION = 0;
if (typeof window !== 'undefined') {
  WIN_PREV_POSITION = window.pageYOffset;
}

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  //
  useThemeMode();
  //
  const containerRef = useRef<HTMLDivElement>(null);
  const ww = typeof window !== 'undefined' && window.innerWidth < 768;
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleClick() {
    setIsModalOpen(true);
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && ww) {
      window.addEventListener('scroll', handleEvent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEvent = () => {
    if (typeof window !== 'undefined' && ww) {
      window.requestAnimationFrame(showHideHeaderMenu);
    }
  };

  const showHideHeaderMenu = () => {
    // if (typeof window === "undefined" || window?.innerWidth >= 768) {
    //   return null;
    // }

    let currentScrollPos = window.pageYOffset;
    if (!containerRef.current) return;

    // SHOW _ HIDE MAIN MENU
    if (currentScrollPos > WIN_PREV_POSITION) {
      if (
        isInViewport(containerRef.current) &&
        currentScrollPos - WIN_PREV_POSITION < 80
      ) {
        return;
      }

      containerRef.current.classList.add('nc-Header--hide');
    } else {
      if (
        !isInViewport(containerRef.current) &&
        WIN_PREV_POSITION - currentScrollPos < 80
      ) {
        return;
      }
      containerRef.current.classList.remove('nc-Header--hide');
    }

    WIN_PREV_POSITION = currentScrollPos;
  };

  useEffect(() => {
    document.addEventListener('scroll', () => {
      window.scrollY > 20 ? setScrolled(true) : setScrolled(false);
    });
  }, []);

  return (
    <>
      <header
        ref={containerRef}
        className={`bg-white dark:bg-neutral-900 fixed top-0 inset-x-0 z-30 shadow-sm dark:border-b dark:border-neutral-700
      transition-transform ${
        scrolled
          ? 'shadow-md bg-opacity-90 dark:bg-opacity-90 backdrop-blur'
          : ''
      } duration-300 ease-in-out`}
      >
        <div className='px-4 lg:container h-16 md:h-20 relative flex justify-between'>
          <div className='flex justify-start flex-1 space-x-4 sm:space-x-10'>
            <Logo className='w-40 md:w-60' />

            <Navigation />
          </div>

          <div className='flex flex-shrink-0 justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100 space-x-0.5'>
            {/* <SearchDropdown className='flex items-center' /> */}
            {/* <LangDropdown /> */}
            <SwitchDarkMode />
            {/* <button
              className={`self-center text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center`}
            >
              <span className='sr-only'>Enable dark mode</span>
              <HeartIcon className='w-5 h-5 md:w-7 md:h-7' />
            </button> */}
            {/* <AvatarDropdown /> */}
            <button
              className={`self-center w-10 h-10 md:w-12 md:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center`}
              type='button'
              onClick={handleClick}
            >
              <UserIcon className='w-5 h-5 md:w-7 md:h-7' />
            </button>
            <div className='px-0.5' />
            <MenuBar />
          </div>
        </div>
      </header>

      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Authorization />
      </Modal>
    </>
  );
};

export default Header;
