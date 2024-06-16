import { Suspense } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Route } from 'next';
import CarDetailsGallery from './(car-details-gallery)/CarDetailsGallery';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { ICarGallery } from '@/types/cardetails';

export default function ImagesHeader({ images }: { images: ICarGallery[] }) {
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

      <div className='mt-8 md:mt-11 rounded-md sm:rounded-xl'>
        <div className='relative grid grid-rows-3 grid-cols-2 md:grid-rows-2 md:grid-cols-4 gap-1 sm:gap-2'>
          <div
            className='bg-img-placeholder relative row-span-2 col-span-2 md:col-span-3 rounded-md sm:rounded-xl overflow-hidden cursor-pointer'
            onClick={handleOpenModalImageGallery}
          >
            <Image
              fill
              src={images[0].url}
              alt='car image'
              className='object-cover rounded-md sm:rounded-xl transition-opacity opacity-0 duration-[1s]'
              onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
              priority
            />
            <div className='absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity'></div>
          </div>

          {/*  */}
          {images
            .filter((_, i) => i >= 1 && i < 3)
            .map((item, index) => (
              <div
                key={index}
                className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                  index >= 2 ? 'block' : ''
                }`}
              >
                <div className='bg-img-placeholder aspect-w-16 aspect-h-9 md:aspect-w-4 md:aspect-h-3'>
                  <Image
                    fill
                    src={item.url}
                    alt='car image'
                    className='object-cover w-full h-full rounded-md sm:rounded-xl transition-opacity opacity-0 duration-[1s]'
                    onLoad={(e) =>
                      e.currentTarget.classList.remove('opacity-0')
                    }
                    sizes='400px'
                  />

                  {/* OVERLAY */}
                  <div
                    className='absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer'
                    onClick={handleOpenModalImageGallery}
                  />
                </div>
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
