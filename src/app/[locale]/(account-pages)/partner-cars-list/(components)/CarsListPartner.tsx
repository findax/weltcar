import CarPartnerCard from "@/components/CarPartnerCard"
import { ICarsPartner } from "@/types/partner";

interface IProp {
  carsListData: ICarsPartner[];
}

export const CarsListPartner = ({carsListData}:IProp) => {
  const paddingBottomGrid = 'pb-[61.8%]';

  return (
    <>
      {carsListData.map((car) => (
        <CarPartnerCard
          key={car.id}
          carData={car}
          paddingBottomGrid={paddingBottomGrid}
        />
      ))}
    </>
  )
}