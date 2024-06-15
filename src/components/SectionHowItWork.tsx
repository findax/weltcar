import React, { FC } from 'react';
import HIW1img from '@/images/icons/dimond.webp';
import HIW2img from '@/images/icons/persolan.webp';
import HIW3img from '@/images/icons/saving.webp';
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
        fontClass='!font-bold xl:text-5xl'
      >
        How It Works
      </Heading>
      <div className='relative grid md:grid-cols-3 gap-20 md:gap-6 lg:gap-20'>
        <Image
          className='hidden md:block absolute inset-x-0 top-16 lg:top-1/4 -translate-y-1/2'
          src={VectorImg}
          alt='vector'
        />
        {data.map((item) => (
          <div
            key={item.id}
            className='relative  flex flex-col items-center max-w-sm mx-auto'
          >
            <div className='relative after:content after:absolute after:inset-0 w-5/12 md:w-1/2 lg:w-7/12 after:rounded-full after:shadow-2xl after:shadow-[#fed800]'>
              <Image
                alt={item.title}
                className='opacity-[0.82] dark:opacity-100'
                src={item.img}
              />
            </div>
            <div className='mt-8 text-center'>
              <h3 className='text-xl font-bold'>{item.title}</h3>
              <span className='block mt-5 md:text-sm xl:text-base text-neutral-500 dark:text-neutral-400'>
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
