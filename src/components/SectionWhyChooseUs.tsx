import React, { FC } from 'react';
import Image from 'next/image';
import carImg from '@/images/car-1.webp';
import WCU1img from '@/images/icons/badge.webp';
import WCU2img from '@/images/icons/shaking-hands.webp';
import { ButtonPrimary } from '@/shared/Buttons';
import Logo from '@/shared/Logo';

export interface SectionWhyChooseUsProps {
  className?: string;
  rightImg?: string;
}

const SectionWhyChooseUs: FC<SectionWhyChooseUsProps> = ({
  className = '',
  rightImg = carImg,
}) => {
  return (
    <div
      // lg:pt-10 xl:py-20
      className={`nc-SectionWhyChooseUs relative flex flex-col lg:flex-row items-start xl:items-center ${className}`}
      data-nc-id='SectionWhyChooseUs'
    >
      <div className='flex-shrink-0 lg:pr-16 lg:w-1/2 lg:-mt-3 xl:-mt-12'>
        <Logo className='w-48' />
        <h2 className='font-semibold text-3xl sm:text-4xl mt-6 sm:mt-11'>
          Why Choose Us?
        </h2>
        <p className='mt-6 text-neutral-500 dark:text-neutral-400'>
          At WeltCar, we pride ourselves on delivering exceptional service and
          exclusive access to the world’s finest cars. Our commitment to
          quality, personalized attention, and customer satisfaction sets us
          apart. Choose WeltCar for a seamless, luxurious car-buying experience.
        </p>
        <ButtonPrimary className='mt-6 sm:mt-11' href='/catalog'>
          Choose your car
        </ButtonPrimary>
      </div>
      <div className='flex-grow mt-16 lg:mt-0'>
        <div className='grid grid-cols-2'>
          <div className='relative w-8/12 sm:w-7/12 m-auto after:content after:absolute after:inset-0 after:rounded-full after:shadow-2xl after:shadow-[#fed800]'>
            <Image
              alt='shaking hands'
              className='opacity-[0.82] dark:opacity-100'
              src={WCU1img}
            />
          </div>
          <div className='relative w-8/12 sm:w-7/12 m-auto after:content after:absolute after:inset-0 after:rounded-full after:shadow-2xl after:shadow-[#fed800]'>
            <Image
              alt='best prices'
              className='opacity-[0.82] dark:opacity-100'
              src={WCU2img}
            />
          </div>
        </div>
        <Image className='mt-12' alt='car image' src={rightImg} />
      </div>
    </div>
  );
};

export default SectionWhyChooseUs;
