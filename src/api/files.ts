import { toast } from 'react-toastify';
import api from './apiInstance';

export const getPdfFile = async (fileType: string, locale: string) => {
  const headers: Record<string, string> = {
    'Accept-Language': locale,
  };

  return new Promise<boolean>((resolve) => {
    api
      .get(`/api/cars/list/export?type=${fileType}`, {
        headers,
        responseType: 'blob',
      })
      .then((res) => {
        const blob = new Blob([res.data], { type: 'application/pdf' });
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `exported-file.${fileType}`;
        document.body.appendChild(a);
        a.click();
        a.remove();

        resolve(true);
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error('Something went wrong!');
        }
        resolve(false);
      });
  });
};
