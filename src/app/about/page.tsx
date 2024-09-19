'use client'

import { Metadata } from 'next';
import SectionHero from './(components)/SectionHero';
import SectionStatistic from './(components)/SectionStatistic';
import SectionOurTeam from './(components)/SectionOurTeam';
import SectionClientSay from '@/components/SectionClientSay';
import SectionSubscribe from '@/components/SectionSubscribe';
import Image from 'next/image';
import carsBackgroundDarkImg from '@/images/car-dark-1.png'
import carsBackgroundLightImg from '@/images/car-dark-2.png'
import { useThemeMode } from '@/hooks/useThemeMode';
import triangleBackgroundImg from '@/images/bg-figures/triangle-1.png'
import triangleBackgroundImgTwo from '@/images/bg-figures/triangle-2.png'
import triangleBackgroundImgThird from '@/images/bg-figures/triangle-3.png'
import BackgroundShaadowSection from '@/components/BackgroundShaadowSection';

const metadata: Metadata = {
  title: 'About Us | Elite Car Sales & Global Delivery Services | WeltCar',
  description:
    'Learn more about our commitment to providing the finest luxury cars with exceptional global delivery services. Discover our mission, values, and why we are the preferred choice for elite vehicles worldwide.',
};

const PageAbout = () => {
  const { isDarkMode, mounted } = useThemeMode();

  if (!mounted) return null;

  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}

      <Image 
        src={triangleBackgroundImg} 
        alt='triangle background'
        className='absolute top-[11%] -left-[5px] -z-10'
      />
      <Image 
        src={triangleBackgroundImgTwo} 
        alt='triangle background'
        className='absolute top-[28%] -right-[5px] -z-10'
      />
      <Image 
        src={triangleBackgroundImgThird} 
        alt='triangle background'
        className='absolute rotate-3 -bottom-[14%] -left-[22px] -z-10'
      />
      <BackgroundShaadowSection 
        className='bg-[#DFE172] -left-[350px] top-[4%]' 
      />
      <BackgroundShaadowSection 
        className='bg-[#5046E5] -right-[315px] top-[13%]' 
      />
      <BackgroundShaadowSection 
        className='bg-[#5046E5] left-[25px] bottom-[42%]' 
      />
      <BackgroundShaadowSection 
        className='bg-[#DFE172] -right-[145px] bottom-[6%]' 
      />

      <div className='container my-12 xl:my-20 '>
        <SectionHero />
        <SectionStatistic />

        <div className='relative mt-44'>
          <SectionOurTeam />
        </div>

        <div className='relative mt-44'>
          <SectionClientSay />
        </div>

        <div className='relative mt-44'>
          <SectionSubscribe />
        </div>
      </div>
      <div className='flex justify-center w-full'>
        <Image 
          src={isDarkMode ? carsBackgroundDarkImg : carsBackgroundLightImg} 
          alt='cars image'
          className='w-full'
        />
      </div>
    </div>
  );
};

export default PageAbout;
