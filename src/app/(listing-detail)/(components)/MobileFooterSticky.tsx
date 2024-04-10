import React from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';

const MobileFooterSticky = () => {
  return (
    <div className='block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-600 z-40'>
      <div className='container flex items-center justify-between'>
        <div className=''>
          <span className='block text-xl font-semibold'>
            $311
            <span className='ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400'>
              /night
            </span>
          </span>
        </div>
        <ButtonPrimary sizeClass='px-5 sm:px-7 py-3 !rounded-2xl'>
          Reserve
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default MobileFooterSticky;
