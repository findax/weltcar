import React, { FC, useState, useEffect } from 'react';
import SortPanel from './SortPanel';
import { DEMO_CARS_LIST } from '@/data/listings';
import { CarDataType } from '@/data/types';
import Pagination from '@/shared/Pagination';
import CarCard from '@/components/CarCard';
import CarCardH from '@/components/CarCardH';
import CarCardHSkeleton from '@/components/CarCardHSkeleton';
import CarCardSkeleton from '@/components/CarCardSkeleton';

export interface CarsListPageProps {
  carsList?: CarDataType[];
}

const DEMO_DATA: CarDataType[] = DEMO_CARS_LIST.filter((_, i) => i < 12);

const CarsList: FC<CarsListPageProps> = ({ carsList = DEMO_DATA }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGrid, setIsGrid] = useState(true);
  const ww = typeof window !== 'undefined' ? window.innerWidth : 1000;

  // useEffect(() => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  // }, [isGrid]);

  return (
    <div className='col-span-12 lg:col-span-8'>
      <SortPanel handleClick={(value) => setIsGrid(value)} isGrid={isGrid} />
      {ww > 767 && !isGrid ? (
        isLoading ? (
          <CarCardHSkeleton />
        ) : (
          <div className='flex flex-col gap-4 lg:gap-6'>
            {carsList.map((car) => (
              <CarCardH key={car.id} data={car} />
            ))}
          </div>
        )
      ) : isLoading ? (
        <CarCardSkeleton />
      ) : (
        <div className='grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-2'>
          {carsList.map((car) => (
            <CarCard key={car.id} data={car} />
          ))}
        </div>
      )}
      <div className='flex mt-16 justify-center items-center'>
        <Pagination />
      </div>
    </div>
  );
};

export default CarsList;
