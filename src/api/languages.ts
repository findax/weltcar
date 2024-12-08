import { toast } from 'react-toastify';
import api from './apiInstance';

export const getLanguages = async () => {
  return new Promise((resolve) => {
    api
      .get('api/languages')
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

export const getLanguagesTranslations = async () => {
  return new Promise((resolve) => {
    api
      .get('api/languages/translations')
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
