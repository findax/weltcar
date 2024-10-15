'use client';

import { useEffect, useState } from 'react';
import { getPartnerCarId } from '@/api/cars';
import PartnerCarDetails from './(components)/BlogDetails';
import { ICarPartner } from '@/types/partner';
import { notFound } from 'next/navigation';
import { Article } from '@/types/blogDetails';
import { getBlogsBySlug } from '@/api/blog';
import BlogDetails from './(components)/BlogDetails';

export default function BlogDetailsPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const [blogData, setBlogData] = useState<Article | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBlogsBySlug(slug);
        if (res) {
          setBlogData(res);
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

  if ((hasError && !blogData) || hasError) return notFound();

  return <BlogDetails blogData={blogData} />
}
