'use client';

import { Route } from '@/types/routers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from './NavItem';
import { useUserStore } from '@/stores/user-store';
import { useEffect } from 'react';

interface IProps {
  isScrolled?: boolean;
  setPathPage: (path: string) => void;
}

export const Nav = ({
  isScrolled = false,
  setPathPage
}: IProps ) => {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);

  const listNav: Route[] = ['/account-partner','/account', '/password', '/orders', '/car-subscriptions', '/partner-cars-list'];

  const filteredNavigationItems = listNav.filter(item => {
    if (!user?.contractor_id) {
      return item !== '/partner-cars-list' && item !== '/account-partner'
    }
    if (user?.contractor_id) {
      return item !== '/account';
    }
    return true;
  });

  useEffect(() => {
    if (pathname) {
      setPathPage(pathname.slice(1));
    }
  }, [pathname]);
  
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
                className={`block border-b-2 flex-shrink-0 capitalize 
                  ${isActive 
                      ? 'border-primary-500 font-medium'
                      : 'border-transparent'
                    }
                  ${isScrolled
                    ? 'py-2 md:py-3 duration-300'
                    : 'py-5 md:py-6 duration-300'
                  }
                `}
              />
            ) : <div key={item} style={{ display: 'none'}}></div>
          );
        })}
      </div>
    </div>
  );
};
