import { Metadata } from 'next';
import { Suspense } from 'react';
import LoadingSpinner from '@/shared/LoadingSpinner';
import Catalog from './(components)/Catalog';

export const metadata: Metadata = {
  title: 'Luxury Car Catalog | Browse Our Elite Vehicle Collection',
  description:
    'Explore our extensive catalog of elite cars available for global delivery. Find your dream car from top brands, with special services for Germany, Switzerland, Dubai, and China.',
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
      <Catalog />
    </Suspense>
  );
}
