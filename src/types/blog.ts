import { ILinks, IMeta } from './catalog';

export interface IBlog {
  data: Article[];
  links: ILinks;
  meta: IMeta;
}

export interface PreviewImage {
  id: number;
  original: string;
  thumb: string;
}

export interface Article {
  title: string;
  slug: string;
  view_count: number;
  preview_text: string;
  content: string;
  preview_image: PreviewImage;
  published_at: string;
  category_slug: string;
}
