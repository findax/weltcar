import React, { FC } from 'react';

export interface NcPlayIconProps {
  className?: string;
}

const NcPlayIcon: FC<NcPlayIconProps> = ({ className = '' }) => {
  return (
    <div
      className={`nc-NcPlayIcon bg-white bg-opacity-30 backdrop-filter backdrop-blur rounded-full w-20 h-20 p-3 lg:w-40 lg:h-40 lg:p-7 ${className}`}
      data-nc-id='NcPlayIcon'
    >
      <div className='w-full h-full bg-white rounded-full text-primary-500 relative'>
        <span className='absolute inset-0 flex items-center justify-center'>
          <svg
            className='w-9 h-9 lg:w-14 lg:h-14 ml-1 lg:ml-2.5'
            width='24'
            height='24'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              d='M18.25 12L5.75 5.75V18.25L18.25 12Z'
            ></path>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default NcPlayIcon;
