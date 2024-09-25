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
  const { isDarkMode, mounted } = useThemeMode();

  if (!mounted) return null;
  
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
        className='hidden lg:block absolute top-[25%] -right-[5px] -z-10'
      />
      <Image 
        src={triangleBackgroundImgThird} 
        alt='triangle background'
        className='absolute rotate-3 bottom-[13%] -left-[8px] lg:-bottom-[12%] lg:-left-[22px] -z-10'
      />
      <BackgroundShaadowSection 
        className='bg-[#DFE172] -left-[350px] top-[4%]' 
      />
      <BackgroundShaadowSection 
        className='hidden lg:block bg-[#5046E5] -right-[315px] top-[14%]' 
      />
      <BackgroundShaadowSection 
        className='bg-[#5046E5] -left-[200px] bottom-[34%] lg:left-[25px] lg:bottom-[40%]' 
      />
      <BackgroundShaadowSection 
        className='-bottom-[2%] -right-[80%] sm:bottom-[9%] bg-[#DFE172] lg:-right-[145px] lg:bottom-[8%]' 
      />

      {/* SECTION HERO */}
      <div className='relative container pt-12 xl:pt-14 pb-24 lg:pb-28'>
        <SectionHero />
      </div>

      <div className='container relative space-y-24 mb-0 sm:mb-24 lg:space-y-28 lg:mb-28 mt-40'>
        <div className='relative py-16'>
          <SectionHowItWork />
        </div>

        {/* <SectionVideos /> */}

        <div className='relative flex pb-20 lg:py-20'>
          <SectionWhyChooseUs />
          <div className='lg:max-w-[70%] xl:max-w-full absolute top-[80%] md:top-[65%] lg:top-20 xl:-top-10 -right-24'>
            <Image 
              alt='car image' 
              src={carImg}  
            />
          </div>
        </div>

        <div className='relative pt-64 sm:pt-96 lg:py-16'>
          <SectionClientSay />
        </div>

        <div className='relative py-16'>
          <SectionSubscribe />
        </div>
      </div>

      {/* <div className='flex-grow absolute top-[1530px] -right-0'>
        <Image 
          alt='car image' 
          src={carImg}  
        />
      </div> */}

      <div className='flex relative sm:bottom-0 sm:h-full -bottom-[30px] h-72 justify-center w-full'>
        <Image 
          src={isDarkMode ? carsBackgroundDarkImg : carsBackgroundLightImg } 
          alt='cars image'
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  );
}

export default PageHome;
