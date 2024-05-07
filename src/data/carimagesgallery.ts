import { CarGalleryImage } from '@/data/types';

export const PHOTOS: string[] = [
  'https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/1054211/pexels-photo-1054211.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/257851/pexels-photo-257851.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/381292/pexels-photo-381292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/326259/pexels-photo-326259.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/2526128/pexels-photo-2526128.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/2827753/pexels-photo-2827753.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/457418/pexels-photo-457418.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/712618/pexels-photo-712618.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/945443/pexels-photo-945443.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/189454/pexels-photo-189454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/193995/pexels-photo-193995.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/575386/pexels-photo-575386.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/248687/pexels-photo-248687.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/752615/pexels-photo-752615.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/1210622/pexels-photo-1210622.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/303316/pexels-photo-303316.jpeg?auto=compress&cs=tinysrgb&w=1600',
];

export const documents = [
  {
    title: 'Specification',
    description: 'some description',
    file_name: 'someName.pdf',
    url: '<url>',
  },
  {
    title: 'Way Bill',
    description: 'some description',
    file_name: 'someName.pdf',
    url: '<url>',
  },
  {
    title: 'Export Confirm',
    description: 'some description',
    file_name: 'someName.pdf',
    url: '<url>',
  },
];

export const DEMO_CAR_IMAGES_GALLERY: CarGalleryImage[] = [...PHOTOS].map(
  (item, index): CarGalleryImage => {
    return {
      id: index,
      url: item,
    };
  }
);
