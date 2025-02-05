import { FavoritesCarsList } from "./FavoritesCarsList"
import { IFavoritesCarsDetails } from "@/types/favorites";

interface IProps {
  carListData: IFavoritesCarsDetails[];
  fetchFavoritesCars: () => void;
}

export const CatalogFavorites = ({
  carListData,
  fetchFavoritesCars
}:IProps) => {
  return (
    <div className='relative space-y-6 md:space-y-8 lg:min-h-[350px]'>
      <div className="grid grid-cols-1 gap-4 lg:gap-5 xl:gap-6 lg:grid-cols-3 sm:grid-cols-2 mb-8 md:mb-14">
        <FavoritesCarsList 
          carsListData={carListData} 
          fetchFavoritesCars={fetchFavoritesCars}
        />
      </div>
    </div>
  )
}