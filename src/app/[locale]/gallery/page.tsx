'use client'

import { Metadata } from 'next';
import Image from 'next/image';
import carsBackgroundDarkImg from '@/images/car-dark.png'
import carsBackgroundLightImg from '@/images/car-light.png'
import { useThemeMode } from '@/hooks/useThemeMode';
import { Suspense, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Breadcrumbs from '@/components/Breadcrumbs';
import GalleryCatalog from './(components)/GalleryCatalog';

const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Gallery',
};

const galleryPages = [
  {
    pageName: 'gallery.breadcrump.main',
    pageHref: '/'
  },
  {
    pageName: 'gallery.breadcrump.gallery',
    pageHref: '/gallery'
  }
];

const PageGallery = () => {
  const { isDarkMode, mounted } = useThemeMode();
  const translate = useTranslations();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!mounted) return null;
  return (
    <div className={`nc-PageGallery overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}

      <div className='container mt-8 mb-44'>
        <div className="space-y-6">
          <Breadcrumbs 
            pages={galleryPages}
          />
          <h1 className='text-neutral-1050 dark:text-white font-bold text-3xl md:text-4xl xl:text-5xl'>
            {translate('gallery.title.gallery')}
          </h1>
        </div>

        <div className='relative pb-20 py-12'>
          <Suspense>
            <GalleryCatalog />
          </Suspense>
        </div>
      </div>

      <div className='hidden relative sm:bottom-0 sm:h-full -bottom-[30px] h-72 justify-center w-full'>
        <Image 
          src={isDarkMode ? carsBackgroundDarkImg : carsBackgroundLightImg } 
          alt='cars image'
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  );
};

export default PageGallery;
