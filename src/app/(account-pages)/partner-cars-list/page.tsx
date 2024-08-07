'use client';

import { Suspense } from 'react';
import { CatalogPartner } from './(components)/CatalogPartner';
import { ProtectedRoute, UserRole } from '@/utils/protectedRoute';
import LoadingSpinner from '@/shared/LoadingSpinner';


const PartnerCarsListPage = () => {
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
      <ProtectedRoute role={UserRole.partner}>
        <CatalogPartner />
      </ProtectedRoute>
    </Suspense>
  );
};

export default PartnerCarsListPage;
