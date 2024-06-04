'use client';

import { toast } from 'react-toastify';
import { IUserForm } from '@/types/forms';
import api from './apiInstance';

export const updateUser = async ({ name, surname, city, phone }: IUserForm) => {
  return new Promise((resolve) => {
    api
      .put('/api/user', {
        name,
        surname,
        city,
        phone,
      })
      .then((res) => {
        let userData = JSON.parse(sessionStorage.getItem('auth') as string);
        userData.data.user = res.data.data;
        sessionStorage.setItem('auth', JSON.stringify(userData));
        toast.success('Your profile has been updated!');
        resolve(res);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        resolve(false);
      });
  });
};

export const updateUserPassword = async ({
  password,
}: {
  password: string;
}) => {
  return new Promise((resolve) => {
    api
      .put('/api/user/password', {
        password,
      })
      .then((res) => {
        toast.success('Your password has been updated!');
        resolve(res);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        resolve(false);
      });
  });
};

export const getUserOrders = async () => {
  return new Promise((resolve) => {
    api
      .get('/api/user/orders')
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        resolve(false);
      });
  });
};

export const createOrder = async (carId: string) => {
  return new Promise((resolve) => {
    api
      .post('/api/user/orders', { car_id: carId })
      .then((res) => {
        resolve(res.data);
        toast.success('Your order has been created successfully!');
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        resolve(false);
      });
  });
};
