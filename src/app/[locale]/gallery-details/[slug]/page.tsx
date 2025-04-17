'use client'

import { getGalleryById } from '@/api/gallery';
import { GalleryCarMedia } from '@/types/gallery';
import { Metadata } from 'next';
import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import GalleryCarDetails from './(components)/GalleryCarDetails';

const metadata: Metadata = {
  title: 'Gallery by id',
  description:
    'Gallery by id',
};

export default  function GalleryDetailsPage({
  params: { slug }
} : {
  params: { slug: string };
}) {
  const [galleryData, setGalleryData] = useState<GalleryCarMedia | null>(null);
  const [hasError, setHasError] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getGalleryById(slug, locale);
        if (res) {
          setGalleryData(res);
        } else {
          setHasError(true);
        }
      } catch (error) {
        setHasError(true);
      } finally {
      }
    };

    fetchData();
  }, [slug]);

  if ((hasError && !galleryData) || hasError) return notFound();
  
  return <GalleryCarDetails galleryData={galleryData} />;
}
