import { toast } from 'react-toastify';
import api from './apiInstance';
import { IBlog } from '@/types/blog';
import { Article } from '@/types/blogDetails';

export const getBlogsList = async (
  page: number,
  perPage: number,
  locale: string
) => {
  const headers: Record<string, string> = {
    'Accept-Language': locale,
  };
  return new Promise<IBlog | false>((resolve) => {
    api
      .get(`api/blog/articles?page=${page}&perPage=${perPage}`, {
        headers,
      })
      .then((res) => resolve(res.data))
      .catch((err) => {
        if (err.response?.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error('Something went wrong!');
        }
        resolve(false);
      });
  });
};

export const getBlogsBySlug = async (slug: string, locale: string) => {
  const headers: Record<string, string> = {
    'Accept-Language': locale,
  };
  return new Promise<Article | false>((resolve) => {
    api
      .get(`api/blog/articles/${slug}`, {
        headers,
      })
      .then((res) => resolve(res.data.data))
      .catch((err) => {
        if (err.response?.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error('Something went wrong!');
        }
        resolve(false);
      });
  });
};
