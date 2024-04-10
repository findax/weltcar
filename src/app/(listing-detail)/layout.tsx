'use client';

import BackgroundSection from '@/components/BackgroundSection';
import ListingImageGallery from '@/components/listing-image-gallery/ListingImageGallery';
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories';
import SectionSubscribe2 from '@/components/SectionSubscribe2';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ReactNode } from 'react';
import MobileFooterSticky from './(components)/MobileFooterSticky';
import { imageGallery as listingCarImageGallery } from './listing-car-detail/constant';
import { Route } from 'next';

const DetailtLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const thisPathname = usePathname();
  const searchParams = useSearchParams();
  const modal = searchParams?.get('modal');

  const handleCloseModalImageGallery = () => {
    let params = new URLSearchParams(document.location.search);
    params.delete('modal');
    router.push(`${thisPathname}/?${params.toString()}` as Route);
  };

  return (
    <div className='ListingDetailPage'>
      <ListingImageGallery
        isShowModal={modal === 'PHOTO_TOUR_SCROLLABLE'}
        onClose={handleCloseModalImageGallery}
        images={listingCarImageGallery}
      />

      <div className='container ListingDetailPage__content'>{children}</div>

      {/* STICKY FOOTER MOBILE */}
      <MobileFooterSticky />
    </div>
  );
};

export default DetailtLayout;
