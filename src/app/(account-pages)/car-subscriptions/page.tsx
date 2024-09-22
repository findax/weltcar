'use client';

import CarSelector from "@/components/CarSelector";
import { Suspense } from "react";
import CarSubscriptions from "./(components)/CarSubscriptions";

const CarSubscribtionsPage = () => {
  return (
    <div className='relative space-y-10 md:space-y-14 lg:min-h-[650px]'>
      <h2 className='text-4xl font-bold text-neutral-1050 dark:text-white'>Car Subscriptions</h2>
      <CarSubscriptions />
    </div>
  );
};

export default CarSubscribtionsPage;
