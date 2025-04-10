'use client'

import Image from 'next/image';
import { Metadata } from 'next';
import { useThemeMode } from '@/hooks/useThemeMode';
import carsBackgroundDarkImg from '@/images/car-dark.png'
import carsBackgroundLightImg from '@/images/car-light.png'
import triangleBackgroundImgThird from '@/images/bg-figures/triangle-3.png'
import BackgroundShaadowSection from '@/components/BackgroundShaadowSection';
import FindCarHero from './(components)/FindCarHero';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';


const metadata: Metadata = {
  title: 'Find Your Car | Elite Car Sales & Global Delivery | Luxury Vehicles Worldwide | WeltCar',
  description:
    'Get in touch with us for inquiries about our luxury cars and global delivery services. Contact our team for assistance with purchasing elite vehicles and delivery to countries like Germany, Switzerland, Dubai, and China.',
};

const PageFindCar = () => {
  const { isDarkMode, mounted } = useThemeMode();
  const translate = useTranslations();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className={`nc-PageFindCar relative overflow-hidden`}>
      <Image 
        src={triangleBackgroundImgThird} 
        alt='triangle background'
        className='absolute rotate-3 bottom-[13%] -left-[8px] lg:bottom-[20%] lg:-left-[22px] -z-10'
      />
      <BackgroundShaadowSection 
        className='lg:block bg-[#00668451] dark:bg-[#123D4A] dark:opacity-[10] -right-[440px] lg:-right-[315px] top-[8%]' 
      />
      <BackgroundShaadowSection 
        className='hidden lg:block bg-[#DFE172] opacity-[0.30] lg:-right-[145px] lg:bottom-[20%]' 
      />

      <div className='container mt-12 mb-28 xl:mt-16 xl:mb-32'>
        <FindCarHero translate={translate} />
      </div>

      <div className='hidden relative sm:bottom-0 sm:h-full -bottom-[30px] h-72 justify-center w-full md:pt-12 xl:pt-0'>
        <Image 
          src={isDarkMode ? carsBackgroundDarkImg : carsBackgroundLightImg } 
          alt='cars image'
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  );
};

export default PageFindCar;