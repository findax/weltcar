import axios from 'axios';
import { logout, setAuth } from './auth';

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

instance.interceptors.request.use(
  (config) => {
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

instance.interceptors.response.use(
  (response) => {
    checkAndRefreshToken();
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
        window.location.reload();
      } catch (error) {
        logout();
      }
    }
  }
};

export const getAuth = () => {
  if (typeof localStorage !== 'undefined') {
    const storage = localStorage.getItem('auth');

    if (storage) {
      return JSON.parse(storage);
    }
    return null;
  } else {
    return null;
  }
};

export default instance;
