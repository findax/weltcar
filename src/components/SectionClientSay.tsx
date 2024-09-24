'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from 'swiper/modules';
import Heading from '@/shared/Heading';
import James from '@/images/avatars/James.webp';
import Sophie from '@/images/avatars/Sophie.webp';
import Hiroshi from '@/images/avatars/Hiroshi.webp';
import Isabella from '@/images/avatars/Isabella.webp';
import Emma from '@/images/avatars/Emma.webp';
import imgSlide from '@/images/car.svg';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

export interface SectionClientSayProps {
  className?: string;
  data?: typeof TESTIMONIALS_DATA;
  carImgLeft?: string;
  carImgRight?: string;
}

const TESTIMONIALS_DATA = [
  {
    id: 1,
    avatar: James,
    clientName: 'James',
    clientAddress: 'New York, USA',
    content:
      'Buying a car from WeltCar was a seamless process. The team is professional, and the selection of cars is truly impressive.',
  },
  {
    id: 2,
    avatar: Sophie,
    clientName: 'Maria',
    clientAddress: 'Rome, Italy',
    content:
      'From start to finish, WeltCar exceeded my expectations. Their expertise and dedication to customer satisfaction are truly remarkable.',
  },
  {
    id: 3,
    avatar: Hiroshi,
    clientName: 'Hiroshi',
    clientAddress: 'Tokyo, Japan',
    content:
      'Buying a car from WeltCar was a seamless process. The team is professional, and the selection of cars is truly impressive.',
  },
  {
    id: 4,
    avatar: Isabella,
    clientName: 'Isabella',
    clientAddress: 'Rome, Italy',
    content:
      'From start to finish, WeltCar exceeded my expectations. Their expertise and dedication to customer satisfaction are truly remarkable.',
  },
  {
    id: 5,
    avatar: Emma,
    clientName: 'Emma',
    clientAddress: 'Vienna, Austria',
    content:
      "Purchasing a VIP vehicle from WeltCar was one of the best decisions I've made. The level of service and quality of cars are extraordinary.",
  },
];

