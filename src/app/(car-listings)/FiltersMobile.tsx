import React, { useState } from 'react';
import Filters from './Filters';
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const FiltersMobile = () => {
  const [isVisable, setIsVisable] = useState(false);

  const handleOpenFilters = () => {
    document.body.classList.add('overflow-hidden');
    setIsVisable(true);
  };
  const handleCloseFilters = () => {
    document.body.classList.remove('overflow-hidden');
    setIsVisable(false);
  };

  const renderCloseButton = () => {
    return (
      <button
        onClick={handleCloseFilters}
        className='p-3 rounded-full absolute top-1 right-1'
      >
        <XMarkIcon className='w-6 h-6' />
      </button>
    );
  };

  return (
    <>
      <button
        onClick={handleOpenFilters}
        className={`focus:outline-none flex items-center justify-center py-2.5 rounded-lg text-neutral-700 dark:text-neutral-300`}
      >
        <span className='inline-block font-medium'>Filter</span>
        <AdjustmentsHorizontalIcon className='h-5 w-5 ml-1' />
      </button>

      <div
        className={`bg-white dark:bg-neutral-900 absolute top-0 left-0 h-screen overflow-y-auto w-full z-20 transform transition-transform ease-in-out duration-300 ${
          isVisable ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Filters CloseButton={renderCloseButton()} />
      </div>
    </>
  );
};

export default FiltersMobile;
