'use client';

import { toast } from 'react-toastify';
import { IFeedback } from '@/types/forms';
import api from './apiInstance';

export const sendFeedback = async ({ name, email, message }: IFeedback) => {
  return new Promise((resolve) => {
    api
      .post('/api/feedbacks', { name, email, message })
      .then((res) => {
        console.log(res.data);

        toast.success('Message sent successfully!');
        resolve(res);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        resolve(false);
      });
  });
};
