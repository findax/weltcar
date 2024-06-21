'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import Heading from '@/shared/Heading';
import James from '@/images/avatars/James.webp';
import Sophie from '@/images/avatars/Sophie.webp';
import Hiroshi from '@/images/avatars/Hiroshi.webp';
import Isabella from '@/images/avatars/Isabella.webp';
import Emma from '@/images/avatars/Emma.webp';
import quotationImg from '@/images/quotation.png';
import quotationImg2 from '@/images/quotation2.png';
import {
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import bgImg from '@/images/bg-cars/bg-car-1.webp';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

export interface SectionClientSayProps {
  className?: string;
  data: typeof TESTIMONIALS_DATA;
}

const TESTIMONIALS_DATA = [
  {
    id: 1,
    avatar: James,
    clientName: 'James',
    clientAddress: 'New York, USA',
    content:
      'I had an outstanding experience with WeltCar. The personalized service and exceptional quality of the vehicles are unmatched.',
  },
  {
    id: 2,
    avatar: Sophie,
    clientName: 'Sophie',
    clientAddress: 'Berlin, Germany',
    content:
      'WeltCar made my dream of owning a luxury car come true. Their attention to detail and customer care are second to none.',
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
}: SectionClientSayProps) => {
  const [swiper, setSwiper] = useState(null);

  return (
    <div className={`nc-SectionClientSay relative ${className}`}>
      <Heading
        desc="Let's See What People Think of WeltCar"
        isCenter
        fontClass='!font-bold xl:text-5xl'
      >
        Good News from Far Away
      </Heading>

      <Swiper
        // loop={true}
        modules={[EffectFade]}
        effect='fade'
        speed={600}
        fadeEffect={{ crossFade: true }}
        onSwiper={(swiper: any) => setSwiper(swiper)}
        className='mt-12 lg:mt-16 max-w-4xl mx-auto'
      >
        <Image
          className='hidden lg:block mt-4 absolute left-0 top-1/2 -translate-y-1/2'
          src={quotationImg}
          alt='quotation'
        />
        <Image
          className='hidden lg:block mt-4 absolute right-0 top-1/2 -translate-y-1/2'
          src={quotationImg2}
          alt='quotation'
        />

        {data.map((item, index) => (
          <SwiperSlide
            key={index}
            className='relative sm:px-20 text-center whitespace-normal'
          >
            <Image
              src={item.avatar}
              alt={item.clientName}
              height={390}
              width={300}
              className='w-28 mx-auto mb-8 rounded-full transition-opacity opacity-0 duration-[500ms]'
              onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
            />

            <span className='block text-2xl'>{item.content}</span>
            <span className='block mt-8 text-2xl font-semibold'>
              {item.clientName}
            </span>
            <div className='flex items-center justify-center space-x-2 text-lg mt-2 text-neutral-400'>
              <MapPinIcon className='w-5' />
              <span>{item.clientAddress}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='mt-10 flex items-center justify-center space-x-3'>
        <button
          className='w-11 h-11 rounded-full flex items-center justify-center bg-primary-600 hover:bg-primary-700 focus:outline-none'
          style={{ transform: 'translate3d(0, 0, 0)' }}
          onClick={() => {
            // @ts-ignore
            swiper.slidePrev();
          }}
        >
          <ChevronLeftIcon className='w-6 mr-0.5' color='white' />
        </button>

        <button
          className='w-11 h-11 rounded-full flex items-center justify-center bg-primary-600 hover:bg-primary-700 focus:outline-none'
          style={{ transform: 'translate3d(0, 0, 0)' }}
          onClick={() => {
            // @ts-ignore
            swiper.slideNext();
          }}
        >
          <ChevronRightIcon className='w-6 ml-0.5' color='white' />
        </button>
      </div>

      <Image
        className='hidden sm:block absolute inset-0 top-20 object-contain w-full opacity-[0.1] dark:opacity-[0.08] -z-10'
        src={bgImg}
        alt='car background image'
        priority
      />
    </div>
  );
};

export default SectionClientSay;
