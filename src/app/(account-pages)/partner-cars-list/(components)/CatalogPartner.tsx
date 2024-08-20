import { ICarsPartner } from "@/types/partner"
import { CarsListPartner } from "./CarsListPartner"

interface IProps {
  carListData: ICarsPartner[];
}

export const CatalogPartner = ({
  carListData
}:IProps) => {
  return (
    <div className='relative space-y-6 md:space-y-8 lg:min-h-[650px]'>
      <div className="grid grid-cols-1 gap-4 lg:gap-6 lg:grid-cols-3 sm:grid-cols-2 mb-8 md:mb-14">
        <CarsListPartner carsListData={carListData} />
      </div>
    </div>
  )
}