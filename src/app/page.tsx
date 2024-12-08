'use client'

import { Metadata } from 'next/types';
import SectionHero from '@/components/SectionHero';
import SectionHowItWork from '@/components/SectionHowItWork';
import SectionSubscribe from '@/components/SectionSubscribe';
import SectionWhyChooseUs from '@/components/SectionWhyChooseUs';
import SectionVideos from '@/components/SectionVideos';
import SectionClientSay from '@/components/SectionClientSay';
import Image from 'next/image';
import arrowDownLightImg from '@/images/bg-figures/arrow-down.svg';
import arrowDownDarkImg from '@/images/bg-figures/arrow-down-dark.svg';
import carBackgroundDarkImg from '@/images/car-2.png';
import carBackgroundLightImg from '@/images/car-2-light.png';
import carsBackgroundDarkImg from '@/images/car-dark.png'
import carsBackgroundLightImg from '@/images/car-light.png'
import triangleBackgroundImg from '@/images/bg-figures/triangle-1.png'
import triangleBackgroundImgTwo from '@/images/bg-figures/triangle-2.png'
import triangleBackgroundImgThird from '@/images/bg-figures/triangle-3.png'
import BackgroundShaadowSection from '@/components/BackgroundShaadowSection';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useEffect, useRef } from 'react';
import { getLanguages } from '@/api/languages';

const metadata: Metadata = {
  title:
    'Elite Car Sales & Global Delivery | Luxury Vehicles Worldwide | WeltCar',
  description:
    'Discover our collection of elite cars with global delivery to all countries, including Germany, Switzerland, Dubai, and China. Experience luxury and performance with our exclusive vehicle range.',
};

function PageHome() {
  const { isDarkMode, mounted } = useThemeMode();

  const targetSectionRef: any = useRef(null);

  const scrollToSection = () => {
    const element = targetSectionRef.current;
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - 100;

    slowScrollTo(targetPosition, 1300);
  };

  const slowScrollTo = (targetY: number, duration: number) => {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const startTime = Date.now();


    const scrollStep = () => {
      const now = Date.now();
      const elapsedTime = now - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      window.scrollTo(0, startY + distance * progress);

      if (progress < 1) {
        setTimeout(scrollStep, 10);
      }
    };

    scrollStep();
  };

  // useEffect(() => {
  //   getLanguages()
  //     .then((languages) => {
  //       if(languages) {
  //         console.log(languages);
  //       }
  //     })
  //     .finally(() => {
  //     })
  // },[])
  
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
      {/* <Image 
        src={triangleBackgroundImgTwo} 
        alt='triangle background'
        className='hidden md:block absolute top-[28%] -right-[5px] -z-10'
      /> */}
      <Image 
        src={triangleBackgroundImgThird} 
        alt='triangle background'
        className='absolute rotate-3 bottom-[3%] -left-[8px] sm:-bottom-[7%] lg:-left-[22px] -z-10'
      />
      <BackgroundShaadowSection 
        className='bg-[#DFE172] opacity-[0.30] -left-[350px] top-[4%]' 
      />
      <BackgroundShaadowSection 
        className='hidden lg:block dark:bg-[#123D4A] bg-[#00668451] dark:opacity-[10] -right-[315px] top-[14%]' 
      />
      <BackgroundShaadowSection 
        className='dark:bg-[#123D4A] bg-[#00668451] dark:opacity-[10] -left-[200px] bottom-[34%] lg:left-[25px] lg:bottom-[40%]' 
      />
      <BackgroundShaadowSection 
        className='-bottom-[2%] -right-[80%] bg-[#DFE172] opacity-[0.30] lg:-right-[367px] lg:bottom-[13%]' 
      />

      {/* SECTION HERO */}
      <div className='relative container pt-12 xl:pt-14 pb-24 lg:pb-28'>
        <SectionHero />
        <div onClick={scrollToSection} className='hidden lg:block absolute -bottom-[10%] right-[48%] cursor-pointer animate-pulse'>
          <Image 
            className='w-8 h-7'
            alt='arrow down image' 
            src={isDarkMode ? arrowDownLightImg : arrowDownDarkImg}  
          />
        </div>
      </div>

      <div ref={targetSectionRef}  className='container relative space-y-24 mb-0 sm:mb-24 lg:space-y-28 lg:mb-28 mt-40'>
        <div className='relative py-16'>
          <SectionHowItWork />
        </div>

        {/* <SectionVideos /> */}

        <div className='relative flex pb-20 lg:py-20'>
          <SectionWhyChooseUs />
          <div className='lg:max-w-[70%] xl:max-w-full absolute top-[80%] md:top-[65%] lg:top-20 xl:-top-10 -right-24'>
            <Image 
              alt='car image' 
              src={isDarkMode ? carBackgroundDarkImg : carBackgroundLightImg}  
            />
          </div>
        </div>

        {/* <div className='relative pt-64 sm:pt-96 lg:py-16'>
          <SectionClientSay />
        </div> */}

        <div className='relative pt-64 sm:pt-96 lg:pt-0 xl:pt-16 py-16'>
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
