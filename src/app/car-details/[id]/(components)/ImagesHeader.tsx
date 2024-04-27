import { Suspense } from 'react';
import CarDetailsGallery from './(car-details-gallery)/CarDetailsGallery';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import type { CarGalleryImage } from '@/data/types';
import { usePathname, useRouter } from 'next/navigation';
import { Route } from 'next';

export default function ImagesHeader({
  images,
}: {
  images: CarGalleryImage[];
}) {
  const thisPathname = usePathname();
  const router = useRouter();

  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=CAR_PHOTO_TOUR` as Route);
  };

  return (
    <>
      <Suspense>
        <CarDetailsGallery images={images} />
      </Suspense>

      <div className='rounded-md sm:rounded-xl'>
        <div className='relative grid grid-cols-4 gap-1 sm:gap-2'>
          <div
            className='col-span-2 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer'
            onClick={handleOpenModalImageGallery}
          >
            <Image
              fill
              src={images[0].url}
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
              src={images[1].url}
              alt='photo 1'
              sizes='400px'
            />
            <div className='absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity'></div>
          </div>

          {/*  */}
          {images
            .filter((_, i) => i >= 2 && i < 4)
            .map((item, index) => (
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
                    src={item.url || ''}
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
      </div>
    </>
  );
}
