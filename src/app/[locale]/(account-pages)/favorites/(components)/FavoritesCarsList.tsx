import FavoriteCarCard from "@/components/FavoriteCarCard";
import { IFavoritesCarsDetails } from "@/types/favorites";

interface IProp {
  carsListData: IFavoritesCarsDetails[];
  fetchFavoritesCars: () => void;
}

export const FavoritesCarsList = ({
  carsListData,
  fetchFavoritesCars
}:IProp) => {
  const paddingBottomGrid = 'pb-[61.8%]';

  return (
    <>
      {carsListData.map((car) => (
        <FavoriteCarCard
          key={car.id}
          carData={car}
          paddingBottomGrid={paddingBottomGrid}
          fetchFavoritesCars={fetchFavoritesCars}
        />
      ))}
    </>
  )
}