import { toast } from 'react-toastify';
import api from './apiInstance';

export const getSearchList = async (locale: string) => {
  const headers: Record<string, string> = {
    cache: 'no-store',
    'Accept-Language': locale,
  };
  return new Promise((resolve) => {
    api
      .get(`/api/index/search-list`, {
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
