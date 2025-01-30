import { ICatalogQueryParams } from '@/types/catalog';
import { toast } from 'react-toastify';
import api from './apiInstance';

export const addToFavoritesCars = async (
  id: string,
  locale: string,
  queryParams?: ICatalogQueryParams
) => {
  try {
    const headers: Record<string, string> = {
      'Accept-Language': locale,
    };
    const response = await api.post(
      `api/user/favorites/cars/${id}`,
      queryParams,
      {
        headers,
      }
    );
    return response.data.data;
  } catch (err: any) {
    if (err.response?.data?.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error('Something went wrong!');
    }
    return err;
  }
};

export const getFavoritesCars = async (locale: string) => {
  try {
    const headers: Record<string, string> = {
      'Accept-Language': locale,
    };
    const response = await api.get(`/api/user/favorites/cars`, {
      headers,
    });
    return response.data.data;
  } catch (err: any) {
    if (err.response?.data?.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error('Something went wrong!');
    }
    return err;
  }
};

export const deleteFavoriteCar = async (id: string, locale: string) => {
  try {
    const headers: Record<string, string> = {
      'Accept-Language': locale,
    };
    const response = await api.delete(`api/user/favorites/cars/${id}`, {
      headers,
    });
    return response.data.data;
  } catch (err: any) {
    if (err.response?.data?.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error('Something went wrong!');
    }
    return err;
  }
};
