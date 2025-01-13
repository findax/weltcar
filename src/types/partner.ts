import { File } from 'buffer';
import { ICarVideos } from './cardetails';

export interface ICarPartnerToRequest {
  model_id: string;
  price: string | number;
  year: number;
  specification: string;
  vin: string;
  post_code: string;
  country: number;
  inner_color_hex: string;
  inner_color_name: string;
  outer_color_hex: string;
  outer_color_name: string;
  description: string;
  contractor_comment: string;
  photos: File[];
  documents: File[];
}

export interface ICarPartnerToRequestUpdate {
  model_id: string;
  price: string | number;
  year: number;
  specification: string;
  vin: string;
  post_code: string;
  country: number;
  inner_color_hex: string;
  inner_color_name: string;
  outer_color_hex: string;
  outer_color_name: string;
  description: string;
  contractor_comment: string;
  photos: File[];
  documents: File[];
  attached_photos: number[] | undefined;
  attached_documents: number[] | undefined;
}

export interface ICarsPartner {
  vin: string;
  brand: string;
  car_id: string;
  id: string;
  inner_color_hex: string;
  inner_color_name: string;
  is_sold: boolean;
  model: string;
  outer_color_hex: string;
  outer_color_name: string;
  photos: { id: number; thumb: string; original: string }[];
  price: number | string;
  specification: string;
  status: string;
  status_name: string;
  year: number;
  is_deleted: boolean;
  contractor_comment: string;
  country: {
    id: number;
    name: string;
  };
  post_code: string | null;
  is_verified: boolean;
  watermark: string | null;
}

export interface ICarPartnerDetails {
  model_id: number;
  vin: string;
  description: string;
  brand: string;
  car_id: string;
  id: string;
  inner_color_hex: string;
  inner_color_name: string;
  is_sold: boolean;
  model: string;
  outer_color_hex: string;
  outer_color_name: string;
  photos: IPartnerPhotoList[];
  documents: IPartnerFileList[];
  price: number | string;
  specification: string;
  status: string;
  status_name: string;
  year: number;
  pdf_url: string;
  pdf_url_clean: string;
  is_deleted: boolean;
  contractor_comment: string;
  country: {
    id: number;
    name: string;
  };
  post_code: string | null;
  is_verified: boolean;
  videos: ICarVideos[];
  is_partner_car: boolean;
  partner_phone: string | null;
  partner_name: string | null;
  watermark: string | null;
}

interface ICountry {
  id: number;
  name: string;
}

export interface ISelectorFindCar {
  id: number;
  name: string;
  value: string;
}

export type ICountries = ICountry[] | ISelectorFindCar[];

interface IModel {
  id: number;
  brand_name: string;
  model_name: string;
}

export type IModels = IModel[];

export interface IPartnerCreate {
  company_name: string;
  tax_number: string;
  files: File[];
  email: string;
  phone: string;
  password: string;
}

export interface IPartnerUpdate {
  name: string;
  email: string;
  phone: string;
  tax_number: string;
  files?: File[];
  attached_files: number[] | undefined;
}

export interface IPartnerFileList {
  id: number;
  title: string | null;
  description: string | null;
  type: string;
  file_name: string;
  url: string;
}

export interface IPartnerPhotoList {
  id: number;
  thumb: string;
  original: string;
}

export interface IPartnerResponse {
  name: string;
  code: string;
  email: string;
  phone: string;
  address: string | null;
  tax_number: string;
  is_verified: boolean;
  files: IPartnerFileList[];
}
