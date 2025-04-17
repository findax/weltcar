import { toast } from 'react-toastify';
import api from './apiInstance';
import { GalleryCarMedia } from '@/types/gallery';

export const getGalleries = async (locale: string) => {
  const headers: Record<string, string> = {
    'Accept-Language': locale,
  };
  return new Promise<GalleryCarMedia[] | false>((resolve) => {
    api
      .get(`/api/galleries`, {
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

export const getGalleryById = async (id: string, locale: string) => {
  const headers: Record<string, string> = {
    'Accept-Language': locale,
  };
  return new Promise<GalleryCarMedia | false>((resolve) => {
    api
      .get(`/api/galleries/${id}`, {
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
