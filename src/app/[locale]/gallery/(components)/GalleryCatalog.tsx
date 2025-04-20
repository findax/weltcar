'use client'

import { useEffect, useState } from 'react';
import LoadingSpinner from '@/shared/LoadingSpinner';
import ErrorComponent from '@/components/ErrorComponent';
import { useLocale, useTranslations } from 'next-intl';
import { getGalleries } from '@/api/gallery';
import { GalleryCarMedia } from '@/types/gallery';
import GalleryList from './GalleryList';

const GalleryCatalog = () => {
  const [isFirstLoading, setFirstLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [galleries, setGalleries] = useState([] as GalleryCarMedia[]);

  const translate = useTranslations();
  const locale = useLocale();

  useEffect(() => {
    getGalleries(locale)
      .then((data) => {
        if (data) {
          setGalleries(data as GalleryCarMedia[]);
        } else {
          setError(true);
        }
      })
      .finally(() => {
        isFirstLoading && setFirstLoading(false);
      });
  }, []);

  return isFirstLoading ? (
    <div className='h-[calc(100vh-76px)] w-full flex justify-center items-center'>
      <div className='-mt-[76px]'>
        <LoadingSpinner className='w-12' />
      </div>
    </div>
  ) : isError ? (
    <div className='h-[calc(100vh-76px)] flex justify-center items-center'>
      <ErrorComponent />
    </div>
  ) : (
    <GalleryList
      galleries={galleries || []}
      // results={blogData?.meta.total || 0}
      translate={translate}
    />
  );
};

export default GalleryCatalog;
