import { ICarDetails } from './cardetails';

export interface IAuth {
  expires: string;
  token: string;
  user: IUser;
}

export interface IUser {
  contractor_id: number;
  activated_at: string;
  city: string | null;
  country: string | null;
  created_at: string;
  created_ip_address: string | null;
  deleted_at: string | null;
  email: string;
  id: number;
  is_activated: boolean;
  is_guest: number | boolean;
  is_superuser: number | boolean;
  last_ip_address: number | string | null;
  last_login: string;
  last_seen: string | null;
  name: string;
  permissions: string | null;
  phone: string | null;
  surname: string | null;
  updated_at: string;
  username: string;
}

export interface IUserOrdersData {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string;
  prev_page_url: null;
  path: string;
  from: number;
  to: number;
  data: IOrderDetails[];
}

export interface IOrderDetails {
  car: ICarDetails;
  created_at: string;
  files: {
    description: string | null;
    file_name: string;
    title: string | null;
    type: string;
    url: string;
  }[];
  id: string;
  order_no: string;
  order_status: string;
  order_status_name: string;
  payment_status: string;
  payment_status_name: string;
  price: number | string;
  updated_at: string;
}

export interface IModel {
  model_id: number;
  model_name: string;
  is_selected: boolean;
}

export interface IBrand {
  brand_id: number;
  brand_name: string;
  is_selected: boolean;
  is_all_models_selected: boolean;
  models: IModel[];
}

export interface ICarDataToRequest<T> {
  brand_id: number;
  models: Array<T>;
}

export interface ICarData extends Array<IBrand> {}
