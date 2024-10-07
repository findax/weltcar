import { NavItemType } from '@/shared/Navigation/NavigationItem';
import ncNanoId from '@/utils/ncNanoId';
import { Route } from './routers';

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: '/catalog',
    name: 'Catalog',
  },
  { id: ncNanoId(), href: '/about', name: 'About us' },
  { id: ncNanoId(), href: '/contact', name: 'Contact us' },
  { id: ncNanoId(), href: '/find-car', name: 'Find car' },
];

export const NAVIGATION_DEMO_MOBILE: NavItemType[] = [
  {
    id: ncNanoId(),
    href: '/catalog',
    name: 'Catalog',
  },
  { id: ncNanoId(), href: '/about', name: 'About us' },
  { id: ncNanoId(), href: '/contact', name: 'Contact us' },
  { id: ncNanoId(), href: '/find-car', name: 'Find car' },
  { id: ncNanoId(), href: '/partner-cars', name: 'Add Car' },
];

export enum NavigationRoutes {
  Account = 'account',
  AccountPartner = 'account-partner',
  Password = 'password',
  Orders = 'orders',
  CarSubscriptions = 'car-subscriptions',
}
