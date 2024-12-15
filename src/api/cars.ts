import { toast } from 'react-toastify';
import api from './apiInstance';
import { ICatalogQueryParams } from '@/types/catalog';
import {
  ICarPartnerDetails,
  ICarPartnerToRequest,
  ICarPartnerToRequestUpdate,
  ICarsPartner,
  IModels,
} from '@/types/partner';
import { FindCarProps } from '@/types/car';
import { ICarDetails } from '@/types/cardetails';

export const getCarsList = async (
  page: number,
  perPage: number,
  queryParams?: ICatalogQueryParams
) => {
  return new Promise((resolve) => {
    api
      // .post(`/api/cars/list${url}`)
      .post(`/api/cars/list?page=${page}&perPage=${perPage}`, queryParams)
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

export const getCarId = async (id: string) => {
  return new Promise<ICarDetails | false>((resolve) => {
    api
      .get(`/api/cars/view/${id}`)
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
  queryParams?: ICatalogQueryParams
) => {
  return new Promise((resolve) => {
    api
      .post(
        `/api/cars/list?page=${page}&perPage=${perPage}&soldOnly=${true}`,
        queryParams
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

export const createPartnerCar = async (car: ICarPartnerToRequest) => {
  try {
    const response = await api.post(`/api/user/contractor/cars`, car, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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
  id: string
): Promise<ICarPartnerDetails | any> => {
  try {
    const response = await api.post(`/api/user/contractor/cars/${id}`, car, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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

export const deletePartnerCar = async (id: string) => {
  return new Promise((resolve) => {
    api
      .delete(`/api/user/contractor/cars/${id}`)
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

export const getPartnerModels = async () => {
  return new Promise<IModels | false>((resolve) => {
    api
      .get('/api/user/contractor/models')
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

export const getPartnerCars = async (page: number, perPage: number) => {
  return new Promise<ICarsPartner[] | false>((resolve) => {
    api
      .get(`api/user/contractor/cars?page=${page}&perPage=${perPage}`)
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

export const getPartnerCarId = async (id: string) => {
  return new Promise<ICarPartnerDetails | false>((resolve) => {
    api
      .get(`api/user/contractor/cars/${id}`)
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
}: FindCarProps) => {
  return new Promise((resolve) => {
    api
      .post('/api/car-search-request', {
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
      })
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
