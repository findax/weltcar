import { NavItemType } from '@/shared/Navigation/NavigationItem';
import ncNanoId from '@/utils/ncNanoId';
import { Route } from '@/routers/types';

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: '/',
    name: 'Home',
  },
  {
    id: ncNanoId(),
    href: '/cars-list',
    name: 'Cars',
    type: 'dropdown',
    children: [
      { id: ncNanoId(), href: '/cars-list', name: 'Cars List' },
      { id: ncNanoId(), href: '/car-details', name: 'Car Details' },
    ],
  },
  {
    id: ncNanoId(),
    href: '/account',
    name: 'Templates',
    type: 'dropdown',
    children: [
      { id: ncNanoId(), href: '/account', name: 'Account page' },
      {
        id: ncNanoId(),
        href: '/subscription',
        name: 'Subscription',
      },
    ],
  },

  {
    id: ncNanoId(),
    href: '/blog',
    name: 'Other pages',
    type: 'dropdown',
    children: [
      { id: ncNanoId(), href: '/blog', name: 'Blog page' },
      { id: ncNanoId(), href: '/blog/single' as Route, name: 'Blog single' },
      { id: ncNanoId(), href: '/about', name: 'About' },
      { id: ncNanoId(), href: '/contact', name: 'Contact us' },
      { id: ncNanoId(), href: '/login', name: 'Login' },
      { id: ncNanoId(), href: '/signup', name: 'Signup' },
    ],
  },
];
