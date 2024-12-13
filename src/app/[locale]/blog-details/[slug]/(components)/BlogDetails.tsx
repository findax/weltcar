'use client';

import { useEffect, useState } from 'react';
import LoadingSpinner from '@/shared/LoadingSpinner';
import { Article } from '@/types/blogDetails';
import { useFormattedDate } from '@/hooks/useFormattedDate';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';

interface IPages {
  pageName: string;
  pageHref: string;
};

export default function BlogDetails({
  blogData,
}: {
  blogData: Article | null;
}) {
  const [blog, setBlog] = useState({} as Article);
  const [isLoading, setIsLoading] = useState(true);
  const [breadcrumbsPages, setBreadcrumbsPages] = useState<IPages[]>([
    {
      pageName: 'Main',
      pageHref: '/'
    },
    {
      pageName: 'Blog',
      pageHref: '/blog'
    }
  ]);

  const { formattedDate } = useFormattedDate(blog.published_at);

  useEffect(() => {
    if (blogData) {
      setBlog(blogData);
      setBreadcrumbsPages((prevPages) => {
        const isTitleExists = prevPages.some(
          (page) => page.pageName === blogData.title
        );

        if (!isTitleExists) {
          return [...prevPages, { pageName: blogData.title, pageHref: '' }];
        }
        return prevPages;
      });
      setIsLoading(false);
    }
  }, [blogData]);

  return isLoading ? (
    <div className='h-[calc(100vh-76px)] flex justify-center items-center'>
      <div className='-mt-[76px]'>
        <LoadingSpinner className='w-12' />
      </div>
    </div>
  ) : (
    <div className='container'>
      <div className='flex justify-center w-full my-12 xl:my-20'>
        <div className='w-[860px]'>
          <div className='mb-4'>
            <Breadcrumbs pages={breadcrumbsPages} />
          </div>
          <h1 className='text-3xl lg:text-4xl text-neutral-1050 dark:text-white font-semibold leading-10'>
            {blog.title}
          </h1>
          <div className='mt-4 lg:text-lg text-primary-600 dark:text-secondary-950'>{formattedDate}</div>
          <div className='mt-12 lg:text-lg text-neutral-700 dark:text-neutral-400'>{blog.preview_text}</div>
        </div>
      </div>

      <div className='my-16 h-[250px] md:h-[430px] w-full'>
        <Image 
          width={100}
          height={100}
          src={blog.preview_image.original}
          alt='bg blog image'
          className='h-full rounded-3xl object-cover w-full'
        />
      </div>

      <div className='flex justify-center w-full my-12 xl:my-20'>
        <div className='w-[860px]'>
          <div
            className='markdown-blog-styles'
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>
      
    </div>
  );
}
