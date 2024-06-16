'use client';

import { useEffect, useState, useRef } from 'react';
import SearchDropdown from './SearchDropdown';
import MenuMobile from './MenuMobile';
import SwitchDarkMode from './SwitchDarkMode';
import LangDropdown from './LangDropdown';
import AvatarDropdown from './AvatarDropdown';
import Logo from '@/shared/Logo';
import Navigation from '@/shared/Navigation/Navigation';
import Modal from '@/shared/Modal';
import Authorization from '@/components/authorization/Authorization';
import { HeartIcon, UserIcon } from '@heroicons/react/24/outline';
import { useThemeMode } from '@/utils/useThemeMode';
import { ToastContainer } from 'react-toastify';
import { getUser } from '@/api/user';

const Header = () => {
  const prevScrollPos = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  //
  useThemeMode();
  //

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () =>
      window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    function handleScroll() {
      const currentScrollPos = window.pageYOffset;
      const isHeaderVisible =
        currentScrollPos > 60 ? prevScrollPos.current > currentScrollPos : true;

      prevScrollPos.current = currentScrollPos;
      setIsHeaderVisible(isHeaderVisible);
    }

    isMobile
      ? window.addEventListener('scroll', handleScroll)
      : setIsHeaderVisible(true);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      window.scrollY > 20 ? setScrolled(true) : setScrolled(false);
    });
  }, []);

  useEffect(() => {
    if (user) return;
    setUser(getUser());
  }, [isModalOpen]);

  function handleClick() {
    const user = getUser();
    user ? setUser(user) : setIsModalOpen(true);
  }

  return (
    <>
      <header
        className={`bg-white dark:bg-neutral-900 shadow-sm fixed top-0 inset-x-0 z-30 dark:border-b dark:border-neutral-700 ${!isHeaderVisible ? 'nc-Header--hide' : ''} ${
          scrolled
            ? 'shadow-md bg-opacity-90 dark:bg-opacity-90 backdrop-blur'
            : ''
        } transition-transform duration-300 ease-in-out`}
      >
        <div className='px-4 h-16 md:h-20 lg:container relative flex justify-between'>
          <div className='flex justify-start flex-1 space-x-4 sm:space-x-10'>
            <Logo className='self-center w-40 md:w-52' />

            <Navigation />
          </div>

          <div className='flex flex-shrink-0 justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100 space-x-0.5'>
            {/* <SearchDropdown className='flex items-center' /> */}
            {/* <LangDropdown /> */}
            <SwitchDarkMode />
            {/* <Link href='/favorites'
              className={`self-center text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center`}
            >
              <span className='sr-only'>Go to Favorites</span>
              <HeartIcon className='w-5 md:w-7' />
            </Link> */}
            {user ? (
              <AvatarDropdown userData={user} />
            ) : (
              <button
                className={`self-center w-10 h-10 md:w-12 md:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center`}
                type='button'
                onClick={handleClick}
              >
                <UserIcon className='w-5 md:w-7' />
              </button>
            )}
            <div className='px-0.5' />
            <MenuMobile />
          </div>
        </div>
      </header>

      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Authorization setIsModalOpen={setIsModalOpen} />
      </Modal>

      <ToastContainer
        position='bottom-right'
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        theme={
          typeof localStorage !== 'undefined' ? localStorage.theme : 'light'
        }
      />
    </>
  );
};

export default Header;
