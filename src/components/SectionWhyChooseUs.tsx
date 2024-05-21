import React, { FC } from 'react';
import rightImgDemo from '@/images/audi-r8-yellow.png';
import { ButtonPrimary } from '@/shared/Buttons';
import Logo from '@/shared/Logo';
import Image from 'next/image';
import WCU1img from '@/images/icons/badge.webp';
import WCU2img from '@/images/icons/shaking-hands.webp';

export interface SectionWhyChooseUsProps {
  className?: string;
  rightImg?: string;
}

const SectionWhyChooseUs: FC<SectionWhyChooseUsProps> = ({
  className = '',
  rightImg = rightImgDemo,
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
          Why did you choose us?
        </h2>
        <span className='block mt-6 text-neutral-500 dark:text-neutral-400'>
          Accompanying us, you have a trip full of experiences. With Chisfis,
          booking accommodation, resort villas, hotels, private houses,
          apartments... becomes fast, convenient and easy.
        </span>
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
        <Image className='mt-12' alt='car' src={rightImg} />
      </div>
    </div>
  );
};

export default SectionWhyChooseUs;
