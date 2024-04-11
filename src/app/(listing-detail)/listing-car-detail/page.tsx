'use client';

import React, { FC } from 'react';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import StartRating from '@/components/StartRating';
import Avatar from '@/shared/Avatar';
import Badge from '@/shared/Badge';
import ButtonPrimary from '@/shared/ButtonPrimary';
import Image from 'next/image';
import { Amenities_demos, includes_demo, PHOTOS } from './constant';
import LikeSaveBtns from '@/components/LikeSaveBtns';
import { usePathname, useRouter } from 'next/navigation';
import { Route } from 'next';

export interface ListingCarDetailPageProps {}

const ListingCarDetailPage: FC<ListingCarDetailPageProps> = ({}) => {
  // USE STATE

  const thisPathname = usePathname();
  const router = useRouter();

  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
  };

  const renderSection1 = () => {
    return (
      <div className='listingSection__wrap !space-y-6'>
        {/* 1 */}
        <div className='flex justify-between items-center'>
          <Badge color='pink' name='BMW car' />
          <LikeSaveBtns />
        </div>

        {/* 2 */}
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold'>
          BMW 3 Series Sedan
        </h2>

        {/* 3 */}
        <div className='flex items-center space-x-4'>
          <StartRating />
          <span>·</span>
          <span>
            <i className='las la-map-marker-alt'></i>
            <span className='ml-1'> Tokyo, Jappan</span>
          </span>
        </div>

        {/* 4 */}
        <div className='flex items-center'>
          <Avatar hasChecked sizeClass='h-10 w-10' radius='rounded-full' />
          <span className='ml-2.5 text-neutral-500 dark:text-neutral-400'>
            Car owner{' '}
            <span className='text-neutral-900 dark:text-neutral-200 font-medium'>
              Kevin Francis
            </span>
          </span>
        </div>

        {/* 5 */}
        <div className='w-full border-b border-neutral-100 dark:border-neutral-700' />

        {/* 6 */}
        <div className='flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300'>
          <div className='flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 '>
            <i className='las la-user-friends text-2xl'></i>
            <span className=''>4 seats</span>
          </div>
          <div className='flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 '>
            <i className='las la-dharmachakra text-2xl'></i>
            <span className=''> Auto gearbox</span>
          </div>
          <div className='flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 '>
            <i className='las la-suitcase text-2xl'></i>
            <span className=''> 2 bags</span>
          </div>
        </div>
      </div>
    );
  };

  //
  const renderSectionTienIch = () => {
    return (
      <div className='listingSection__wrap'>
        <div>
          <h2 className='text-2xl font-semibold'>
            Vehicle parameters & utilities{' '}
          </h2>
          <span className='block mt-2 text-neutral-500 dark:text-neutral-400'>
            Questions are at the heart of making things great.
          </span>
        </div>
        <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>
        {/* 6 */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 '>
          {/* TIEN ICH 1 */}
          {Amenities_demos.map((item, index) => (
            <div key={index} className='flex items-center space-x-4 '>
              <div className='w-10 flex-shrink-0'>
                <Image src={item.icon} alt='' />
              </div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className='listingSection__wrap'>
        <h2 className='text-2xl font-semibold'>Car descriptions</h2>
        <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>
        <div className='text-neutral-600 dark:text-neutral-300'>
          <p>
            Until the all-new TUCSON hits the dealer showrooms you can check it
            out in our Showroom Walkaround video. Watch the video and join our
            product specialist as he gives you an up-close look of our latest
            SUV
            <br />
            <br />
            Questions are at the heart of making things great. Watch our
            celebrity-filled TV ad and you’ll see that when we say “everything,”
            we mean everything.
          </p>
        </div>
      </div>
    );
  };

  const renderSection3 = () => {
    return (
      <div className='listingSection__wrap'>
        <div>
          <h2 className='text-2xl font-semibold'>Include </h2>
          <span className='block mt-2 text-neutral-500 dark:text-neutral-400'>
            Included in the price
          </span>
        </div>
        <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>
        {/* 6 */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-neutral-700 dark:text-neutral-300 '>
          {includes_demo
            .filter((_, i) => i < 12)
            .map((item) => (
              <div key={item.name} className='flex items-center space-x-3'>
                <i className='las la-check-circle text-2xl'></i>
                <span>{item.name}</span>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const renderSidebarPrice = () => {
    return (
      <div className='listingSectionSidebar__wrap shadow-xl'>
        {/* PRICE */}
        <div className='flex justify-between'>
          <span className='text-3xl font-semibold'>
            $19
            <span className='ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400'>
              /day
            </span>
          </span>
          <StartRating />
        </div>

        {/* SUM */}
        <div className='flex flex-col space-y-4 '>
          <div className='flex justify-between text-neutral-600 dark:text-neutral-300'>
            <span>$19 x 3 day</span>
            <span>$57</span>
          </div>

          <div className='border-b border-neutral-200 dark:border-neutral-700'></div>
          <div className='flex justify-between font-semibold'>
            <span>Total</span>
            <span>$199</span>
          </div>
        </div>

        {/* SUBMIT */}
        <ButtonPrimary>Reserve</ButtonPrimary>
      </div>
    );
  };

  return (
    <div className={` nc-ListingCarDetailPage `}>
      {/* SINGLE HEADER */}
      <header className='rounded-md sm:rounded-xl'>
        <div className='relative grid grid-cols-4 gap-1 sm:gap-2'>
          <div
            className='col-span-2 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer'
            onClick={handleOpenModalImageGallery}
          >
            <Image
              fill
              src={PHOTOS[0]}
              alt='photo 0'
              className='object-cover rounded-md sm:rounded-xl'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
            />
            <div className='absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity'></div>
          </div>

          {/*  */}
          <div
            className='col-span-1 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer'
            onClick={handleOpenModalImageGallery}
          >
            <Image
              fill
              className='object-cover rounded-md sm:rounded-xl'
              src={PHOTOS[1]}
              alt='photo 1'
              sizes='400px'
            />
            <div className='absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity'></div>
          </div>

          {/*  */}
          {PHOTOS.filter((_, i) => i >= 2 && i < 4).map((item, index) => (
            <div
              key={index}
              className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                index >= 2 ? 'block' : ''
              }`}
            >
              <div className='aspect-w-4 aspect-h-3'>
                <Image
                  fill
                  className='object-cover w-full h-full rounded-md sm:rounded-xl '
                  src={item || ''}
                  alt='photos'
                  sizes='400px'
                />
              </div>

              {/* OVERLAY */}
              <div
                className='absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer'
                onClick={handleOpenModalImageGallery}
              />
            </div>
          ))}

          <div
            className='absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10'
            onClick={handleOpenModalImageGallery}
          >
            <Squares2X2Icon className='h-5 w-5' />

            <span className='ml-2 text-neutral-800 text-sm font-medium'>
              Show all photos
            </span>
          </div>
        </div>
      </header>

      {/* MAIn */}
      <main className=' relative z-10 mt-11 flex flex-col lg:flex-row '>
        {/* CONTENT */}
        <div className='w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10'>
          {renderSection1()}
          {renderSectionTienIch()}
          {renderSection2()}
          {renderSection3()}
        </div>

        {/* SIDEBAR */}
        <div className='block flex-grow mt-14 lg:mt-0'>
          <div className='hidden lg:block sticky top-28'>
            {renderSidebarPrice()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingCarDetailPage;
