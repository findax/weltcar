'use client';

import CarSelector from "@/components/CarSelector";
import { Suspense } from "react";

const CarSubscribtionsPage = () => {
  return (
    <div className='relative space-y-6 md:space-y-8 lg:min-h-[650px]'>
      <Suspense>
        <CarSelector />
      </Suspense>
    </div>
  );
};

export default CarSubscribtionsPage;
