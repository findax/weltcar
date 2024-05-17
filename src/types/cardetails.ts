export interface ICarDetails {
  id: string;
  car_id: string;
  status: string;
  price: string | number;
  brand: string;
  model: string;
  year: number;
  vin: string;
  inner_color_hex: string;
  inner_color_name: string;
  outer_color_hex: string;
  outer_color_name: string;
  description: string;
  pdf_url: string;
  photos: {
    thumb: string;
    original: string;
  }[];
  documents: ICarDocuments[];
  properties: [];
}

export interface ICarDocuments {
  description: string | null;
  file_name: string;
  title: string | null;
  url: string;
}

export interface ICarGallery {
  id: number;
  url: string;
}
