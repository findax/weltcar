'use client';

import ListingImageGallery from '@/components/listing-image-gallery/ListingImageGallery';
import React, { ReactNode, Suspense } from 'react';
import MobileFooterSticky from './(components)/MobileFooterSticky';
import { imageGallery as listingCarImageGallery } from './listing-car-detail/constant';

const DetailtLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='ListingDetailPage'>
      <Suspense>
        <ListingImageGallery images={listingCarImageGallery} />
      </Suspense>

      <div className='container ListingDetailPage__content'>{children}</div>

      {/* STICKY FOOTER MOBILE */}
      <MobileFooterSticky />
    </div>
  );
};

export default DetailtLayout;
