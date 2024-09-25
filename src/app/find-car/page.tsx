'use client'

import Image from 'next/image';
import { Metadata } from 'next';
// import ContactHero from './(components)/ContactHero';
import SectionSubscribe from '@/components/SectionSubscribe';
import { useThemeMode } from '@/hooks/useThemeMode';
import carsBackgroundDarkImg from '@/images/car-dark-1.png'
import carsBackgroundLightImg from '@/images/car-dark-2.png'
import triangleBackgroundImgThird from '@/images/bg-figures/triangle-3.png'
import BackgroundShaadowSection from '@/components/BackgroundShaadowSection';
import FindCarForm from './(components)/FindCarForm';
import FindCarHero from './(components)/FindCarHero';


const metadata: Metadata = {
  title: 'Contact Us | Elite Car Sales & Global Delivery Inquiries | WeltCar',
  description:
    'Get in touch with us for inquiries about our luxury cars and global delivery services. Contact our team for assistance with purchasing elite vehicles and delivery to countries like Germany, Switzerland, Dubai, and China.',
};

const PageFindCar = () => {
  const { isDarkMode, mounted } = useThemeMode();

  if (!mounted) return null;
  
  return (
    <div className={`nc-PageFindCar relative overflow-hidden`}>
      <Image 
        src={triangleBackgroundImgThird} 
        alt='triangle background'
        className='absolute rotate-3 bottom-[13%] -left-[8px] lg:bottom-[20%] lg:-left-[22px] -z-10'
      />
      <BackgroundShaadowSection 
        className='lg:block bg-[#5046E5] -right-[315px] top-[8%]' 
      />
      <BackgroundShaadowSection 
        className='bottom-[20%] -right-[45%] sm:bottom-[10%] bg-[#DFE172] lg:-right-[145px] lg:bottom-[20%]' 
      />

      <div className='container my-12 xl:my-20'>
        <FindCarHero />
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

export default PageFindCar;