import { toast } from 'react-toastify';
import api from './apiInstance';
import { IPartnerResponse, IPartnerUpdate } from '@/types/partner';

export const getPartner = async () => {
  return new Promise<IPartnerResponse | false>((resolve) => {
    api
      .get('/api/user/contractor')
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

export const updatePartner = async (data: IPartnerUpdate) => {
  return new Promise<IPartnerResponse | false>((resolve) => {
    api
      .post('/api/user/contractor', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
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
