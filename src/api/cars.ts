'use client';

import { toast } from 'react-toastify';
import api from './apiInstance';
import { ICatalogQueryParams } from '@/types/catalog';

export const getCarsList = async (
  page: number,
  perPage: number,
  queryParams?: ICatalogQueryParams
) => {
  return new Promise((resolve) => {
    api
      // .post(`/api/cars/list${url}`)
      .post(`api/cars/list?page=${page}&perPage=${perPage}`, queryParams)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        resolve(false);
      });
  });
};
