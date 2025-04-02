import { Metadata } from 'next';
import { Suspense } from 'react';
import LoadingSpinner from '@/shared/LoadingSpinner';
import CatalogHidden from './(components)/CatalogHidden';

export const metadata: Metadata = {
  title: 'Luxury Car Catalog | Browse Our Elite Vehicle Collection | WeltCar',
  description:
    'Explore our extensive catalog of elite cars available for global delivery. Find your dream car from top brands, with special services for Germany, Switzerland, Dubai, and China.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className='h-[calc(100vh-76px)] flex justify-center items-center'>
          <div className='-mt-[76px]'>
            <LoadingSpinner className='w-12' />
          </div>
        </div>
      }
    >
      <CatalogHidden />
    </Suspense>
  );
}
