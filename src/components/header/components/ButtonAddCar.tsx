'use client';

import { NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const ButtonAddCar = () => {
  const [buttonInfo, setButtonInfo] = useState<NavItemType>({ id: ncNanoId(), href: '/partner-cars', name: 'Add Car' })
  const locationPathName = usePathname();
  const isActive = locationPathName === buttonInfo.href;

  return (
    <div className="hidden items-center lg:flex xl:flex 2xl:flex">
      <Link
        className={`inline-flex items-center text-sm xl:text-base font-normal text-neutral-700 dark:text-neutral-300 py-2 px-4 xl:px-5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-950 ${
          isActive ? 'text-primary-600 dark:text-primary-950' : ''
        }`}
        href={buttonInfo.href}
      >
        {buttonInfo.name}
      </Link>
    </div>
  );
};

export default ButtonAddCar;
