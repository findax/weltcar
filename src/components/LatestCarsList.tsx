'use client';

import { Car } from '@/api';
import { useUserStore } from '@/stores/user-store';
import { useTranslations } from 'next-intl';
import CarCard from './CarCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface LatestCarsListProps {
  carList: Car[];
}

const LatestCarsList = ({ carList }: LatestCarsListProps) => {
  const t = useTranslations();
  const user = useUserStore((state) => state.user);

  return (
    <div className='overflow-hidden'>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
        modules={[FreeMode, Navigation, Pagination]}
        freeMode
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{
          clickable: true,
          el: '.latest-cars-pagination',
        }}
      >
        {carList.map((car) => (
          <SwiperSlide key={car.id} className='w-max'>
            <div className='h-[530px] w-full w-max-[380px]'>
              <CarCard
                className='h-full'
                carData={car}
                paddingBottomGrid='p-0 h-[260px]'
                translate={t}
                user={user}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='flex items-center justify-center gap-4 mt-14'>
        <button
          className={`swiper-button-prev-custom w-12 h-12 shrink-0 rounded-full grid place-items-center bg-primary-600 dark:!bg-primary-950 focus:outline-none`}
        >
          <ChevronLeftIcon className='h-8 text-white dark:text-black' />
        </button>
        <div className='latest-cars-pagination flex gap-2 w-max mx-6'></div>
        <button
          className={`swiper-button-next-custom w-12 h-12 shrink-0 rounded-full grid place-items-center bg-primary-600 dark:!bg-primary-950 focus:outline-none`}
        >
          <ChevronRightIcon className='h-8 text-white dark:text-black' />
        </button>
      </div>
    </div>
  );
};

export default LatestCarsList;
