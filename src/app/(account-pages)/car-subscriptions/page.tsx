'use client';

//import { getModels } from "@/api/cars";
import CarSelector from "@/components/CarSelector";
import { useEffect, useState } from "react";

const CarSubscribtionsPage = () => {
  const [models, setModels] = useState([]);

  console.log(models);
  // useEffect(() => {
  //   getModels().then((data: any) => {
  //     if(data){
  //       setModels(data);
  //     }
  //   })
  // },[])


  return (
    <div className='relative space-y-6 md:space-y-8 lg:min-h-[650px]'>
      <CarSelector />
    </div>
  );
};

export default CarSubscribtionsPage;
