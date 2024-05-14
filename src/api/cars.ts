import api from './apiInstance';

export const getCarsList = async (url: string) => {
  const { data } = await api.post(`/api/cars/list${url}`);

  return data;
};

export const getCarDetails = async (id: string) => {
  return new Promise((resolve) => {
    api
      .get(`/api/cars/view/${id}`)
      .then((res) => {
        resolve(res.data.data);
      })
      .catch(() => {
        resolve(false);
      });
  });
};
