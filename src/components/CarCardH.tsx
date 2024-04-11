import React, { FC } from 'react';
import { DEMO_CAR_LISTINGS } from '@/data/listings';
import { CarDataType } from '@/data/types';
import StartRating from '@/components/StartRating';
import BtnLikeIcon from '@/components/BtnLikeIcon';
import SaleOffBadge from '@/components/SaleOffBadge';
import Badge from '@/shared/Badge';
import Avatar from '@/shared/Avatar';
import GallerySlider from '@/components/GallerySlider';
import Image from 'next/image';
import Link from 'next/link';
import ButtonPrimary from '@/shared/ButtonPrimary';

export interface CarCardHProps {
  className?: string;
  data?: CarDataType;
}

const DEMO_DATA: CarDataType = DEMO_CAR_LISTINGS[0];

const CarCardH: FC<CarCardHProps> = ({ className = '', data = DEMO_DATA }) => {
  const {
    galleryImgs,
    title,
    href,
    like,
    saleOff,
    isAds,
    price,
    reviewStart,
    reviewCount,
    seats,
    gearshift,
  } = data;

  const renderSliderGallery = () => {
    return (
      <div className='relative w-full flex items-center justify-center md:w-[45%] flex-shrink-0 border-r border-neutral-200/80 dark:border-neutral-700'>
        <div className='w-full'>
          <GallerySlider
            ratioClass='aspect-w-6 aspect-h-4'
            galleryImgs={galleryImgs}
            href={href}
          />
        </div>
        <BtnLikeIcon isLiked={like} className='absolute right-3 top-3' />
        {saleOff && <SaleOffBadge className='absolute left-3 top-3' />}
      </div>
    );
  };

  const renderContent = () => {
    return (
      // <div className='flex-grow p-3 sm:p-5 flex flex-col justify-between h-full'>
      //   <div className='space-y-2'>
      //     <div className='flex justify-between items-center'>
      //       <div className='flex items-center space-x-2'>
      //         {isAds && <Badge name='ADS' color='green' />}
      //         <h2 className='text-xl font-semibold capitalize'>
      //           <span className='line-clamp-1'>{title}</span>
      //         </h2>
      //       </div>
      //       <StartRating reviewCount={reviewCount} point={reviewStart} />
      //     </div>
      //   </div>
      //   {/* <div className='hidden sm:block w-14 border-b border-neutral-200/80 dark:border-neutral-700 my-4'></div> */}
      //   {/* SHOW MOBILE */}
      //   <div className='flex sm:hidden items-center text-sm text-neutral-500 dark:text-neutral-400 space-x-2 mt-4 sm:mt-0'>
      //     <span>4 seats</span>
      //     <span>· </span>
      //     <span>Auto gearbox</span>
      //     <span>· </span>
      //     <span>4 seats</span>
      //   </div>
      //   {/* SHOW DESK */}
      //   <div className='hidden sm:flex items-center space-x-8'>
      //     <ul className='flex justify-between items-center w-full'>
      //       <li className='p-2 m-0 text-center flex-grow'>
      //         <i className='las text-[#279155] la-user-friends text-[32px] inline-block mb-1'></i>
      //         <span className='block text-sm max-width mx-auto'>8 Pass</span>
      //       </li>
      //       <li className='p-2 m-0 text-center flex-grow'>
      //         <i className='las text-[#279155] la-shopping-bag text-[32px] inline-block mb-1'></i>
      //         <span className='block text-sm max-width mx-auto'> 5 Bag </span>
      //       </li>
      //       <li className='p-2 m-0 text-center flex-grow'>
      //         <i className='las text-[#279155] la-tachometer-alt text-[32px] inline-block mb-1'></i>
      //         <span className='block text-sm max-width mx-auto'> 100km </span>
      //       </li>
      //       <li className='p-2 m-0 text-center flex-grow'>
      //         <i className='las text-[#279155] la-gas-pump text-[32px] inline-block mb-1'></i>
      //         <span className='block text-sm max-width mx-auto'>Petrol</span>
      //       </li>
      //       <li className='p-2 m-0 text-center flex-grow'>
      //         <i className='las text-[#279155] la-cog text-[32px] inline-block mb-1'></i>
      //         <span className='block text-sm max-width mx-auto'> Auto </span>
      //       </li>
      //     </ul>
      //   </div>

      //   {/* <div className='w-14 border-b border-neutral-200/80 dark:border-neutral-700 my-4'></div> */}
      //   <div className='flex justify-between items-end'>
      //     <span className='text-3xl font-semibold text-primary-400'>
      //       {price}
      //     </span>
      //     <ButtonPrimary>Buy</ButtonPrimary>
      //   </div>
      // </div>

      <div className='h-full flex justify-between flex-col p-5  space-y-4'>
        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center space-x-2'>
              {isAds && <Badge name='ADS' color='green' />}
              <h2 className='text-xl font-semibold'>
                <span className='line-clamp-1'>{title}</span>
              </h2>
            </div>
            <StartRating reviewCount={reviewCount} point={reviewStart} />
          </div>
          <div className='flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2'>
            <span className=''>{seats} seats</span>
            <span>-</span>
            <span className=''>{gearshift} </span>
          </div>

          <div className='columns-1 md:columns-2'>
            <span className='flex items-center gap-2 pt-2'>
              <svg fill='#22804A' height='24' width='24' viewBox='0 0 24 24'>
                <path d='M8,10H16V18H11L9,16H7V11M7,4V6H10V8H7L5,10V13H3V10H1V18H3V15H5V18H8L10,20H18V16H20V19H23V9H20V12H18V8H12V6H15V4H7Z'></path>
              </svg>
              Engine
            </span>
            <span className='flex items-center gap-2 pt-2'>
              <i className='las la-gas-pump text-2xl text-[#22804A]'></i> Hybrid
            </span>
            <span className='flex items-center gap-2 pt-2'>
              <i className='las la-tachometer-alt text-2xl text-[#22804A]'></i>
              6.1km/ 1 Litre
            </span>
            <span className='flex items-center gap-2 pt-2'>
              <svg
                height='18'
                width='18'
                fill='#22804A'
                id='Layer_1'
                data-name='Layer 1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 122.88 122.88'
              >
                <path d='M61.44,0A61.46,61.46,0,1,1,18,18,61.23,61.23,0,0,1,61.44,0Zm4.07,82.09a6.67,6.67,0,1,1-8.14,0V68.62H42.31V82.09a6.67,6.67,0,1,1-8.14,0V46.17a6.67,6.67,0,1,1,8.14,0V60.48H57.37V46.17a6.67,6.67,0,1,1,8.14,0V60.48H80.57V46.17a6.67,6.67,0,1,1,8.14,0V64a4.41,4.41,0,0,1,0,.52,4.07,4.07,0,0,1-4.07,4.07H65.51V82.09Zm33-57.76a52.46,52.46,0,1,0,15.38,37.11A52.29,52.29,0,0,0,98.55,24.33Z' />
              </svg>
              Automatic
            </span>
          </div>
        </div>
        <div className='w-14  border-b border-neutral-100 dark:border-neutral-800'></div>
        <div className='flex justify-between items-end'>
          <span className='text-3xl font-semibold text-primary-400'>
            {price}
          </span>
          <ButtonPrimary>Buy</ButtonPrimary>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`relative bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700 rounded-2xl overflow-hidden ${className}`}
    >
      <div className='flex flex-col md:flex-row'>
        {renderSliderGallery()}
        <Link href={href} className='w-full'>
          {renderContent()}
        </Link>
      </div>
    </div>
  );
};

export default CarCardH;
