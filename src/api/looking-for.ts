import { toast } from 'react-toastify';
import api from './apiInstance';
import { ILookingForCar } from '@/types/lookingFor';

export const getLookingForList = async (
  page: number,
  perPage: number,
  locale: string
) => {
  const headers: Record<string, string> = {
    'Accept-Language': locale,
  };
  return new Promise<ILookingForCar[] | false>((resolve) => {
    api
      .get(`/api/looking-for?page=${page}&perPage=${perPage}`, {
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
