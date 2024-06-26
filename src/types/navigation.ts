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

  // {
  //   id: ncNanoId(),
  //   href: '/#',
  //   name: 'Other pages',
  //   type: 'dropdown',
  //   children: [
  //     { id: ncNanoId(), href: '/#', name: 'Blog page' },
  //     { id: ncNanoId(), href: '/blog/single' as Route, name: 'Blog single' },
  //     {
  //       id: ncNanoId(),
  //       href: '/subscription',
  //       name: 'Subscription',
  //     },
  //   ],
  // },
];
