import { toast } from 'react-toastify';
import api from './apiInstance';
import { ICatalogQueryParams } from '@/types/catalog';
import {
  ICarPartner,
  ICarPartnerToRequest,
  ICarPartnerToRequestUpdate,
  ICarsPartner,
  IModels,
} from '@/types/partner';

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

export const createPartnerCar = async (car: ICarPartnerToRequest) => {
  return new Promise((resolve) => {
    api
      .post(`/api/user/contractor/cars`, car, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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

export const updatePartnerCar = async (
  car: ICarPartnerToRequestUpdate,
  id: string
) => {
  return new Promise<ICarPartner | false>((resolve) => {
    api
      .post(`/api/user/contractor/cars/${id}`, car, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
  return new Promise<ICarPartner | false>((resolve) => {
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
