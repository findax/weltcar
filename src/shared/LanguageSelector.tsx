'use client'

import { LocaleData } from "@/types/languages";
import { useLocale } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface IProps {
  className?: string;
  languages: LocaleData[];
}

export const LanguageSelector = ({
  className,
  languages
}:IProps) => {
  const localActive = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [showDropDown, setShowDropDown] = useState(false); 
  const [currentLocale, setCurrentLocale] = useState(localActive); 

  const params: any = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const handleChangeLocale = (locale: string) => {
    const updatedPath = pathname.replace(`/${localActive}`, '');
    let newPath = `${locale}${updatedPath}`;
    
    if (Object.keys(params).length > 0) {
      let queriesString = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
      newPath = `${locale}${updatedPath}?${queriesString}`
    }
    router.replace(`/${newPath}`);
    setCurrentLocale(locale);
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <button className="border uppercase text-md text-neutral-500 block w-fit border-neutral-200 focus:border-primary-300 bg-white dark:border-neutral-700 dark:bg-neutral-900 rounded-2xl font-normal h-11 px-4 py-3 text-left flex items-center justify-between" onClick={() => setShowDropDown(!showDropDown)}>{currentLocale}</button>
        {showDropDown &&
          <div className="absolute overflow-y-auto z-10 mt-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-lg">
            {languages.map(lang => (
              <div 
                className={`py-2 px-3 dark:hover:text-black ${ localActive === lang.locale ? 'dark:text-black dark:bg-neutral-300 bg-neutral-100' : ''} hover:bg-neutral-100 dark:hover:bg-neutral-300 cursor-pointer`}
                key={lang.locale}
                onClick={() => {
                  handleChangeLocale(lang.locale)
                  setShowDropDown(false)
                }}
              >
                {lang.name}
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

