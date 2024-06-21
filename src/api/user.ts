'use client';

import { toast } from 'react-toastify';
import api from './apiInstance';
import { setAuth } from './auth';
import { IAuth } from '@/types/user';

export const getAuth = () => {
  if (typeof sessionStorage !== 'undefined') {
    const storage = sessionStorage.getItem('auth');

    if (storage) {
      return JSON.parse(storage);
    }
    return null;
  } else {
    return null;
  }
};

api.interceptors.request.use(
  (config) => {
    const auth = getAuth();
    if (auth) {
      checkAndRefreshToken(auth);
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const checkAndRefreshToken = async (auth: IAuth) => {
  const daysBeforeExpireCheck = process.env.DAYS_BEFORE_TOKEN_EXPIRE_CHECK;
  const dateExpired = auth.expires;
  const isValid =
    new Date(dateExpired) >=
    new Date(new Date().getDate() - Number(daysBeforeExpireCheck));

  if (!isValid) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/jwt/refresh`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const responseData = await response.json();
      setAuth(responseData.data);
    } catch (error) {
      logout();
    }
  }
};

export const updateUser = async ({
  name,
  surname,
  city,
  phone,
}: {
  name: string;
  surname?: string;
  city?: string;
  phone?: string;
}) => {
  return new Promise((resolve) => {
    api
      .put('/api/user', {
        name,
        surname,
        city,
        phone,
      })
      .then((res) => {
        let auth = getAuth();
        auth.user = res.data.data;
        setAuth(auth);
        toast.success('Your profile has been updated!');
        resolve(auth.user);
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

export const updateUserPassword = async ({
  password,
}: {
  password: string;
}) => {
  return new Promise((resolve) => {
    api
      .put('/api/user/password', { password })
      .then((res) => {
        toast.success('Your password has been updated!');
        resolve(res.data.data.user);
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

export const getUserOrders = async () => {
  return new Promise((resolve) => {
    api
      .get('/api/user/orders')
      .then((res) => resolve(res.data))
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

export const createOrder = async (carId: string) => {
  return new Promise((resolve) => {
    api
      .post('/api/user/orders', { car_id: carId })
      .then((res) => {
        resolve(res.data);
        toast.success('Your order has been created successfully!');
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

export const logout = () => {
  sessionStorage.clear();
  window.location.reload();
};
