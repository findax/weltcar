import { toast } from 'react-toastify';
import api from './apiInstance';

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
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
        toast.success('Your profile has been updated!');
        resolve(res.data.data);
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
