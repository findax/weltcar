import { NavItemType } from '@/shared/Navigation/NavigationItem';
import ncNanoId from '@/utils/ncNanoId';
import { Route } from './routers';

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: '/catalog',
    name: 'navbar.catalog',
  },
  { id: ncNanoId(), href: '/about', name: 'navbar.about' },
  { id: ncNanoId(), href: '/blog', name: 'navbar.blog' },
  { id: ncNanoId(), href: '/contact', name: 'navbar.contact' },
  { id: ncNanoId(), href: '/find-car', name: 'navbar.findCar' },
];

export const NAVIGATION_DEMO_MOBILE: NavItemType[] = [
  {
    id: ncNanoId(),
    href: '/catalog',
    name: 'navbar.catalog',
  },
  { id: ncNanoId(), href: '/about', name: 'navbar.about' },
  { id: ncNanoId(), href: '/blog', name: 'navbar.blog' },
  { id: ncNanoId(), href: '/contact', name: 'navbar.contact' },
  { id: ncNanoId(), href: '/find-car', name: 'navbar.findCar' },
  { id: ncNanoId(), href: '/partner-cars', name: 'navbar.addCar' },
];

export enum NavigationRoutes {
  Account = 'account',
  AccountPartner = 'account-partner',
  Password = 'password',
  Favorites = 'favorites',
  Orders = 'orders',
  PartnerCarList = 'partner-cars-list',
  CarSubscriptions = 'car-subscriptions',
}
