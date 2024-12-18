import React, { FC } from 'react';
import { ButtonPrimary } from '@/shared/Buttons';

export interface SectionWhyChooseUsProps {
  className?: string;
  translate: any;
}

const SectionWhyChooseUs: FC<SectionWhyChooseUsProps> = ({
  className = '',
  translate
}) => {
  return (
    <div
      // lg:pt-10 xl:py-20
      className={`nc-SectionWhyChooseUs relative flex flex-col lg:flex-row items-start xl:items-center ${className}`}
      data-nc-id='SectionWhyChooseUs'
    >
      <div className='flex-shrink-0 lg:pr-40 lg:-mt-3 xl:-mt-12 lg:w-1/2'>
        <h2 className='font-bold text-3xl md:text-4xl xl:text-5xl mt-6 sm:mt-11 text-neutral-1050 dark:text-white'>
          {translate('whyChooseUs.title')}
        </h2>
        <p className='mt-12 md:text-lg text-neutral-500 dark:text-neutral-400'>
          {translate('whyChooseUs.description')}
        </p>
        <ButtonPrimary className='text-base md:text-lg mt-6 sm:mt-11' href={'/catalog'}>
          {translate('whyChooseUs.button.chooseCar')}
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionWhyChooseUs;
