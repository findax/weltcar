import Pagination from '@/shared/Pagination';
import CarCard from '@/components/CarCard';
import CarCardH from '@/components/CarCardH';
import CarCardHSkeleton from '@/components/CarCardHSkeleton';
import CarCardSkeleton from '@/components/CarCardSkeleton';
import { ICar } from '@/types/catalog';

const CarList = ({
  carListState,
  isLoading,
  isGrid,
}: {
  carListState: ICar[];
  isLoading: boolean;
  isGrid: boolean;
}) => {
  const ww = typeof window !== 'undefined' ? window.innerWidth : 1000;

  return (
    <>
      {ww > 767 && !isGrid ? (
        isLoading ? (
          <CarCardHSkeleton />
        ) : (
          <div className='flex flex-col gap-4 lg:gap-6'>
            {carListState.map((car) => (
              <CarCardH key={car.id} carData={car} />
            ))}
          </div>
        )
      ) : isLoading ? (
        <CarCardSkeleton />
      ) : (
        <div className='grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-2'>
          {carListState.map((car) => (
            <CarCard key={car.id} carData={car} />
          ))}
        </div>
      )}
      <div className='flex my-8 md:my-14 justify-center items-center'>
        <Pagination />
      </div>
    </>
  );
};

export default CarList;
