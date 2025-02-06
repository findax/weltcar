export interface IFavoritesCarsDetails {
  brand: string;
  car_id: string;
  description: string;
  documents: IFavoritesCarsDocuments[];
  id: string;
  inner_color_hex: string;
  inner_color_name: string;
  model: string;
  outer_color_hex: string;
  outer_color_name: string;
  pdf_url: string;
  pdf_url_clean: string;
  photos: {
    thumb: string;
    original: string;
  }[];
  price: string | number;
  properties: [];
  specification: string;
  status: string;
  status_extra: string;
  vin: string;
  year: number;
  videos?: IFavoritesCarsVideos[] | null;
  is_partner_car: boolean;
  partner_phone: string | null;
  partner_name: string | null;
  watermark: string | null;
  is_favorite: boolean;
}

export interface IFavoritesCarsDocuments {
  description: string | null;
  file_name: string;
  title: string | null;
  url: string;
}

export interface IFavoritesCarsGallery {
  id: number;
  url: string;
}

export interface IFavoritesCarsVideos {
  description?: string | null;
  title?: string | null;
  type: string;
  file_name: string;
  id: number;
  url: string;
}

export interface PdfVariant {
  name: string;
  value: string;
  selected: boolean;
}
