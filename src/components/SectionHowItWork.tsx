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
}

const DEMO_DATA: SectionHowItWorkProps['data'] = [
  {
    id: 1,
    img: HIW1img,
    title: 'Discover Luxury',
    desc: 'Explore our curated collection of exclusive vehicles, each selected for its unparalleled quality and elegance. Begin your journey into luxury today',
  },
  {
    id: 2,
    img: HIW2img,
    title: 'Personalized Consultation',
    desc: 'Our expert consultants are dedicated to understanding your unique preferences and needs, providing tailored advice and support to help you find your perfect car',
  },
  {
    id: 3,
    img: HIW3img,
    title: 'Exclusive Savings',
    desc: 'Enjoy exclusive deals and savings on the most luxurious vehicles. At WeltCar, we make high-end car ownership accessible',
  },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = '',
  data = DEMO_DATA,
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
        How It Works
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
              <h3 className='text-lg md:text-2xl font-bold text-neutral-1050 dark:text-white '>{item.title}</h3>
              <span className='block mt-5 md:text-lg text-neutral-500 dark:text-neutral-400'>
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHowItWork;
