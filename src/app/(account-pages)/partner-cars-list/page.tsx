'use client';

import { Suspense, useEffect, useState } from 'react';
import { CatalogPartner } from './(components)/CatalogPartner';
import { ProtectedRoute, UserRole } from '@/utils/protectedRoute';
import LoadingSpinner from '@/shared/LoadingSpinner';
import { ICarsPartner, IPartnerResponse } from '@/types/partner';
import { getPartnerCars } from '@/api/cars';
import ErrorComponent from '@/components/ErrorComponent';
import { ButtonPrimary } from '@/shared/Buttons';
import { getPartner } from '@/api/partner';


const PartnerCarsListPage = () => {
  const [isFirstLoading, setFirstLoading] = useState(true);
  const [isError, setError] = useState(false)
  const [carListData, setCarListData] = useState<ICarsPartner[]>([]);
  const [partner, setPartner] = useState<IPartnerResponse>();

  useEffect(() => {
    if(isFirstLoading){
      Promise.all(([getPartner(), getPartnerCars(1, 10)]))
        .then(([partner, carListdata]) => {
          partner && carListdata && (setPartner(partner), setCarListData(carListdata));
        })
        .finally(() => {
          isFirstLoading && setFirstLoading(false);
        }); 
    }
  },[isFirstLoading]);

  return isFirstLoading ? (
    <div className='h-[calc(100vh-76px)] flex justify-center items-center'>
      <div className='-mt-[76px]'>
        <LoadingSpinner className='w-12' />
      </div>
    </div>
  ) : isError ? (
    <div className='h-[calc(100vh-76px)] flex justify-center items-center'>
      <ErrorComponent />
    </div>
  ) :(
    <div className='w-full'>
      {carListData && 
        (carListData.length > 0 
          ? (
              <Suspense
                fallback={
                  <div className='h-[calc(100vh-76px)] flex justify-center items-center'>
                    <div className='-mt-[76px]'>
                      <LoadingSpinner className='w-12' />
                    </div>
                  </div>
                }
              >
                <div>
                  <h1 className="mb-2">Your Cars</h1>
                  <ProtectedRoute role={UserRole.partner}>
                    <CatalogPartner carListData={carListData} />
                  </ProtectedRoute>
                </div>
              </Suspense>
            )
          : (
              <div className='h-[40vh] flex justify-center items-center flex-col bg-white/50 dark:bg-neutral-800/60'>
                <h3 className='text-2xl'>You have no added the cars</h3>
                {
                  partner?.is_verified && 
                  <ButtonPrimary className='mt-6' href='/partner-cars'>
                    Add car
                  </ButtonPrimary>
                }
              </div>
            )
        )

      }
    </div>

  );
};

export default PartnerCarsListPage;
