import { toast } from 'react-toastify';
import api from './apiInstance';
import { ICatalogQueryParams } from '@/types/catalog';
import {
  ICarPartnerDetails,
  ICarPartnerToRequest,
  ICarPartnerToRequestUpdate,
  ICarsPartner,
  ICatalogPartner,
  IModels,
} from '@/types/partner';
import { FindCarProps } from '@/types/car';
import { ICarDetails } from '@/types/cardetails';

export const getCarsList = async (
  page: number,
  perPage: number,
  locale: string,
  queryParams?: ICatalogQueryParams
) => {
  const headers: Record<string, string> = {
    cache: 'no-store',
    'Accept-Language': locale,
  };
  return new Promise((resolve) => {
    api
      .post(`/api/cars/list?page=${page}&perPage=${perPage}`, queryParams, {
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

export const getCarId = async (id: string, locale: string) => {
  const headers: Record<string, string> = {
    'Accept-Language': locale,
  };
  return new Promise<ICarDetails | false>((resolve) => {
    api
      .get(`/api/cars/view/${id}`, {
        headers,
      })
      .then((res) => {
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

export const getSoldCarsList = async (
  page: number,
  perPage: number,
  locale: string,
  queryParams?: ICatalogQueryParams
) => {
  const headers: Record<string, string> = {
    'Accept-Language': locale,
  };
  return new Promise((resolve) => {
    api
      .post(
        `/api/cars/list?page=${page}&perPage=${perPage}&soldOnly=${true}`,
        queryParams,
        {
          headers,
        }
      )
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

export const createPartnerCar = async (
  car: ICarPartnerToRequest,
  locale: string
) => {
  try {
    const headers: Record<string, string> = {
      'Accept-Language': locale,
      'Content-Type': 'multipart/form-data',
    };
    const response = await api.post(`/api/user/contractor/cars`, car, {
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

export const updatePartnerCar = async (
  car: ICarPartnerToRequestUpdate,
  id: string,
  locale: string
): Promise<ICarPartnerDetails | any> => {
  try {
    const headers: Record<string, string> = {
      'Accept-Language': locale,
      'Content-Type': 'multipart/form-data',
    };
    const response = await api.post(`/api/user/contractor/cars/${id}`, car, {
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

export const deletePartnerCar = async (id: string, locale: string) => {
  const headers: Record<string, string> = {
    'Accept-Language': locale,
  };
  return new Promise((resolve) => {
    api
      .delete(`/api/user/contractor/cars/${id}`, {
        headers,
      })
      .then((res) => resolve(res.data.data))
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

export const getPartnerModels = async (locale: string) => {
  const headers: Record<string, string> = {
    'Accept-Language': locale,
  };
  return new Promise<IModels | false>((resolve) => {
    api
      .get('/api/user/contractor/models', {
        headers,
      })
      .then((res) => {
        const models: IModels = res.data.data;
        resolve(models);
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

export const getPartnerCars = async (
  page: number,
  perPage: number,
  locale: string,
  queryParams?: ICatalogQueryParams
) => {
  const headers: Record<string, string> = {
    'Accept-Language': locale,
  };
  return new Promise<ICatalogPartner | false>((resolve) => {
    api
      .get(`api/user/contractor/cars?page=${page}&perPage=${perPage}`, {
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

export const getPartnerCarId = async (id: string, locale: string) => {
  const headers: Record<string, string> = {
    'Accept-Language': locale,
  };
  return new Promise<ICarPartnerDetails | false>((resolve) => {
    api
      .get(`api/user/contractor/cars/${id}`, {
        headers,
      })
      .then((res) => {
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

export const findCar = async ({
  name,
  email,
  phone,
  brand,
  model,
  color,
  specification,
  additional,
  comment,
  engineType,
  requestTime,
  locale,
}: FindCarProps) => {
  const headers: Record<string, string> = {
    'Accept-Language': locale,
  };
  return new Promise((resolve) => {
    api
      .post(
        '/api/car-search-request',
        {
          name,
          email,
          phone,
          brand,
          model,
          color,
          specification,
          additional,
          comment,
          engine_type: engineType.toLowerCase(),
          request_time: requestTime.toLowerCase(),
        },
        {
          headers,
        }
      )
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
