'use client'

import { Metadata } from 'next/types';
import SectionHero from '@/components/SectionHero';
import BgGlassmorphism from '@/components/BgGlassmorphism';
import SectionHowItWork from '@/components/SectionHowItWork';
import SectionSubscribe from '@/components/SectionSubscribe';
import SectionWhyChooseUs from '@/components/SectionWhyChooseUs';
import SectionVideos from '@/components/SectionVideos';
import SectionClientSay from '@/components/SectionClientSay';
import Image from 'next/image';
import carImg from '@/images/car-2.png';
import carsBackgroundDarkImg from '@/images/car-dark-1.png'
import carsBackgroundLightImg from '@/images/car-dark-2.png'
import triangleBackgroundImg from '@/images/bg-figures/triangle-1.png'
import triangleBackgroundImgTwo from '@/images/bg-figures/triangle-2.png'
import triangleBackgroundImgThird from '@/images/bg-figures/triangle-3.png'
import BackgroundShaadowSection from '@/components/BackgroundShaadowSection';
import { useThemeMode } from '@/hooks/useThemeMode';

const metadata: Metadata = {
  title:
    'Elite Car Sales & Global Delivery | Luxury Vehicles Worldwide | WeltCar',
  description:
    'Discover our collection of elite cars with global delivery to all countries, including Germany, Switzerland, Dubai, and China. Experience luxury and performance with our exclusive vehicle range.',
};

function PageHome() {
  const { isDarkMode } = useThemeMode();
  
  return (
    <div className='nc-PageHome relative overflow-hidden'>
      {/* GLASSMOPHIN */}
      {/* <BgGlassmorphism /> */}

      <Image 
        src={triangleBackgroundImg} 
        alt='triangle background'
        className='absolute top-[11%] -left-[5px] -z-10'
      />
      <Image 
        src={triangleBackgroundImgTwo} 
        alt='triangle background'
        className='absolute top-[25%] -right-[5px] -z-10'
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
        className='bg-[#5046E5] -right-[315px] top-[14%]' 
      />
      <BackgroundShaadowSection 
        className='bg-[#5046E5] left-[25] bottom-[40%]' 
      />
      <BackgroundShaadowSection 
        className='bg-[#DFE172] -right-[145px] bottom-[8%]' 
      />

      {/* SECTION HERO */}
      <div className='relative container pt-12 xl:pt-14 pb-24 lg:pb-28'>
        <SectionHero />
      </div>

      <div className='container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28 mt-40'>
        <div className='relative py-16'>
          <SectionHowItWork />
        </div>

        {/* <SectionVideos /> */}

        <div className='relative flex py-20'>
          <SectionWhyChooseUs />
          <div className='flex-grow absolute -top-10 -right-24'>
            <Image 
              alt='car image' 
              src={carImg}  
            />
          </div>
        </div>

        <div className='relative  py-16'>
          <SectionClientSay />
        </div>

        <div className='relative py-16'>
          <SectionSubscribe />
        </div>

      </div>

      <div className='flex justify-center w-full'>
        <Image 
          src={isDarkMode ? carsBackgroundDarkImg : carsBackgroundLightImg } 
          alt='cars image'
          className='w-full'
        />
      </div>
    </div>
  );
}

export default PageHome;
