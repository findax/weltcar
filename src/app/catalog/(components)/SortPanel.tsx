import React, { FC } from 'react';
import {
  ListBulletIcon,
  Squares2X2Icon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';

export interface SortPanelProps {
  handleIsGrid: (isGrid: boolean) => void;
  isGrid: boolean;
  openFilter: (value: boolean) => void;
}

const SortPanel: FC<SortPanelProps> = ({
  handleIsGrid,
  isGrid,
  openFilter,
}) => {
  return (
    <div className='col-span-12 bg-white dark:bg-neutral-900 mb-4 py-2 px-6 lg:mb-6 border border-neutral-200 dark:border-neutral-700 rounded-xl'>
      <ul className='flex justify-between items-center flex-wrap gap-3 '>
        <li className='hidden lg:block'>
          <p className='mb-0 clr-neutral-500'>124 Results</p>
        </li>
        <li className='lg:hidden'>
          <button
            onClick={() => openFilter(true)}
            className={`focus:outline-none flex items-center justify-center py-2.5 rounded-lg text-neutral-700 dark:text-neutral-300`}
          >
            <span className='inline-block font-medium'>Filter</span>
            <AdjustmentsHorizontalIcon className='h-5 w-5 ml-1' />
          </button>
        </li>
        <li className='flex-grow'>
          <div className='hidden md:flex flex-wrap justify-center justify-content-lg-start justify-content-xl-center gap-4'>
            <button
              className={`flex items-center gap-2 clr-neutral-500 hover:text-primary ${
                isGrid ? 'text-primary-600 dark:text-primary-400' : ''
              }`}
              onClick={() => handleIsGrid(true)}
            >
              <Squares2X2Icon className='w-5 h-5' />
              <span className='inline-block font-medium'>Grid</span>
            </button>
            <button
              className={`flex items-center gap-2 clr-neutral-500 hover:text-primary ${
                !isGrid ? 'text-primary-600 dark:text-primary-400' : ''
              }`}
              onClick={() => handleIsGrid(false)}
            >
              <ListBulletIcon className='w-5 h-5' />
              <span className='inline-block font-medium'>List</span>
            </button>
          </div>
        </li>
        <li className='flex items-center'>
          <p className='mb-0 clr-neutral-500 flex-grow whitespace-nowrap'>
            Sort By :
          </p>
          <select className='bg-transparent cursor-pointer w-full pl-4 pr-8 py-2 border-0 focus:ring-indigo-500 focus:border-indigo-500 rounded-full'>
            {/* <option>Newest</option> */}
            <option value='1'>Price (Low to High)</option>
            <option value='2'>Price (High to Low)</option>
            <option value='3'>Name (A-Z)</option>
            <option value='4'>Name (Z-A)</option>
          </select>
        </li>
      </ul>
    </div>
  );
};

export default SortPanel;
