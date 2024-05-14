export interface ICarDetails {
  brand: string;
  description: string;
  documents: {
    description: string | null;
    file_name: string;
    title: string | null;
    url: string;
  }[];
  id: string;
  inner_color_hex: string;
  inner_color_name: string;
  model: string;
  outer_color_hex: string;
  outer_color_name: string;
  pdf_url: string;
  photos: {
    thumb: string;
    original: string;
  }[];
  price: number;
  properties: [];
  status: string;
  vin: string;
  year: number;
}

export interface ICarGallery {
  id: number;
  url: string;
}
