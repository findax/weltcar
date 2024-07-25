import { toast } from 'react-toastify';
import api from './apiInstance';
import { ICarDataToRequest } from '@/types/user';

export const sendSubscribeEmail = async ({ email }: { email: string }) => {
  return new Promise((resolve) => {
    api
      .post('/api/mails/subscribe', { email })
      .then((res) => {
        toast.success('You have subscribed successfully!');
        resolve(res);
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

export const getSubscriptions = async () => {
  return new Promise((resolve) => {
    api
      .get('/api/user/mail/subscriptions')
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

export const setSubscriptions = async (
  subscriptions: ICarDataToRequest<number>[]
) => {
  return new Promise((resolve) => {
    api
      .post('/api/user/mail/subscriptions', subscriptions)
      .then((res) => {
        toast.success('You have subscribed successfully!');
        console.log(res);
        resolve(res);
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
