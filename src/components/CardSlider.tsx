'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export interface CardSliderProps {
  photos: { thumb: string }[];
  paddingBottom: string;
  grayscale: string;
  carName: string;
}

export default function CardSlider({
  photos,
  paddingBottom,
  grayscale,
  carName,
}: CardSliderProps) {
  const [loaded, setLoaded] = useState(false);
  const [swiper, setSwiper] = useState(null);
  const images = photos;
  images.length = Math.min(images.length, 5);

  let currentImage = images[0]?.thumb || '';

  return (
    <div
      className={`${loaded ? '' : 'bg-img-placeholder'} relative group ${paddingBottom}`}
    >
      {images.length > 1 ? (
        <Swiper
          loop={true}
          pagination={{
            clickable: true,
            el: '.card-slider-pagination',
          }}
          modules={[Pagination]}
          onSwiper={(swiper: any) => setSwiper(swiper)}
          className={`!absolute inset-0 w-full h-full ${grayscale}`}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                src={img.thumb}
                alt={carName}
                height={280}
                width={400}
                className='w-full h-full object-cover transition-opacity opacity-0 duration-[500ms]'
                onLoad={(e) => {
                  setLoaded(true),
                    e.currentTarget.classList.remove('opacity-0');
                }}
                onError={() => setLoaded(false)}
              />
            </SwiperSlide>
          ))}
          {loaded && (
            <>
              <div className='opacity-0 group-hover:opacity-100 transition-opacity'>
                <button
                  className='absolute w-9 h-9 left-3 top-[calc(50%-16px)] bg-white/70 hover:bg-white dark:bg-neutral-900/80 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-600 dark:hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300 focus:outline-none z-10'
                  style={{ transform: 'translate3d(0, 0, 0)' }}
                  onClick={() => {
                    // @ts-ignore
                    swiper.slideNext();
                  }}
                >
                  <ChevronLeftIcon className='w-5 mr-0.5' />
                </button>
                <button
                  className='absolute w-9 h-9 right-3 top-[calc(50%-16px)] bg-white/70 hover:bg-white dark:bg-neutral-900/80 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-600 dark:hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300 focus:outline-none z-10'
                  style={{ transform: 'translate3d(0, 0, 0)' }}
                  onClick={() => {
                    // @ts-ignore
                    swiper.slidePrev();
                  }}
                >
                  <ChevronRightIcon className='w-5 ml-0.5' />
                </button>
              </div>
              <div className='absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-neutral-900 opacity-50 z-10'></div>
            </>
          )}
          <div className='swiper-pagination card-slider-pagination'></div>
        </Swiper>
      ) : (
        <div className='absolute inset-0 w-full h-full'>
          <Image
            className='w-full h-full object-cover transition-opacity opacity-0 duration-[500ms]'
            src={currentImage}
            alt={carName}
            height={280}
            width={400}
            onLoad={(e) => {
              setLoaded(true), e.currentTarget.classList.remove('opacity-0');
            }}
            onError={() => setLoaded(false)}
          />
        </div>
      )}
    </div>
  );
}
