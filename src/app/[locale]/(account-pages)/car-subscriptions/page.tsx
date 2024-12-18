'use client';

import CarSelector from "@/components/CarSelector";
import { Suspense } from "react";
import CarSubscriptions from "./(components)/CarSubscriptions";
import { useTranslations } from "next-intl";

const CarSubscribtionsPage = () => {
  const translate = useTranslations();
  return (
    <div className='relative min-h-[500px] space-y-10 md:space-y-14 lg:min-h-[650px]'>
      <h2 className='text-2xl lg:text-4xl font-bold text-neutral-1050 dark:text-white'>{translate('carSubscriptions.title')}</h2>
      <CarSubscriptions />
    </div>
  );
};

export default CarSubscribtionsPage;
