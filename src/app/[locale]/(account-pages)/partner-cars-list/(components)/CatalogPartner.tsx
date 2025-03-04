import { ICarsPartner } from "@/types/partner"
import { CarsListPartner } from "./CarsListPartner"

interface IProps {
  carListData: ICarsPartner[];
  results?: number;
}

export const CatalogPartner = ({
  carListData,
  results
}:IProps) => {
  return (
    <div className='relative space-y-6 md:space-y-8 lg:min-h-[350px]'>
      <CarsListPartner 
        carsListData={carListData} 
        results={results}
      />
    </div>
  )
}