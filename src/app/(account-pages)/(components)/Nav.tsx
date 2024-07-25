'use client';

import { Route } from '@/types/routers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Nav = () => {
  const pathname = usePathname();

  // const listNav: Route[] = ['/account', '/password', '/favorites', '/orders'];
  const listNav: Route[] = ['/account', '/password', '/orders', '/car-subscriptions'];

  return (
    <div className='container'>
      <div className='flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar'>
        {listNav.map((item) => {
          const isActive = pathname === item;
          return (
            <Link
              key={item}
              href={item}
              className={`block py-5 md:py-6 border-b-2 flex-shrink-0 capitalize ${
                isActive
                  ? 'border-primary-500 font-medium'
                  : 'border-transparent'
              }`}
            >
              {item.replace('-', ' ').replace('/', ' ')}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
