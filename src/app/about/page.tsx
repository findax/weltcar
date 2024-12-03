'use client'

import { Metadata } from 'next';
import SectionHero from './(components)/SectionHero';
import SectionStatistic from './(components)/SectionStatistic';
import SectionOurTeam from './(components)/SectionOurTeam';
import SectionClientSay from '@/components/SectionClientSay';
import SectionSubscribe from '@/components/SectionSubscribe';
import Image from 'next/image';
import carsBackgroundDarkImg from '@/images/car-dark.png'
import carsBackgroundLightImg from '@/images/car-light.png'
import { useThemeMode } from '@/hooks/useThemeMode';
import triangleBackgroundImg from '@/images/bg-figures/triangle-1.png'
import triangleBackgroundImgTwo from '@/images/bg-figures/triangle-2.png'
import triangleBackgroundImgThird from '@/images/bg-figures/triangle-3.png'
import BackgroundShaadowSection from '@/components/BackgroundShaadowSection';
import { useEffect } from 'react';
import SectionOurPartners from '@/components/SectionOurPartners';

const metadata: Metadata = {
  title: 'About Us | Elite Car Sales & Global Delivery | Luxury Vehicles Worldwide | WeltCar',
  description:
    'Learn more about our commitment to providing the finest luxury cars with exceptional global delivery services. Discover our mission, values, and why we are the preferred choice for elite vehicles worldwide.',
};

const PageAbout = () => {
  const { isDarkMode, mounted } = useThemeMode();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!mounted) return null;
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}

      <Image 
        src={triangleBackgroundImg} 
        alt='triangle background'
        className='absolute top-[11%] -left-[5px] -z-10'
      />
      {/* <Image 
        src={triangleBackgroundImgTwo} 
        alt='triangle background'
        className='hidden lg:block absolute top-[28%] -right-[5px] -z-10'
      /> */}
      <Image 
        src={triangleBackgroundImgThird} 
        alt='triangle background'
        className='absolute rotate-3 bottom-[3%] sm:-bottom-[7%] -left-[22px] -z-10'
      />
      <BackgroundShaadowSection 
        className='bg-[#DFE172] opacity-[0.30] -left-[350px] top-[3%] lg:top-[4%]' 
      />
      <BackgroundShaadowSection 
        className='hidden lg:block bg-[#00668451] dark:bg-[#123D4A] dark:opacity-[10] -right-[315px] top-[13%]' 
      />
      <BackgroundShaadowSection 
        className='bg-[#00668451] dark:bg-[#123D4A] dark:opacity-[10] -left-[260px] bottom-[27%] lg:left-[25px] lg:bottom-[42%]' 
      />
      <BackgroundShaadowSection 
        className='bg-[#DFE172] opacity-[0.30] -right-[80%] -bottom-[2%] md:-right-[15%] md:bottom-[2%] lg:-right-[145px] lg:bottom-[6%]' 
      />

      <div className='container my-12 xl:my-20 '>
        <SectionHero />
        <SectionStatistic />

        <div className='relative mt-44'>
          <SectionOurTeam />
        </div>

        {/* <div className='relative mt-44'>
          <SectionClientSay />
        </div> */}

        <div className='relative mt-44'>
          <SectionOurPartners />
        </div>

        <div className='relative mt-44'>
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

export default PageAbout;
