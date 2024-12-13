'use client'

import { useEffect, useState } from 'react';
import { getBlogsList } from '@/api/blog';
import { Article, IBlog } from '@/types/blog';
import { useQueryParams } from '@/hooks/useQueryParams';
import LoadingSpinner from '@/shared/LoadingSpinner';
import ErrorComponent from '@/components/ErrorComponent';
import BlogList from './BlogList';

const BlogCatalog = () => {
  const [isFirstLoading, setFirstLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [blogData, setBlogData] = useState({} as IBlog);
  const [articles, setArticles] = useState<Article[]>([]);

  const { currentPage } = useQueryParams();

  const sortArticleMassive = (articlesData: IBlog) => {
    const sortedArticles = [...articlesData.data].sort((a, b) => {
      return new Date(a.published_at).getTime() - new Date(b.published_at).getTime();
    });
    setArticles([...sortedArticles]);
  }

  useEffect(() => {
    getBlogsList(currentPage, 5)
      .then((data) => {
        if (data) {
          setBlogData(data as IBlog);
          sortArticleMassive(data);
        } else {
          setError(true);
        }
      })
      .finally(() => {
        isFirstLoading && setFirstLoading(false);
      });
  }, [currentPage]);

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
    <BlogList 
      articleListData={articles || []}
      results={blogData?.meta.total || 0}
    />
  );
};

export default BlogCatalog;
