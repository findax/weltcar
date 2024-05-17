'use client';

import { toast } from 'react-toastify';
import api from './apiInstance';

export const getCarsList = async (url: string) => {
  return new Promise((resolve) => {
    api
      .post(`/api/cars/list${url}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        resolve(false);
      });
  });
};
