'use client';

import { getAuth } from '@/api/apiInstance';
import { Nav } from './(components)/Nav';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { NavigationRoutes } from '@/types/navigation';
import Image from 'next/image';
import accountImg from '@/images/car-5.png'
import accountImgLight from '@/images/car-5-light.png'
import passwordImg from '@/images/car-6.png'
import passwordImgLight from '@/images/car-6-light.png'
import { useThemeMode } from '@/hooks/useThemeMode';
import triangleBackgroundImg from '@/images/bg-figures/triangle-1.png'
import triangleBackgroundImgBigger from '@/images/bg-figures/triangle-4.png'

const CommonLayout = ({ children }: { children?: React.ReactNode }) => {
  const prevScrollPos = useRef(0);
  const [isScrolled, setScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [activePage, setActivePage] = useState('');
  const isMobile = useMediaQuery(1024);
  const { isDarkMode, mounted } = useThemeMode();
  
  if (!getAuth()) {
    typeof window !== 'undefined' && (window.location.href = '/');
  }

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

  const handleSetActivePage = (pathPage: string) => {
    setActivePage(pathPage);
  }

  const renderCarImage = () => {
    switch (activePage) {
      case NavigationRoutes.Account:
        return (
          <>
            <Image
              className='absolute top-[24%] right-0'
              src={isDarkMode ? accountImg : accountImgLight}
              alt='car background'
            />
            <Image 
              src={triangleBackgroundImg} 
              alt='triangle background'
              className='absolute top-[10%] -left-[300px] -z-10 rotate-12'
            />
          </>
        )
      case NavigationRoutes.AccountPartner:
        return (
          <div className='absolute top-0 right-0'>
            <Image
              src={passwordImg}
              alt='car background'
            />
          </div>
        )
      case NavigationRoutes.Orders:
        return (
          <div className='absolute top-0 right-0'>
            <Image
              src={passwordImgLight}
              alt='car background'
            />
          </div>
        )
      case NavigationRoutes.Password:
        return (
          <>
            <Image
              className='absolute top-[16%] right-0'
              src={isDarkMode ? passwordImg : passwordImgLight}
              alt='car background'
            />
            <Image 
              src={triangleBackgroundImgBigger} 
              alt='triangle background'
              className='absolute -top-[3%] left-[0px] -z-10'
            />
          </>
        )
      case NavigationRoutes.CarSubscriptions:
        return (
          <div className='absolute top-0 right-0'>
            <Image
              src={accountImg}
              alt='car background'
            />
          </div>
        )
      default:
        return <div>Completed</div>;
    }
  };
  
  if (!mounted) return null;
  
  return (
    <div className='nc-CommonLayoutAccount'>
      <div className={`fixed inset-x-0 top-0 z-30 border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 
        ${!isHeaderVisible 
            ? 'nc-Header--hide transform -translate-y-full' 
            : 'md:top-[81px] top-[65px] transform translate-y-0'
          } 
        ${isScrolled
            ? 'shadow-md bg-opacity-90 dark:bg-opacity-90 backdrop-blur'
            : ''
        } transition-transform duration-500 ase-in-out`}>
        <Nav 
          isScrolled={isScrolled} 
          setPathPage={handleSetActivePage}
        />
      </div>
      <Suspense>
        <div className='container my-12 xl:my-20 pt-16'>{children}</div>
        {renderCarImage()}
      </Suspense>
    </div>
  );
};



export default CommonLayout;
