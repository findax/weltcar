import { StaticImageData } from 'next/image';

export interface CarDataType {
  brand: string;
  car_id: string;
  id: string;
  inner_color_hex: string;
  inner_color_name: string;
  is_sold: boolean;
  model: string;
  outer_color_hex: string;
  outer_color_name: string;
  photos: { thumb: string; original: string }[];
  price: number;
  status: string;
  status_name: string;
  year: number;
}
