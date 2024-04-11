import { MegamenuItem, NavItemType } from '@/shared/Navigation/NavigationItem';
import ncNanoId from '@/utils/ncNanoId';
import { Route } from '@/routers/types';
import __megamenu from './jsons/__megamenu.json';

const megaMenuDemo: MegamenuItem[] = [
  {
    id: ncNanoId(),
    image:
      'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'Company',
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: '/',
      name: i.Company,
    })),
  },
  {
    id: ncNanoId(),
    image:
      'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'App Name',
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: '/',
      name: i.AppName,
    })),
  },
  {
    id: ncNanoId(),
    image:
      'https://images.pexels.com/photos/5059013/pexels-photo-5059013.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'City',
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: '/',
      name: i.City,
    })),
  },
  {
    id: ncNanoId(),
    image:
      'https://images.pexels.com/photos/5159141/pexels-photo-5159141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'Contruction',
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: '/',
      name: i.Contruction,
    })),
  },
  {
    id: ncNanoId(),
    image:
      'https://images.pexels.com/photos/7473041/pexels-photo-7473041.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'Country',
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: '/',
      name: i.Country,
    })),
  },
];

const otherPageChildMenus: NavItemType[] = [
  { id: ncNanoId(), href: '/blog', name: 'Blog page' },
  { id: ncNanoId(), href: '/blog/single' as Route, name: 'Blog single' },
  { id: ncNanoId(), href: '/about', name: 'About' },
  { id: ncNanoId(), href: '/contact', name: 'Contact us' },
  { id: ncNanoId(), href: '/login', name: 'Login' },
  { id: ncNanoId(), href: '/signup', name: 'Signup' },
];

const templatesChildrenMenus: NavItemType[] = [
  { id: ncNanoId(), href: '/account', name: 'Account page' },
  {
    id: ncNanoId(),
    href: '/subscription',
    name: 'Subscription',
  },
];

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: '/',
    name: 'Home',
  },
  {
    id: ncNanoId(),
    href: '/listing-car',
    name: 'Cars',
    type: 'dropdown',
    children: [
      { id: ncNanoId(), href: '/listing-car', name: 'Cars List' },
      { id: ncNanoId(), href: '/listing-car-detail', name: 'Car Detail' },
    ],
  },
  {
    id: ncNanoId(),
    href: '/account',
    name: 'Templates',
    type: 'dropdown',
    children: templatesChildrenMenus,
  },

  {
    id: ncNanoId(),
    href: '/blog',
    name: 'Other pages',
    type: 'dropdown',
    children: otherPageChildMenus,
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: '/',
    name: 'Home',
  },
  {
    id: ncNanoId(),
    href: '/listing-car',
    name: 'Cars',
    children: [
      { id: ncNanoId(), href: '/listing-car', name: 'Cars listings' },
      { id: ncNanoId(), href: '/listing-car-detail', name: 'Car detail' },
    ],
  },

  //
  {
    id: ncNanoId(),
    href: '/account',
    name: 'Templates',
    type: 'dropdown',
    children: templatesChildrenMenus,
  },

  //
  {
    id: ncNanoId(),
    href: '/blog',
    name: 'Other pages',
    type: 'dropdown',
    children: otherPageChildMenus,
  },
];
