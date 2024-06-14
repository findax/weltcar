'use client';

import { toast } from 'react-toastify';
import api from './apiInstance';
import { setAuth } from '@/api/user';

export const singIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return new Promise((resolve) => {
    api
      .post('/jwt/login', { email, password })
      .then((res) => {
        setAuth(res.data.data);
        toast.success('Logged in successfully!');
        resolve(res);
        // window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        resolve(false);
      });
  });
};

export const singUp = async ({
  name,
  email,
  phone,
  password,
}: {
  name?: string;
  email: string;
  phone?: string;
  password: string;
}) => {
  return new Promise((resolve) => {
    api
      .post('/jwt/register', { name, email, phone, password })
      .then((res) => resolve(res))
      .catch((err) => {
        toast.error(err.response.data.message);
        resolve(false);
      });
  });
};

export const activateAccount = async ({ code }: { code: string }) => {
  return new Promise((resolve) => {
    api
      .post('/jwt/activate', { code })
      .then((res) => {
        setAuth(res.data.data);
        resolve(res);
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        resolve(false);
      });
  });
};

export const resetPassword = async ({ email }: { email: string }) => {
  return new Promise((resolve) => {
    api
      .post('/api/password/reset', { email })
      .then((res) => resolve(res))
      .catch((err) => {
        toast.error(err.response.data.message);
        resolve(false);
      });
  });
};

export const restorePassword = async ({
  code,
  password,
}: {
  code: string;
  password: string;
}) => {
  return new Promise((resolve) => {
    api
      .post('/api/password/restore', { code, password })
      .then((res) => {
        setAuth(res.data.data);
        resolve(res);
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        resolve(false);
      });
  });
};
