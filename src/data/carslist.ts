import __carsList from './jsons/__carsList.json';
import { CarDataType } from './types';
import { Route } from '@/routers/types';

const DEMO_CARS_LIST = __carsList.map((post, index): CarDataType => {
  return {
    ...post,
    // id: `carsList_${index}_`,
    saleOff: !index ? '-20% today' : post.saleOff,
    isAds: !index ? true : post.isAds,
    // href: post.href as Route,
  };
});

export { DEMO_CARS_LIST };
