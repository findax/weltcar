'use client'

import Image from 'next/image';
import ContactHero from './(components)/ContactHero';
import SectionSubscribe from '@/components/SectionSubscribe';
import { useThemeMode } from '@/hooks/useThemeMode';
import carsBackgroundDarkImg from '@/images/car-dark.png'
import carsBackgroundLightImg from '@/images/car-light.png'
import triangleBackgroundImgThird from '@/images/bg-figures/triangle-3.png'
import BackgroundShaadowSection from '@/components/BackgroundShaadowSection';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import MapWithPartners from '@/components/MapWithPartners';
import FeedbackForm from './(components)/FeedbackForm';
import carImg from '@/images/car-4.png';


const metadata = {
  title: 'Contact | Elite Car Sales & Global Delivery | Luxury Vehicles Worldwide | WeltCar',
  description:
    'Get in touch with us for inquiries about our luxury cars and global delivery services. Contact our team for assistance with purchasing elite vehicles and delivery to countries like Germany, Switzerland, Dubai, and China.',
};

const PageContact = () => {
  const { isDarkMode, mounted } = useThemeMode();
  const translate = useTranslations();

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
        className='bg-[#00668451] dark:bg-[#123D4A] dark:opacity-[10] -right-[330px] top-[4%] lg:top-[1%]' 
      />
      <BackgroundShaadowSection 
        className='bg-[#DFE172] opacity-[0.30] -right-[300px] -bottom-[3%] lg:-right-[100px] lg:bottom-[8%]' 
      />
      <div className='container my-12 xl:my-20 space-y-16 xl:space-y-28'>
        <ContactHero translate={translate} />

        <div className='relative z-0 pt-16 mb-24 lg:md-32'>
          <h3 className='mb-10 text-center lg:mb-20 font-bold text-neutral-1050 dark:text-white text-3xl md:text-4xl xl:text-5xl'>
            {translate('contact.ourPartners.title')}
          </h3>
          <MapWithPartners />
        </div>

        <div className='relative pt-16 mb-24 lg:md-32 flex gap-16 lg:gap-8 flex-col-reverse lg:flex-row mt-14 justify-between'>
          <div className='flex flex-grow justify-center lg:justify-start shrink'>
            <Image
              src={carImg}
              alt='mercedes icon'
            />
          </div>
          <div className='w-full lg:w-[480px]'>
            <FeedbackForm translate={translate}/>
          </div>
        </div>

        <div className='relative pt-16 mb-24 lg:md-32'>
          <SectionSubscribe translate={translate} />
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

export default PageContact;
