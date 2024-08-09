'use client';

import { Route } from '@/types/routers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from './NavItem';
import { useUserStore } from '@/stores/user-store';

export const Nav = () => {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);

  const listNav: Route[] = ['/account', '/password', '/orders', '/car-subscriptions', '/partner-cars-list'];

  const filteredNavigationItems = listNav.filter(item => {
    if (!user?.contractor_id) {
      return item !== '/partner-cars-list';
    }
    if (user?.contractor_id) {
      return item !== '/account';
    }
    return true;
  });

  return (
    <div className='container'>
      <div className='flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar'>
        {filteredNavigationItems.map((item) => {
          const isActive = pathname === item;
          return (
            user ? (
              <NavItem
                key={item}
                item={item}
                className={`block py-5 md:py-6 border-b-2 flex-shrink-0 capitalize ${
                  isActive
                    ? 'border-primary-500 font-medium'
                    : 'border-transparent'
                }`}
              />
            ) : <div key={item} style={{ display: 'none'}}></div>
          );
        })}
      </div>
    </div>
  );
};
