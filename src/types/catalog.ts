export interface ICatalog {
  data: ICar[];
  filters: IFilters[];
  links: ILinks;
  meta: IMeta;
  sort: ISort[];
}

export interface ICar {
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
  specification: string;
  status: string;
  status_name: string;
  year: number;
}

export interface IFilters {
  id: string;
  max: number | null;
  min: number | null;
  name: string;
  type: string;
  values: IFilter[] | null;
}

export interface IFilter {
  count: number;
  countFiltered: number;
  id: number;
  name: string;
  meta: { selected: boolean; value: string };
}

export interface ILinks {
  first: string | null;
  last: string | null;
  next: string | null;
  prev: string | null;
}

export interface IMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: { active: boolean; label: string; url: string | null }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ISort {
  id: string;
  name: string;
}

export interface ICatalogQueryParams {
  search?: string;
  sort?: {
    id: string;
  }[];
  filters?: {
    id: string;
    values: (string | number)[];
  }[];
}
