import { Suspense } from 'react';
import LoadingSpinner from '@/shared/LoadingSpinner';
import Catalog from './(components)/Catalog';

export default function CatalogPage() {
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
