'use client';

import { usePathname } from 'next/navigation';
import { NavItem } from './NavItem';
import { useUserStore } from '@/stores/user-store';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

interface IProps {
  isScrolled?: boolean;
  setPathPage: (path: string) => void;
  translate: any;
}

export const Nav = ({
  isScrolled = false,
  setPathPage,
  translate
}: IProps ) => {
  const locale = useLocale();
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const [newPathName, setNewPathName] = useState('');
  const listNavName = ['account.navbar.accountPartner','account.navbar.account', 'account.navbar.password', 'account.navbar.orders', 'account.navbar.carSubscriptions', 'account.navbar.partnerCarsList'];
  const listNavHref = ['/account-partner','/account', '/password', '/orders', '/car-subscriptions', '/partner-cars-list'];

  const filteredNavigationName = listNavName.filter(item => {
    if (!user?.contractor_id) {
      return item !== 'account.navbar.partnerCarsList' && item !== 'account.navbar.accountPartner'
    }
    if (user?.contractor_id) {
      return item !== 'account.navbar.account';
    }
    return true;
  });

  const filteredNavigationHref = listNavHref.filter(item => {
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
        {filteredNavigationHref.map((item, index) => {
          const isActive = newPathName === item;
          return (
            user ? (
              <NavItem
                key={item}
                item={filteredNavigationName[index]}
                href={item}
                translate={translate}
                className={`block border-b-2 flex-shrink-0 capitalize text-neutral-1050 dark:text-white 
                  ${isActive 
                      ? 'border-primary-950 font-medium'
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
