import { PreviewImage } from './blog';

export interface CategoryChild {
  id: number;
  name: string;
  slug: string;
  code: string;
  preview_text: string;
  description: string;
  seo_title: string;
  seo_keywords: string;
  seo_description: string;
  preview_image: PreviewImage | null;
  images: PreviewImage[];
  children: CategoryChild[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  code: string;
  preview_text: string;
  description: string;
  seo_title: string;
  seo_keywords: string;
  seo_description: string;
  preview_image: PreviewImage;
  images: PreviewImage[];
  children: CategoryChild[];
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  view_count: number;
  preview_text: string;
  content: string;
  seo_title: string;
  seo_keywords: string;
  seo_description: string;
  images: PreviewImage[];
  preview_image: PreviewImage;
  published_at: string;
  category: Category;
}
