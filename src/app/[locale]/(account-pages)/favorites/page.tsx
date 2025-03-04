'use client';

import { Suspense, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { IFavoritesCarsDetails } from '@/types/favorites';
import { getFavoritesCars } from '@/api/favorites';
import LoadingSpinner from '@/shared/LoadingSpinner';
import ErrorComponent from '@/components/ErrorComponent';
import { CatalogFavorites } from './(components)/CatalogFavorites';
import { ButtonPrimary } from '@/shared/Buttons';
import { NextRoute } from '@/types/routers';

const FavoritesPage = () => {
  const translate = useTranslations();
  const locale = useLocale();
  const [favoritesCars, setFavoritesCars] = useState<IFavoritesCarsDetails[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchFavoritesCars = () => {
    setIsLoading(true);
    setIsError(false);

    getFavoritesCars(locale)
      .then((res) => {
        if (res) {
          setFavoritesCars(res as IFavoritesCarsDetails[]);
        } else {
          setIsError(true);
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchFavoritesCars();
  }, []);

  return (
    <div className='relative min-h-[540px] space-y-10 md:space-y-14 lg:min-h-[650px] xl:min-h-[600px]'>
      {/* HEADING */}
      <h2 className='text-2xl lg:text-4xl font-bold'>{translate('favorites.title.favorites')}</h2>

      {isLoading ? (
        <div className='w-full h-96 flex justify-center items-center'>
          <div className='-mt-[76px]'>
            <LoadingSpinner className='w-12' />
          </div>
        </div>
      ) : isError ? (
        <ErrorComponent />
      ) : (
        <div className='w-full'>
          {favoritesCars && 
            (favoritesCars.length > 0 
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
                    <CatalogFavorites 
                      carListData={favoritesCars} 
                      fetchFavoritesCars={fetchFavoritesCars}
                    />
                  </Suspense>
                )
              : (
                  <div className='h-[40vh] flex justify-center items-center flex-col bg-white/50 dark:bg-neutral-800/60'>
                    <h3 className='text-2xl'>{translate('favorites.nocars.title')}</h3>
                      <ButtonPrimary className='mt-6' href={`/${locale}/catalog` as NextRoute}>
                        {translate('favorites.button.addCar')}
                      </ButtonPrimary>
                  </div>
                )
            )
          }
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
