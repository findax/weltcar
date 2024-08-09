import { ICarsPartner } from "@/types/partner"
import { CarsListPartner } from "./CarsListPartner"
import { useEffect, useState } from "react";
import { getPartnerCars } from "@/api/cars";
import LoadingSpinner from "@/shared/LoadingSpinner";
import ErrorComponent from "@/components/ErrorComponent";


export const CatalogPartner = () => {
  const [isFirstLoading, setFirstLoading] = useState(true);
  const [isError, setError] = useState(false)
  const [carListData, setCarListData] = useState<ICarsPartner[]>([]);

  useEffect(() => {
    if(isFirstLoading){
      getPartnerCars(1,10)
        .then((data) => {
          data && setCarListData(data);
        })
        .finally(() => {
          isFirstLoading && setFirstLoading(false);
        }); 
    }
  },[isFirstLoading]);

  return isFirstLoading ? (
    <div className='h-[calc(100vh-76px)] flex justify-center items-center'>
      <div className='-mt-[76px]'>
        <LoadingSpinner className='w-12' />
      </div>
    </div>
  ) : isError ? (
    <div className='h-[calc(100vh-76px)] flex justify-center items-center'>
      <ErrorComponent />
    </div>
  ) : (
    <div className='relative space-y-6 md:space-y-8 lg:min-h-[650px]'>
      <div className="grid grid-cols-1 gap-4 lg:gap-6 lg:grid-cols-3 sm:grid-cols-2 mb-8 md:mb-14">
        <CarsListPartner carsListData={carListData} />
      </div>
    </div>
  )
}