import { ILinks, IMeta } from './catalog';

export interface ILookingForCatalog {
  data: ILookingForCar[];
  links: ILinks;
  meta: IMeta;
}

export interface ILookingForCar {
  brand: string;
  model: string;
  color_exterior: string;
  color_interior: string;
  count: number;
  comments: string;
  my: string;
  date: string;
}
