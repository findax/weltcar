'use client';

import { PathName } from '@/types/routers';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC, Fragment, useEffect, useState } from 'react';

// <--- NavItemType --->
export interface NavItemType {
  id: string;
  name: string;
  href: PathName;
  targetBlank?: boolean;
  children?: NavItemType[];
  type?: 'dropdown' | 'none';
}

interface NavigationItemProps {
  menuItem: NavItemType;
  translate: any;
}

const NavigationItem = ({ 
  menuItem,
  translate
}: NavigationItemProps) => {
  const [menuCurrentHovers, setMenuCurrentHovers] = useState<string[]>([]);

  // CLOSE ALL MENU OPENING WHEN CHANGE HISTORY
  const locationPathName = usePathname();
  const isActive = locationPathName === menuItem.href;

  // useEffect(() => {
  //   setMenuCurrentHovers([]);
  // }, [locationPathName]);

  const onMouseEnterMenu = (id: string) => {
    setMenuCurrentHovers((state) => [...state, id]);
  };

  const onMouseLeaveMenu = (id: string) => {
    setMenuCurrentHovers((state) => {
      return state.filter((item, index) => {
        return item !== id && index < state.indexOf(id);
      });
    });
  };

  // ===================== MENU DROPDOW =====================
  // const renderDropdownMenu = (menuDropdown: NavItemType) => {
  //   const isHover = menuCurrentHovers.includes(menuDropdown.id);
  //   return (
  //     <Popover
  //       as='li'
  //       className='menu-item flex items-center menu-dropdown relative'
  //       onMouseEnter={() => onMouseEnterMenu(menuDropdown.id)}
  //       onMouseLeave={() => onMouseLeaveMenu(menuDropdown.id)}
  //     >
  //       {() => (
  //         <>
  //           <div>{renderMainItem(menuDropdown)}</div>
  //           <Transition
  //             as={Fragment}
  //             show={isHover}
  //             enter='transition ease-out duration-150 '
  //             enterFrom='opacity-0 translate-y-1'
  //             enterTo='opacity-100 translate-y-0'
  //             leave='transition ease-in duration-150'
  //             leaveFrom='opacity-100 translate-y-0'
  //             leaveTo='opacity-0 translate-y-1'
  //           >
  //             <Popover.Panel
  //               static
  //               className='sub-menu will-change-transform absolute transform z-10 w-56 top-full left-0'
  //             >
  //               <ul className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-4 grid space-y-1'>
  //                 {menuDropdown.children?.map((item) => (
  //                   <li key={item.id} className='px-2'>
  //                     <Link
  //                       className='flex items-center font-normal text-neutral-700 dark:text-neutral-300 py-2 px-4 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-600'
  //                       href={item.href || ''}
  //                     >
  //                       {item.name}
  //                     </Link>
  //                   </li>
  //                 ))}
  //               </ul>
  //             </Popover.Panel>
  //           </Transition>
  //         </>
  //       )}
  //     </Popover>
  //   );
  // };

  // ===================== MENU MAIN MENU =====================
  const renderMainItem = (item: NavItemType) => {
    return item.type ? (
      <div className='inline-flex items-center text-sm xl:text-base font-normal text-neutral-700 dark:text-neutral-300 py-2 px-4 xl:px-5 rounded-full cursor-default hover:bg-neutral-100 dark:hover:bg-neutral-800'>
        {translate(item.name)}
        <ChevronDownIcon
          className='ml-1 -mr-1 h-4 w-4 text-neutral-400'
          aria-hidden='true'
        />
      </div>
    ) : (
      <Link
        className={`inline-flex items-center text-sm xl:text-base font-normal text-neutral-700 dark:text-neutral-300 py-2 px-4 xl:px-5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-950 ${
          isActive ? 'text-primary-600 dark:text-primary-950' : ''
        }`}
        href={item.href || '/'}
        scroll={false}
      >
        {translate(item.name)}
      </Link>
    );
  };

  return (
    <li className='menu-item flex items-center'>
      {renderMainItem(menuItem)}
    </li>
  );
};
// Your component own properties

export default NavigationItem;
