'use client';

import { toast } from 'react-toastify';
import { IAuth } from '@/types/forms';
import api from './apiInstance';

export const singIn = async ({ email, password }: IAuth) => {
  return new Promise((resolve) => {
    api
      .post('/jwt/login', { email, password })
      .then((res) => {
        sessionStorage.setItem('auth', JSON.stringify(res.data));
        toast.success('Logged in successfully!');
        resolve(res);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        resolve(false);
      });
  });
};

export const singUp = async ({ name, email, password }: IAuth) => {
  return new Promise((resolve) => {
    api
      .post('/jwt/register', { name, email, password })
      .then((res) => {
        sessionStorage.setItem('auth', JSON.stringify(res.data));
        toast.success('Registered successfully!');
        resolve(res);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        resolve(false);
      });
  });
};

export const refreshToken = async ({ jwt }: { jwt: string }) => {
  const { data } = await api.post('/jwt/refresh', { jwt });

  sessionStorage.setItem('auth', JSON.stringify(data));

  return data;
};

export const logout = () => {
  sessionStorage.removeItem('auth');
  window.location.reload();
};

//todo: add refresh token
// export const loginCheck = async ({ jwt }: { jwt: string }) => {
//   try {
//     const { data } = await api.get('/jwt/login', {
//       headers: { Authorization: `Bearer ${jwt}` },
//     });

//     if (data?.error) {
//       await refreshToken({ jwt: jwt });
//       return;
//     }

//     return data.user;
//   } catch (error) {
//     toast.error((error as Error).message);
//   }
// };

export const isUserAuth = () => {
  if (typeof sessionStorage !== 'undefined') {
    const auth = JSON.parse(sessionStorage.getItem('auth') as string);

    if (!auth?.data.token) {
      return null;
    }
    return auth.data;
  } else {
    return null;
  }
};

// export const triggerLoginCheck = () => {
//   if (!isUserAuth()) {
//     return;
//   }
//   const auth = JSON.parse(sessionStorage.getItem('auth') as string);

//   loginCheck({ jwt: auth.data.token });
// };
