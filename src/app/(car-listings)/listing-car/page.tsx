'use client';

import React, { FC, useState, useEffect } from 'react';
import SortPanel from '../SortPanel';
import Filters from '../Filters';
import { DEMO_CAR_LISTINGS } from '@/data/listings';
import { CarDataType } from '@/data/types';
import Pagination from '@/shared/Pagination';
import CarCard from '@/components/CarCard';
import CarCardH from '@/components/CarCardH';
import CarCardHSkeleton from '@/components/CarCardHSkeleton';
import CarCardSkeleton from '@/components/CarCardSkeleton';

export interface CarsListingPageProps {
  carsList?: CarDataType[];
}

const DEMO_DATA: CarDataType[] = DEMO_CAR_LISTINGS.filter((_, i) => i < 12);

const ListingCarPage: FC<CarsListingPageProps> = ({ carsList = DEMO_DATA }) => {
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
    <div className='container'>
      <div className='grid grid-cols-12 gap-4 lg:gap-6 py-6'>
        <div className='hidden lg:block lg:col-span-4'>
          <Filters />
        </div>
        <div className='col-span-12 lg:col-span-8'>
          <SortPanel
            handleClick={(value) => setIsGrid(value)}
            isGrid={isGrid}
          />
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
      </div>
    </div>
  );
};

export default ListingCarPage;
