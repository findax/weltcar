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

export type CarResponse = {
  data: Car[];
};

export type Car = {
  id: string;
  car_id: string;
  model_id: number;
  status: string;
  status_extra: string | null;
  price: string;
  brand: string;
  model: string;
  specification: string;
  year: number;
  year_manufacture: number | null;
  vin: string;
  inner_color_hex: string;
  inner_color_name: string;
  outer_color_hex: string;
  outer_color_name: string;
  description: string | null;
  pdf_url_clean: string;
  pdf_url: string;
  photos: Photo[];
  videos: any[]; // уточни тип, якщо зʼявляться відео
  documents: Document[];
  properties: Property[];
  is_deleted: boolean;
  contractor_comment: string | null;
  country: Country | null;
  post_code: string | null;
  is_verified: boolean;
  is_partner_car: boolean;
  partner_phone: string | null;
  partner_name: string | null;
  watermark: string | null;
  is_favorite: boolean;
};

export type Photo = {
  id: number;
  title: string | null;
  description: string | null;
  type: string;
  file_name: string;
  original: string;
  thumb: string;
};

export type Document = {
  id: number;
  title: string | null;
  description: string | null;
  file_name: string;
  url: string;
};

export type Property = {
  name: string;
  value: string;
};

export type Country = {
  id: number;
  name: string;
};

export const getLatestCarsList = async (locale: string) => {
  const headers: Record<string, string> = {
    'Accept-Language': locale,
  };

  try {
    const endpoint = `/api/index/cars`;

    const { data } = await api.get<CarResponse, AxiosResponse<CarResponse>>(
      endpoint,
      { headers }
    );

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
