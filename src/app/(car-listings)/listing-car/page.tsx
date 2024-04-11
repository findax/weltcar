'use client';

import React, { FC, useState, useEffect } from 'react';
import Filters from '../Filters';
import CarsList from '../CarsList';
import { DEMO_CAR_LISTINGS } from '@/data/listings';
import { CarDataType } from '@/data/types';

export interface ListingCarPageProps {}

const DEMO_DATA: CarDataType[] = DEMO_CAR_LISTINGS.filter((_, i) => i < 12);

const ListingCarPage: FC<ListingCarPageProps> = () => {
  return (
    <div className='container'>
      <div className='grid grid-cols-12 gap-4 lg:gap-6 py-6'>
        <div className='hidden lg:block lg:col-span-4'>
          <Filters />
        </div>
        <CarsList />
      </div>
    </div>
  );
};

export default ListingCarPage;
