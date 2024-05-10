import React, { FC } from 'react';
import HIW1img from '@/images/icons/dimond.png';
import HIW2img from '@/images/icons/persolan.png';
import HIW3img from '@/images/icons/saving.png';
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
    title: 'Discover luxury',
    desc: 'Explore our curated selection of premium automobiles, where every ride embodies elegance and sophistication',
  },
  {
    id: 2,
    img: HIW2img,
    title: 'Personalized consultation',
    desc: 'Receive expert guidance tailored to your preferences, ensuring that each vehicle aligns perfectly with your desires and lifestyle',
  },
  {
    id: 3,
    img: HIW3img,
    title: 'Exclusive savings',
    desc: 'Unlock special offers and financing options, allowing you to elevate your driving experience without compromising on quality or value',
  },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = '',
  data = DEMO_DATA,
}) => {
  return (
    <div
      className={`nc-SectionHowItWork  ${className}`}
      data-nc-id='SectionHowItWork'
    >
      <Heading
        isCenter
        desc='Keep calm & drive on'
        fontClass='font-bold xl:text-5xl'
      >
        How it work
      </Heading>
      <div className='relative grid md:grid-cols-3 gap-20 md:gap-6 lg:gap-20'>
        <Image
          className='hidden md:block absolute inset-x-0 top-20 lg:top-1/4 xl:top-1/3 -translate-y-1/2'
          src={VectorImg}
          alt='vector'
        />
        {data.map((item) => (
          <div
            key={item.id}
            className='relative  flex flex-col items-center max-w-xs mx-auto'
          >
            <div className='relative after:content after:absolute after:inset-0 w-3/4 after:rounded-full after:shadow-2xl after:shadow-[#fed800]'>
              <Image
                alt={item.title}
                className='opacity-[0.82] dark:opacity-100'
                src={item.img}
              />
            </div>
            <div className='mt-8 text-center'>
              <h3 className='text-xl font-bold'>{item.title}</h3>
              <span className='block mt-5 md:text-sm lg:text-lg text-neutral-500 dark:text-neutral-400'>
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
