import __CarList from './jsons/__carList.json';
import { CarDataType } from './types';

const DEMO_CAR_LIST = __CarList.map((post, index): CarDataType => {
  return {
    ...post,
    saleOff: !index ? '-20% today' : post.saleOff,
    isAds: !index ? true : post.isAds,
  };
});

export { DEMO_CAR_LIST };
