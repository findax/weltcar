'use client';

import { toast } from 'react-toastify';
import { IAuth } from '@/types/user';
import api from './apiInstance';

export const setAuth = (data: IAuth) =>
  sessionStorage.setItem('auth', JSON.stringify(data));

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

export const getUser = () => {
  const storage = sessionStorage.getItem('auth');

  if (storage) {
    return JSON.parse(storage).user;
  }
  return null;
};

api.interceptors.request.use(
  (config) => {
    // checkIsTokenValid();
    const auth = getAuth();
    if (auth) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// const checkIsTokenValid = () => {
//   const daysBeforeExpireCheck = 5;
//   const auth = getAuth();
//   if (!auth) return true;
//   const dateExpired = auth.expires;
//   const isValid =
//     new Date(dateExpired) >=
//     new Date(new Date().getDate() - daysBeforeExpireCheck);
//   console.log(isValid);

//   if (isValid) {
//     try {
//       api.post('/jwt/refresh').then((res) => {
//         console.log(res);
//       });
//       // const newAccessToken = response.data.accessToken;

//       // originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//     } catch (error) {
//       logout();
//     }
//   }
//   return true;
// };

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
      .put('/api/user/password', { password })
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
      .then((res) => resolve(res.data))
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

export const logout = () => {
  sessionStorage.clear();
  window.location.reload();
};
