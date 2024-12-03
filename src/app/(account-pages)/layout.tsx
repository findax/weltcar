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
import orderImg from '@/images/car-7.png'
import carSubscriptionsImg from '@/images/car-8.png'
import { useThemeMode } from '@/hooks/useThemeMode';
import triangleBackgroundImg from '@/images/bg-figures/triangle-1.png'
import triangleBackgroundImgFive from '@/images/bg-figures/triangle-5.png'
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
            <div className='absolute w-full lg-w-auto bottom-[0%] left-0 h-[400px] lg:h-fit lg:bottom-auto lg:w-7/12 lg:left-auto lg:top-[32%] lg:right-0 xl:top-[10%] xl:w-[1000px]'>
              <Image
                className='object-cover w-full h-full'
                src={isDarkMode ? accountImg : accountImgLight}
                alt='car background'
              />
            </div>
            <Image 
              src={triangleBackgroundImg} 
              alt='triangle background'
              className='absolute top-[10%] -left-[82px] lg:-left-[300px] -z-10 rotate-12'
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
          <>
            <div className='absolute h-[160px] bottom-[4%] right-[0%] xsS:right-auto xsS:left-[25%] md:h-[210px] md:-bottom-[2%] lg:h-auto lg:left-auto lg:-bottom-[1%] lg:right-0 xl:-bottom-[12%]'>
              <Image
                className='h-full object-cover object-left'
                src={orderImg}
                alt='car background'
              />
            </div>
            <Image 
                src={triangleBackgroundImgBigger} 
                alt='triangle background'
                className='absolute -top-[6%] left-[0] -z-10'
            />
          </>
        )
      case NavigationRoutes.Password:
        return (
          <>
            <div className='absolute lg-w-auto bottom-[0%] -left-[30%] xsS:right-0 xsS:left-auto xsS:w-full h-[400px] lg:h-fit lg:bottom-auto lg:w-7/12 lg:left-auto lg:top-[32%] lg:right-0 xl:top-[10%] xl:w-[1000px]'>
              <Image
                className='object-cover w-full h-full'
                src={isDarkMode ? passwordImg : passwordImgLight}
                alt='car background'
              />
            </div>
            <Image 
              className='absolute -top-[28%] left-[0px] -z-10'
              src={triangleBackgroundImgBigger} 
              alt='triangle background'
            />
          </>
        )
      case NavigationRoutes.CarSubscriptions:
        return (
          <>
            <div className='mt-auto w-full h-[20vh] lg:h-[30vh]'>
              <Image
                className='h-full w-full object-cover'
                src={carSubscriptionsImg}
                alt='car background'
              />
            </div>
            <Image
              className='absolute top-[1%] w-full lg:w-1/2 right-0 -z-10 h-auto'
              src={triangleBackgroundImgFive}
              alt='triangle background'
            />
          </>
        )
    }
  };
  
  if (!mounted) return null;
  
  return (
    <div className='relative nc-CommonLayoutAccount'>
      <div className={`fixed inset-x-0 top-0 z-20  bg-white dark:bg-neutral-950 
        ${!isHeaderVisible 
            ? 'nc-Header--hide transform -translate-y-full' 
            : 'md:top-[80px] top-[64px] transform translate-y-0'
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
        <div className={ `
          container my-12 xl:my-20 pt-16
          ${NavigationRoutes.Password === activePage ? 'xl:mt-20 xl:mb-32' : ''}
          ${NavigationRoutes.Orders === activePage ? 'xl:mt-20 xl:mb-40' : ''}

        `}>{children}</div>
        {renderCarImage()}
      </Suspense>
    </div>
  );
};



export default CommonLayout;
