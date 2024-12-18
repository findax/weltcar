import React from 'react';
import NavigationItem from './NavigationItem';
import { NAVIGATION_DEMO } from '@/types/navigation';
import { useUserStore } from '@/stores/user-store';
import { Route } from 'next';

interface IProps {
  translate: any
}

function Navigation({ translate }:IProps) {
  const user = useUserStore((state) => state.user);

  const filteredNavigationItems = NAVIGATION_DEMO.filter(item => {
    if (!user?.contractor_id) {
      return item.href !== '/partner-cars';
    }
    return true;
  });
  
  return (
    <ul className='nc-Navigation hidden lg:flex lg:flex-wrap lg:space-x-1 relative'>
      {filteredNavigationItems.map((item) => (
        <NavigationItem key={item.id} menuItem={item} translate={translate} />
      ))}
    </ul>
  );
}

export default Navigation;
