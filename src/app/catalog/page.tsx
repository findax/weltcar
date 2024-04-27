'use client';

import { DEMO_CARS_LIST } from '@/data/carslist';
import Filters from './(components)/Filters';
import CarsList from './(components)/CarsList';

const CarsListPage = () => {
  return (
    <div className='relative overflow-hidden'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-4 lg:gap-6 py-6'>
          <div className='hidden lg:block lg:col-span-4'>
            <Filters />
          </div>
          <CarsList carsList={DEMO_CARS_LIST} />
        </div>
      </div>
    </div>
  );
};

export default CarsListPage;
