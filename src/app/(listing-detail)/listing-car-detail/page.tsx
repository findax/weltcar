'use client';

import React, { FC } from 'react';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import ButtonPrimary from '@/shared/ButtonPrimary';
import Image from 'next/image';
import { Amenities_demos, PHOTOS } from './constant';
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

  const renderSidebarPrice = () => {
    return (
      <div className='listingSectionSidebar__wrap shadow-xl'>
        {/* PRICE */}
        <div className='flex justify-between'>
          <span className='text-3xl font-semibold'>$190,000</span>
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
      <main className=' relative z-10 my-11 flex flex-col lg:flex-row '>
        {/* CONTENT */}
        <div className='w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10'>
          {renderSectionTienIch()}
          {renderSection2()}
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
