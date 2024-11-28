'use client'

import Image from 'next/image';
import { Metadata } from 'next';
import ContactHero from './(components)/ContactHero';
import SectionSubscribe from '@/components/SectionSubscribe';
import { useThemeMode } from '@/hooks/useThemeMode';
import carsBackgroundDarkImg from '@/images/car-dark.png'
import carsBackgroundLightImg from '@/images/car-light.png'
import triangleBackgroundImgThird from '@/images/bg-figures/triangle-3.png'
import BackgroundShaadowSection from '@/components/BackgroundShaadowSection';
import { useEffect } from 'react';


const metadata: Metadata = {
  title: 'Contact | Elite Car Sales & Global Delivery | Luxury Vehicles Worldwide | WeltCar',
  description:
    'Get in touch with us for inquiries about our luxury cars and global delivery services. Contact our team for assistance with purchasing elite vehicles and delivery to countries like Germany, Switzerland, Dubai, and China.',
};

const PageContact = () => {
  const { isDarkMode, mounted } = useThemeMode();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className={`nc-PageContact relative overflow-hidden`}>
      <Image 
        src={triangleBackgroundImgThird} 
        alt='triangle background'
        className='absolute rotate-2 bottom-[3%] sm:-bottom-[8%] -left-[22px] -z-10'
      />
      <BackgroundShaadowSection 
        className='bg-[#5046E5] -right-[330px] top-[4%] lg:top-[1%]' 
      />
      <BackgroundShaadowSection 
        className='bg-[#DFE172] -right-[300px] -bottom-[3%] lg:-right-[100px] lg:bottom-[8%]' 
      />
      <div className='container my-12 xl:my-20 space-y-16 xl:space-y-28'>
        <ContactHero />

        <div className='relative pt-16 mb-24 lg:md-32'>
          <SectionSubscribe />
        </div>
      </div>
      <div className='flex relative sm:bottom-0 sm:h-full -bottom-[30px] h-72 justify-center w-full'>
        <Image 
          src={isDarkMode ? carsBackgroundDarkImg : carsBackgroundLightImg } 
          alt='cars image'
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  );
};

export default PageContact;
