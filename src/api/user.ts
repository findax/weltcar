'use client';

import { toast } from 'react-toastify';
import { IUserForm } from '@/types/forms';
import api from './apiInstance';

export const updateUser = async ({
  name,
  last_name,
  email,
  city,
  phone,
}: IUserForm) => {
  return new Promise((resolve) => {
    api
      .post('/api/user/update', {
        name,
        last_name,
        email,
        city,
        phone,
      })
      .then((res) => {
        toast.success('Your profile has been updated!');
        resolve(res);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        resolve(false);
      });
  });
};
