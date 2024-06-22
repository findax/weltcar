import { toast } from 'react-toastify';
import api from './apiInstance';
import { IAuth } from '@/types/user';
import { getAuth } from './user';

export const setAuth = (data: IAuth) =>
  sessionStorage.setItem('auth', JSON.stringify(data));

api.interceptors.response.use(
  (response) => {
    checkAndRefreshToken();
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
        if (res.data.message) {
          toast.error(res.data.message);
          resolve(false);
        } else {
          setAuth(res.data.data);
          toast.success('Logged in successfully!');
          resolve(res.data.data.user);
        }
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

const checkAndRefreshToken = async () => {
  const auth = getAuth();
  if (auth) {
    const daysBeforeExpireCheck =
      process.env.NEXT_PUBLIC_DAYS_BEFORE_TOKEN_EXPIRE_CHECK;
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
  }
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
        if (err.response?.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error('Something went wrong!');
        }
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

export const sendForgotPassword = async ({ email }: { email: string }) => {
  return new Promise((resolve) => {
    api
      .post('/api/password/reset', { email })
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

export const logout = () => {
  localStorage.removeItem('user');
  sessionStorage.clear();
  window.location.reload();
};
