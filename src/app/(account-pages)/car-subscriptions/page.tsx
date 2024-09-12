'use client';

import CarSelector from "@/components/CarSelector";
import { Suspense } from "react";
import CarSubscriptions from "./(components)/CarSubscriptions";

const CarSubscribtionsPage = () => {
  return (
    <div className='relative space-y-6 md:space-y-8 lg:min-h-[650px]'>
      <CarSubscriptions />
    </div>
  );
};

export default CarSubscribtionsPage;
