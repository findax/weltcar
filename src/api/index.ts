import api from './apiInstance';

import { AxiosResponse } from 'axios';

export type CarModel = {
  id: number;
  name: string;
};

export type CarBrand = {
  id: number;
  name: string;
  models: CarModel[];
};

export type CarBrandResponse = {
  data: CarBrand[];
};

export const getCarBrandsList = async (locale: string) => {
  const headers: Record<string, string> = {
    cache: 'no-store',
    'Accept-Language': locale,
  };

  try {
    const endpoint = `/api/index/search-list`;

    const { data } = await api.get<
      CarBrandResponse,
      AxiosResponse<CarBrandResponse>
    >(endpoint, { headers });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
