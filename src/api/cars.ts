'use client';

import { toast } from 'react-toastify';
import api from './apiInstance';

export const getCarsList = async (page: number, additionalParam?: string) => {
  return new Promise((resolve) => {
    api
      // .post(`/api/cars/list${url}`)
      .post(
        `api/cars/list${page > 1 ? `?page=${page}` : ''}${additionalParam ? `&${additionalParam}` : ''}`
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        resolve(false);
      });
  });
};
