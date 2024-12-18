import React, { FC } from 'react';
import HIW1img from '@/images/icons/dimond.svg';
import HIW2img from '@/images/icons/persolan.svg';
import HIW3img from '@/images/icons/saving.svg';
import VectorImg from '@/images/VectorHIW.svg';
import Image, { StaticImageData } from 'next/image';
import Heading from '@/shared/Heading';

export interface SectionHowItWorkProps {
  className?: string;
  data?: {
    id: number;
    title: string;
    desc: string;
    img: StaticImageData;
    imgDark?: StaticImageData;
  }[];
  translate: any;
}

const DEMO_DATA: SectionHowItWorkProps['data'] = [
  {
    id: 1,
    img: HIW1img,
    title: 'howItWorks.luxury.title',
    desc: 'howItWorks.luxury.description',
  },
  {
    id: 2,
    img: HIW2img,
    title: 'howItWorks.consultation.title',
    desc: 'howItWorks.consultation.description',
  },
  {
    id: 3,
    img: HIW3img,
    title: 'howItWorks.saving.title',
    desc: 'howItWorks.saving.description',
  },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = '',
  data = DEMO_DATA,
  translate
}) => {
  return (
    <div
      className={`nc-SectionHowItWork lg:pb-12 ${className}`}
      data-nc-id='SectionHowItWork'
    >
      <Heading
        isCenter
        // desc='Keep calm & drive on'
        fontClass='!font-bold text-3xl md:text-4xl xl:text-5xl text-neutral-1050 dark:text-white'
      >
        {translate('howItWorks.title')}
      </Heading>
      <div className='flex flex-col gap-5 lg:flex-row justify-around mt-14'>
        {data.map((item) => (
          <div
            key={item.id}
            className='flex flex-col max-w-full lg:w-full py-10 px-7 bg-white dark:bg-neutral-950 rounded-3xl'
          >
            <div className='h-14 w-14 flex items-center justify-center'>
              <Image
                alt={item.title}
                className='opacity-[0.82] dark:opacity-100 '
                src={item.img}
              />
            </div>
            <div className='mt-4 md:mt-8'>
              <h3 className='text-lg md:text-2xl font-bold text-neutral-1050 dark:text-white '>{translate(item.title)}</h3>
              <span className='block mt-5 md:text-lg text-neutral-500 dark:text-neutral-400'>
                {translate(item.desc)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHowItWork;
