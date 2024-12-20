'use client';

import { useEffect, useState, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useThemeMode } from '@/hooks/useThemeMode';
import { HeartIcon, UserIcon } from '@heroicons/react/24/outline';
import SearchDropdown from './components/SearchDropdown';
import MenuMobile from './components/MenuMobile';
import SwitchDarkMode from './components/SwitchDarkMode';
import LangDropdown from './components/LangDropdown';
import AvatarDropdown from './components/AvatarDropdown';
import Authorization from '@/components/authorization/Authorization';
import Logo from '@/shared/Logo';
import Navigation from '@/shared/Navigation/Navigation';
import Modal from '@/shared/Modal';
import { useUserStore } from '@/stores/user-store';
import ButtonAddCar from './components/ButtonAddCar';
import { getPartner } from '@/api/partner';
import { IPartnerResponse } from '@/types/partner';
import { useTranslations } from 'next-intl';
import { LanguageSelector } from '@/shared/LanguageSelector';
import { getLanguages } from '@/api/languages';
import { LocaleData } from '@/types/languages';

const languagesData = [
  {
    locale: 'en',
    name: 'English'
  },
  {
    locale: 'de',
    name: 'Deutsch'
  },
  {
    locale: 'zh-cn',
    name: '中国人'
  },
];

const Header = () => {
  const user = useUserStore((state) => state.user);
  const { isDarkMode, mounted } = useThemeMode();
  const prevScrollPos = useRef(0);
  const isMobile = useMediaQuery(1024);
  const t = useTranslations()

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isScrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [partner, setPartner] = useState<IPartnerResponse>();
  const [languages, setLanguages] = useState<LocaleData[]>([]);

  useEffect(() => {
    useUserStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if(user?.contractor_id){
      getPartner()
        .then((data) => {
          if(data){
            setPartner(data);
          }
        })
    }
  }, [user]);

  useEffect(() => {
    const fetchLocale = async() => {
      try {
        const response = await getLanguages();
        if(response){
          setLanguages(response.data);
        }
      } catch (error) {
        setLanguages(languagesData);
      }
    }
    fetchLocale()
  }, []);

  useEffect(() => {
    function handleScroll() {
      const currentScrollPos = window.scrollY;
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

  if (!mounted) return null;

  return (
    <>
      <header
        className={`bg-white dark:bg-neutral-900 shadow-sm fixed top-0 inset-x-0 z-30 dark:border-b dark:border-neutral-700 ${!isHeaderVisible ? 'nc-Header--hide' : ''} ${
          isScrolled
            ? 'shadow-md bg-opacity-90 dark:bg-opacity-90 backdrop-blur'
            : ''
        } transition-transform duration-300 ease-in-out`}
      >
        <div className='px-4 h-16 md:h-20 lg:container relative flex justify-between'>
          <div className='flex justify-start flex-1 space-x-4 sm:space-x-10'>
            <Logo 
              className='self-center'
              isDark={isDarkMode} 
            />
          
            <Navigation translate={t}/>
          </div>

          <div className='flex mr-1'>
            <LanguageSelector 
              className='hidden lg:flex' 
              languages={languages}  
            />
          </div>

          <div className='flex flex-shrink-0 justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100 space-x-0.5'>
            {partner?.is_verified && <ButtonAddCar translate={t}/>}
            <SwitchDarkMode />
            {user ? (
              <AvatarDropdown translate={t}/>
            ) : (
              <button
                className={`self-center w-10 h-10 md:w-12 md:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center`}
                type='button'
                onClick={() => setIsModalOpen(true)}
              >
                <UserIcon className='w-5 md:w-7' />
              </button>
            )}
            <div className='px-0.5' />
            <MenuMobile 
              isDark={isDarkMode} 
              partner={partner ? partner : undefined}
              translate={t}
            />
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
        theme={isDarkMode ? 'dark' : 'light'}
      />
    </>
  );
};

export default Header;
