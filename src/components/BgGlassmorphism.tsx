import React, { FC } from 'react';

export interface BgGlassmorphismProps {
  className?: string;
}

const BgGlassmorphism: FC<BgGlassmorphismProps> = ({
  className = 'absolute inset-x-0 md:top-10 xl:top-40 min-h-0 pl-20 py-24 flex overflow-hidden z-0',
}) => {
  return (
    <div
      className={`nc-BgGlassmorphism ${className}`}
      data-nc-id='BgGlassmorphism'
    >
      <span className='block bg-[#ef233c] w-72 h-72 ml-20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96'></span>
      <span className='block bg-[#fed800ae] w-72 h-72 mt-16 ml-2 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96'></span>
      <span className='block bg-[#04868b] w-72 h-72 mt-32 ml-2 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96'></span>
    </div>
  );
};

export default BgGlassmorphism;
