import { toast } from 'react-toastify';
import api from './apiInstance';

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
