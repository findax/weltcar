'use client';

import { getAuth } from '@/api/apiInstance';
import { Nav } from './(components)/Nav';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const CommonLayout = ({ children }: { children?: React.ReactNode }) => {
  const prevScrollPos = useRef(0);
  const [isScrolled, setScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const isMobile = useMediaQuery(1024);

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
        <Nav isScrolled={isScrolled} />
      </div>
      <Suspense>
        <div className='container my-12 xl:my-14 pt-16'>{children}</div>
      </Suspense>
    </div>
  );
};



export default CommonLayout;
