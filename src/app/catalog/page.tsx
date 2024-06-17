import { Metadata } from 'next';
import api from '@/api/apiInstance';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import LoadingSpinner from '@/shared/LoadingSpinner';
import Catalog from './(components)/Catalog';

export const metadata: Metadata = {
  title: 'WeltCar - Catalog',
};

async function getCarsList() {
  try {
    const res = await api.post('/api/cars/list');
    if (!res) return undefined;
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const revalidate = 180; // revalidate at most every 3 minutes

export default async function CatalogPage() {
  const carListData = await getCarsList();

  if (!carListData) return notFound();

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
      <Catalog carListData={carListData} />
    </Suspense>
  );
}
