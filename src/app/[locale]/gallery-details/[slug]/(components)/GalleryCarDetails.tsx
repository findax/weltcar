'use client';

import Breadcrumbs from '@/components/Breadcrumbs';
import LoadingSpinner from '@/shared/LoadingSpinner';
import { GalleryCarMedia } from '@/types/gallery';
import { useEffect, useState } from 'react';
import GalleryMedia from './GalleryMedia';
import { ICarGallery, ICarVideos } from '@/types/cardetails';
import GalleryTitle from './GalleryTitle';

interface IPages {
  pageName: string;
  pageHref: string;
};

export default function GalleryCarDetails({
  galleryData,
}: {
  galleryData: GalleryCarMedia | null;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [galleryImages, setGalleryImages] = useState<ICarGallery[]>([]);
  const [galleryVideos, setGalleryVideos] = useState<ICarVideos[]>([]);
  const [brandCar, setBrandCar] = useState<string>('');
  const [breadcrumbsPages, setBreadcrumbsPages] = useState<IPages[]>([
    {
      pageName: 'gallery.breadcrump.main',
      pageHref: '/'
    },
    {
      pageName: 'gallery.breadcrump.gallery',
      pageHref: '/gallery'
    }
  ]);

  useEffect(() => {
    if (galleryData) {
      const modifiedImagesArray = [...galleryData.images].map((item, index) => ({
        id: index,
        url: item.original,
      }));
      setGalleryImages(modifiedImagesArray);
      setGalleryVideos(galleryData.videos);
      const newBreadcrumpTitle = `${galleryData.name} ${galleryData.images[0].title}`
      setBrandCar(newBreadcrumpTitle);
      setBreadcrumbsPages((prevPages) => {
        const isTitleExists = prevPages.some(
          (page) => page.pageName === newBreadcrumpTitle
        );

        if (!isTitleExists) {
          return [...prevPages, { pageName: newBreadcrumpTitle, pageHref: '' }];
        }
        return prevPages;
      });
      setIsLoading(false);
    }
  }, [galleryData]);

  return isLoading ? (
    <div className='h-[calc(100vh-76px)] flex justify-center items-center'>
      <div className='-mt-[76px]'>
        <LoadingSpinner className='w-12' />
      </div>
    </div>
  ) : (
    <div className='container'>
      <div className='mt-8'>
        <Breadcrumbs pages={breadcrumbsPages} />
      </div>
      <GalleryTitle brand={brandCar} year='2024' />
      {galleryImages && 
        <div className='mt-12 mb-44'>
          <GalleryMedia images={galleryImages} videos={galleryVideos}/>
        </div>
      }
    </div>
  );
}
