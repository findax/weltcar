import { toast } from 'react-toastify';
import api from './apiInstance';

export const updateUser = async ({
  name,
  surname,
  city,
  phone,
  locale,
}: {
  name: string;
  locale: string;
  surname?: string;
  city?: string;
  phone?: string;
}) => {
  const headers: Record<string, string> = {
    'Accept-Language': locale,
  };
  return new Promise((resolve) => {
    api
      .put(
        '/api/user',
        {
          name,
          surname,
          city,
          phone,
        },
        {
          headers,
        }
      )
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
  locale,
}: {
  password: string;
  locale: string;
}) => {
  const headers: Record<string, string> = {
    'Accept-Language': locale,
  };
  return new Promise((resolve) => {
    api
      .put(
        '/api/user/password',
        { password },
        {
          headers,
        }
      )
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

export const getUserOrders = async (locale: string) => {
  const headers: Record<string, string> = {
    'Accept-Language': locale,
  };
  return new Promise((resolve) => {
    api
      .get('/api/user/orders', {
        headers,
      })
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
