'use client';

import { FC } from 'react';
import Filters from '../Filters';
import CarsList from '../CarsList';

export interface ListingCarPageProps {}

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
