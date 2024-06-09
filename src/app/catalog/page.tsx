import { Suspense } from 'react';
import LoadingSpinner from '@/shared/LoadingSpinner';
import Catalog from './(components)/Catalog';

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className='w-full h-[calc(100vh-76px)] flex justify-center items-center'>
          <LoadingSpinner className='w-12' />
        </div>
      }
    >
      <Catalog />
    </Suspense>
  );
}
