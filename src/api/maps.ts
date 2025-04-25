import { toast } from 'react-toastify';
import api from './apiInstance';
import { IMapPartnerData, IMapPartnerObject } from '@/types/partner';

export const getPartnerMapLocation = async () => {
  return new Promise<IMapPartnerData | false>((resolve) => {
    api
      .get(`api/maps`)
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
