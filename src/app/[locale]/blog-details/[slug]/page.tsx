'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Article } from '@/types/blogDetails';
import { getBlogsBySlug } from '@/api/blog';
import BlogDetails from './(components)/BlogDetails';
import { useLocale } from 'next-intl';

export default function BlogDetailsPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const [blogData, setBlogData] = useState<Article | null>(null);
  const [hasError, setHasError] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBlogsBySlug(slug, locale);
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
