'use client';

import CarImagesGallery from '@/components/car-images-gallery/CarImagesGallery';
import React, { ReactNode, Suspense } from 'react';
import MobileFooterSticky from './(components)/MobileFooterSticky';
import { CarImageGallery } from './car-details/constant';

const CarDetailsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='CarDetailsPage'>
      <Suspense>
        <CarImagesGallery images={CarImageGallery} />
      </Suspense>

      <div className='container CarDetailsPage__content'>{children}</div>

      {/* STICKY FOOTER MOBILE */}
      <MobileFooterSticky />
    </div>
  );
};

export default CarDetailsLayout;
