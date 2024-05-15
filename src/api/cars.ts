import api from './apiInstance';

export const getCarsList = async (url: string) => {
  const { data } = await api.post(`/api/cars/list${url}`);

  return data;
};
