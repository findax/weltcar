'use client';

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
        toast.error(err.response.data.message);
        resolve(false);
      });
  });
};
