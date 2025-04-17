export interface GalleryMediaItem {
  description: string;
  file_name: string;
  title: string;
  type: 'images' | 'videos';
}

export interface GalleryImageItem extends GalleryMediaItem {
  original: string;
  thumb: string;
}

export interface GalleryVideoItem extends GalleryMediaItem {
  id: number;
  url: string;
}

export interface GalleryCarMedia {
  id: number;
  name: string;
  images: GalleryImageItem[];
  videos: GalleryVideoItem[];
}
