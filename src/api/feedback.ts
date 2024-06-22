import { toast } from 'react-toastify';
import api from './apiInstance';

export const sendFeedback = async ({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) => {
  return new Promise((resolve) => {
    api
      .post('/api/feedbacks', { name, email, phone, message })
      .then((res) => {
        toast.success('Message sent successfully!');
        resolve(res);
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
