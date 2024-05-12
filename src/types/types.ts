import { Route } from '@/routers/types';

//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: Route<string> | string;
  targetBlank?: boolean;
}

export type TwMainColor =
  | 'pink'
  | 'green'
  | 'yellow'
  | 'red'
  | 'indigo'
  | 'blue'
  | 'purple'
  | 'gray';

export interface CarGalleryImage {
  id: number;
  // image: string | StaticImageData;
  url: string;
}
