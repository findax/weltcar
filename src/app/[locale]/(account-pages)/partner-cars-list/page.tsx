'use client';

import { Suspense, useEffect, useState } from 'react';
import { CatalogPartner } from './(components)/CatalogPartner';
import { ProtectedRoute, UserRole } from '@/utils/protectedRoute';
import LoadingSpinner from '@/shared/LoadingSpinner';
import { ICatalogPartner, IPartnerResponse } from '@/types/partner';
import { getPartnerCars } from '@/api/cars';
import ErrorComponent from '@/components/ErrorComponent';
import { ButtonPrimary } from '@/shared/Buttons';
import { getPartner } from '@/api/partner';
import { useLocale, useTranslations } from 'next-intl';
import { NextRoute } from '@/types/routers';
import { useQueryParams } from '@/hooks/useQueryParams';


const PartnerCarsListPage = () => {
  const { currentPage } = useQueryParams();
  const translate = useTranslations();
  const locale = useLocale();
  const [isFirstLoading, setFirstLoading] = useState(true);
  const [isError, setError] = useState(false)
  const [carListData, setCarListData] = useState({} as ICatalogPartner);
  const [partner, setPartner] = useState<IPartnerResponse>();

  useEffect(() => {
    Promise.all(([getPartner(locale), getPartnerCars(currentPage as number, 12, locale)]))
      .then(([partner, carListdata]) => {
        if(partner && carListdata) {
          setPartner(partner);
          setCarListData(carListdata);
        } else {
          setError(true);
        }
      })
      .finally(() => {
        isFirstLoading && setFirstLoading(false);
      }); 
  },[currentPage]);

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
      {carListData.data && 
        (carListData?.data.length > 0 
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
                  <h1 className="mb-4 text-2xl lg:text-4xl font-bold">{translate('yourCars.title')}</h1>
                  <ProtectedRoute role={UserRole.partner}>
                    <CatalogPartner 
                      carListData={carListData?.data || []} 
                      results={carListData?.meta.total || 0}
                    />
                  </ProtectedRoute>
                </div>
              </Suspense>
            )
          : (
              <div className='h-[40vh] flex justify-center items-center flex-col bg-white/50 dark:bg-neutral-800/60'>
                <h3 className='text-2xl'>{translate('yourCars.nocars.title')}</h3>
                {
                  partner?.is_verified && 
                  <ButtonPrimary className='mt-6' href={`/${locale}/partner-cars` as NextRoute}>
                    {translate('yourCars.button.addCar')}
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
