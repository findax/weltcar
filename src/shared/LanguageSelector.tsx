'use client'

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const LanguageSelector = () => {
  // const [ startTransition ] = useTranslations();
  const localActive = useLocale();
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState(false); 
  const [currentLocale, setCurrentLocale] = useState(localActive); 
  const languages = [
    {
      locale: 'en',
      fullName: 'English'
    },
    {
      locale: 'de',
      fullName: 'German'
    },
    {
      locale: 'zh-cn',
      fullName: 'Chinese'
    },
  ];

  const handleChangeLocale = (locale: string) => {
    const nextLocal = locale;
    router.replace(`/${nextLocal}`);
    setCurrentLocale(locale);
  }

  return (
    <div className="flex items-center h-8 gap-2 w-fit bg-white">
      <div className="relative">
        <button className="text-black" onClick={() => setShowDropDown(!showDropDown)}>{currentLocale}</button>
        {showDropDown &&
          <div className="absolute">
            {languages.map(lang => (
              <div 
                onClick={() => {
                  handleChangeLocale(lang.locale)
                  setShowDropDown(false)
                }}
              >
                {lang.fullName}
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

