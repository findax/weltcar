import { toast } from 'react-toastify';
import api from './apiInstance';
import { ICountries } from '@/types/partner';

export const getCountries = async () => {
  return new Promise<ICountries | false>((resolve) => {
    api
      .get('/api/user/countries')
      .then((res) => {
        resolve(res.data.data);
      })
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
