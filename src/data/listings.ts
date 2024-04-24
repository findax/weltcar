import __carsList from './jsons/__carsList.json';
import { CarDataType } from './types';
import { DEMO_AUTHORS } from './authors';
import car1 from '@/images/cars/1.png';
import car2 from '@/images/cars/2.png';
import car3 from '@/images/cars/3.png';
import car4 from '@/images/cars/4.png';
import car5 from '@/images/cars/5.png';
import car6 from '@/images/cars/6.png';
import car7 from '@/images/cars/7.png';
import car8 from '@/images/cars/8.png';
import car9 from '@/images/cars/9.png';
import car10 from '@/images/cars/10.png';
import car11 from '@/images/cars/11.png';
import car12 from '@/images/cars/12.png';
import car13 from '@/images/cars/13.png';
import car14 from '@/images/cars/14.png';
import car15 from '@/images/cars/15.png';
import car16 from '@/images/cars/16.png';
import { Route } from '@/routers/types';
const carsImgs = [
  car1,
  car2,
  car3,
  car4,
  car5,
  car6,
  car7,
  car8,
  car9,
  car10,
  car11,
  car12,
  car13,
  car14,
  car15,
  car16,
];

const DEMO_CARS_LIST = __carsList.map((post, index): CarDataType => {
  return {
    ...post,
    id: `carsList_${index}_`,
    saleOff: !index ? '-20% today' : post.saleOff,
    isAds: !index ? true : post.isAds,
    author: DEMO_AUTHORS.filter((user) => user.id === post.authorId)[0],
    featuredImage: carsImgs[index],
    href: post.href as Route,
  };
});

export { DEMO_CARS_LIST };
