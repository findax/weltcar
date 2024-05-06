import React, { FC } from 'react';
import rightImgDemo from '@/images/WhyChooseUs.webp';
import ButtonPrimary from '@/shared/ButtonPrimary';
import Logo from '@/shared/Logo';
import Image from 'next/image';
import Link from 'next/link';

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
      className={`nc-SectionWhyChooseUs relative flex flex-col lg:flex-row items-center  ${className}`}
      data-nc-id='SectionWhyChooseUs'
    >
      <div className='flex-shrink-0 mb-16 lg:mb-0 lg:mr-16 lg:w-1/2'>
        <Logo className='w-48' />
        <h2 className='font-semibold text-3xl sm:text-4xl mt-6 sm:mt-11'>
          Why did you choose us?
        </h2>
        <span className='block mt-6 text-neutral-500 dark:text-neutral-400'>
          Accompanying us, you have a trip full of experiences. With Chisfis,
          booking accommodation, resort villas, hotels, private houses,
          apartments... becomes fast, convenient and easy.
        </span>
        <Link href='/catalog'>
          <ButtonPrimary className='mt-6 sm:mt-11'>
            Choose your car
          </ButtonPrimary>
        </Link>
      </div>
      <div className='flex-grow rounded-3xl sm:rounded-[40px] overflow-hidden'>
        <Image alt='good deal' src={rightImg} />
      </div>
    </div>
  );
};

export default SectionWhyChooseUs;
