import { toast } from 'react-toastify';
import api from './apiInstance';
import { IPartnerResponse, IPartnerUpdate } from '@/types/partner';

export const getPartner = async (locale: string) => {
  const headers: Record<string, string> = {
    'Accept-Language': locale,
  };
  return new Promise<IPartnerResponse | false>((resolve) => {
    api
      .get('/api/user/contractor', {
        headers,
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

export const updatePartner = async (data: IPartnerUpdate, locale: string) => {
  const headers: Record<string, string> = {
    'Accept-Language': locale,
    'Content-Type': 'multipart/form-data',
  };
  return new Promise<IPartnerResponse | false>((resolve) => {
    api
      .post('/api/user/contractor', data, {
        headers,
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
