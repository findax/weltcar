import api from './apiInstance';

export const getCarsList = async (url: string) => {
  const { data } = await api.post(url);

  return data;
};

export const getCarDetails = async (url: string) => {
  const { data } = await api.get(url);

  return data;
};