const SectionClientSay = ({
  className = '',
  data = TESTIMONIALS_DATA,
  carImgLeft = imgSlide,
}: SectionClientSayProps) => {
  const [swiper, setSwiper] = useState<any>(null);
  const [isBeginning, setBeginning] = useState(true);
  const [isEnd, setEnd] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className={`nc-SectionClientSay ${className}`}>
      <Heading
        desc="Let's See What People Think of"
        descStyle='text-lg md:text-2xl'
        descColor="WeltCar"
        isCenter
        fontClass='!font-bold text-3xl md:text-4xl xl:text-5xl dark:text-white text-neutral-1050'
      >
        Good News from Far Away
      </Heading>

      <div className='relative mt-16'>
        <Swiper
          modules={[Grid]}
          speed={600}
          grid={{
            rows: 1
          }}
          spaceBetween={30}
          onSwiper={(swiper) => {
            setSwiper(swiper)
          }}
          onSlideChange={(swiper) => {
            setBeginning(swiper.isBeginning);
            setEnd(swiper.isEnd);
            setActiveSlide(swiper.activeIndex);
          }}
          breakpoints={{
            1024: {
              grid:{
                rows: 2
              },
            }
          }}
          className='relative w-full h-[615px] xs:h-[720px] md:h-[800px] lg:w-[800px] lg:h-[860px] xl:w-[960px]'
        >
          {data.map((item, index) => (
            <SwiperSlide
              key={index}
              className='rs-swiper-slide'
            >
              {index % 2 
                ? (
                    <div className='flex flex-col-reverse lg:flex-row gap-4'>
                      <div className='w-full h-[250px] lg:w-[580px] border border-white bg-white rounded-3xl px-8 py-8 lg:px-12 lg:py-12 lg:h-[411px] dark:border-neutral-1000 dark:bg-neutral-1000'>
                        <div className='flex items-center gap-5'>
                          <div className='flex'>
                            <Image
                              src={item.avatar}
                              alt={item.clientName}
                              className='w-14 lg:w-24 rounded-full transition-opacity opacity-0 duration-[500ms]'
                              onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                            />
                          </div>
                          <div className='flex gap-2 flex-col'>
                            <span className='block text-2xl lg:ext-3xl font-bold text-neutral-1050 dark:text-white'>
                              {item.clientName}
                            </span>
                            <span className='block text-neutral-700 dark:text-neutral-400 text-base lg:text-lg'>
                              {item.clientAddress}
                            </span>
                          </div>
                        </div>
                        <span className='block text-base lg:text-[22px] text-neutral-1050 dark:text-white leading-normal mt-2 lg:mt-10'>{item.content}</span>
                      </div>
                      <div className='flex flex-grow w-full lg:w-[380px]'>
                        <Image 
                          src={carImgLeft} 
                          alt="car background" 
                          className='object-cover w-full h-full rounded-3xl'
                        />
                      </div>
                    </div>
                  )
                : (
                    <div className='flex flex-col-reverse lg:flex-row gap-5'>
                      <div className='flex flex-grow w-full lg:w-[380px]'>
                        <Image 
                          src={carImgLeft} 
                          alt="car background" 
                          className='object-cover w-full h-full rounded-3xl'
                        />
                      </div>
                      <div className='flex flex-col flex-grow h-[250px] lg:w-[580px] border border-white bg-white rounded-3xl px-8 py-8 lg:px-12 lg:py-12 lg:h-[410px] dark:border-neutral-1000 dark:bg-neutral-1000'>
                        <div className='flex items-center gap-5'>
                          <div className='flex'>
                            <Image
                              src={item.avatar}
                              alt={item.clientName}
                              className='w-14 lg:w-24 rounded-full transition-opacity opacity-0 duration-[500ms]'
                              onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                            />
                          </div>
                          <div className='flex gap-2 flex-col'>
                            <span className='block text-2xl lg:text-3xl text-neutral-1050 dark:text-white font-bold'>
                              {item.clientName}
                            </span>
                            <span className='block text-neutral-700 dark:text-neutral-400 text-base lg:text-lg'>
                              {item.clientAddress}
                            </span>
                          </div>
                        </div>
                        <span className='block text-base lg:text-[22px] text-neutral-1050 dark:text-white leading-normal mt-2 lg:mt-10'>{item.content}</span>
                      </div>
                    </div>
                  )
              }
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='absolute flex lg:hidden bottom-[20px] right-0 justify-center h-2 w-full'>
          {
            data.map((_, index: number) => 
              <span
                key={index}
                className={`block h-2 w-2 rounded-full mx-1 ${activeSlide === index ? 'bg-primary-600' : 'bg-[#D0D0D0]'}`}
              />
            )
          }
        </div>
        <div className='absolute z-10 flex items-center justify-around lg:justify-between bottom-[0%] right-0 w-full lg:top-0 lg:right-0 xl:top-0 xl:right-12 xl:w-[92%] '>
          <button
            className={`w-14 h-14 rounded-full flex items-center justify-center bg-primary-600 hover:bg-primary-700 focus:outline-none ${isBeginning ? '!bg-primary-400 dark:!bg-primary-900 cursor-default' : 'hover:bg-primary-700'}`}
            style={{ transform: 'translate3d(0, 0, 0)' }}
            onClick={() => swiper.slidePrev()}
          >
            <ChevronLeftIcon className='w-8 mr-0.5' color='white' />
          </button>

          <button
            className={`w-14 h-14 rounded-full flex items-center justify-center bg-primary-600 hover:bg-primary-700 focus:outline-none ${isEnd ? '!bg-primary-400 dark:!bg-primary-900 cursor-default' : 'hover:bg-primary-700'}`}
            style={{ transform: 'translate3d(0, 0, 0)' }}
            onClick={() => swiper.slideNext()}
          >
            <ChevronRightIcon className='w-8 ml-0.5' color='white' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionClientSay;
