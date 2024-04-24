import React, { FC } from 'react';
import { DEMO_CARS_LIST } from '@/data/listings';
import { CarDataType } from '@/data/types';
import BtnLikeIcon from '@/components/BtnLikeIcon';
import SaleOffBadge from '@/components/SaleOffBadge';
import Badge from '@/shared/Badge';
import CardImagesSlider from '@/components/CardImagesSlider';
import Image from 'next/image';
import Link from 'next/link';
import ButtonPrimary from '@/shared/ButtonPrimary';
import numberWithComma from '@/utils/numberWithComma';

export interface CarCardProps {
  className?: string;
  data?: CarDataType;
  size?: 'default' | 'small';
}

const DEMO_DATA: CarDataType = DEMO_CARS_LIST[0];

const CarCard: FC<CarCardProps> = ({
  size = 'small',
  className = '',
  data = DEMO_DATA,
}) => {
  const {
    featuredImage,
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
      <div className='relative w-full overflow-hidden'>
        <CardImagesSlider
          ratioClass='aspect-w-4 aspect-h-3'
          galleryImgs={galleryImgs}
          href={href}
          galleryClass='rounded-xl'
        />
        {/* <BtnLikeIcon isLiked={like} className='absolute right-3 top-3 z-[1]' /> */}
        {/* {saleOff && <SaleOffBadge className='absolute left-3 top-3' />} */}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === 'default' ? 'p-5  space-y-4' : 'p-3  space-y-2'}>
        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center space-x-2'>
              {/* {isAds && <Badge name='ADS' color='green' />} */}
              <h2 className='capitalize text-xl font-semibold'>
                <span className='line-clamp-1'>{title}</span>
              </h2>
            </div>
            <span className='text-xl font-semibold'>2024</span>
          </div>
          {/* <div className='flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2'>
            <span className=''>{seats} seats</span>
            <span>-</span>
            <span className=''>{gearshift} </span>
          </div> */}

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

        {/* <div className='w-14 border-b border-neutral-100 dark:border-neutral-800'></div> */}
        <div className='space-y-2 py-3'>
          <div className='flex items-center'>
            <span className=''>exterior color:</span>
            <span className='w-6 h-6 mx-2 rounded-full inline-block border border-black dark:border-white bg-[#fff]'></span>
            <span className=''> - white</span>
          </div>
          <div className='flex items-center'>
            <span className=''>interior color:</span>
            <span className='w-6 h-6 mx-2 rounded-full inline-block border border-black dark:border-white bg-[#000]'></span>
            <span className=''> - black</span>
          </div>
        </div>
        {/* <div className='w-14 border-b border-neutral-100 dark:border-neutral-800'></div> */}

        <div className='h-3 border-t border-dashed border-neutral-200 dark:border-neutral-700'></div>
        <div className='flex justify-between items-center'>
          <span className='text-3xl font-semibold text-primary-400'>
            {numberWithComma(price)}€
          </span>
          <ButtonPrimary>More</ButtonPrimary>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`relative hover:shadow-lg border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 ${className}`}
      data-nc-id='CarCard'
    >
      <div className='relative rounded-2xl p-2'>
        {renderSliderGallery()}
        <Link href={href}>{renderContent()}</Link>
      </div>
    </div>
  );
};

export default CarCard;
