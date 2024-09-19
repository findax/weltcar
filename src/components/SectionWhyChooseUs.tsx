import React, { FC } from 'react';
import { ButtonPrimary } from '@/shared/Buttons';

export interface SectionWhyChooseUsProps {
  className?: string;
}

const SectionWhyChooseUs: FC<SectionWhyChooseUsProps> = ({
  className = ''
}) => {
  return (
    <div
      // lg:pt-10 xl:py-20
      className={`nc-SectionWhyChooseUs relative flex flex-col lg:flex-row items-start xl:items-center ${className}`}
      data-nc-id='SectionWhyChooseUs'
    >
      <div className='flex-shrink-0 lg:pr-40 lg:-mt-3 xl:-mt-12 lg:w-1/2'>
        <h2 className='font-bold text-5xl mt-6 sm:mt-11 text-neutral-1050 dark:text-white'>
          Why Choose Us?
        </h2>
        <p className='mt-12 text-neutral-500 dark:text-neutral-400 text-lg'>
          At WeltCar, we pride ourselves on delivering exceptional service and
          exclusive access to the world’s finest cars. Our commitment to
          quality, personalized attention, and customer satisfaction sets us
          apart. Choose WeltCar for a seamless, luxurious car-buying experience.
        </p>
        <ButtonPrimary className='mt-6 sm:mt-11' href='/catalog'>
          Choose your car
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionWhyChooseUs;
