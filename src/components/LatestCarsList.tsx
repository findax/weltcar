'use client';

import { Car } from '@/api';
import { useUserStore } from '@/stores/user-store';
import { useTranslations } from 'next-intl';
import CarCard from './CarCard';

interface LatestCarsListProps {
  carList: Car[];
}

const LatestCarsList = ({ carList }: LatestCarsListProps) => {
  const t = useTranslations();
  const user = useUserStore((state) => state.user);

  return (
    <div className='grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-2 mb-8 md:mb-14 lg:grid-cols-3 xl:grid-cols-4'>
      {carList.map((car) => (
        <CarCard
          key={car.id}
          carData={car}
          paddingBottomGrid={'pb-[61.8%]'}
          translate={t}
          user={user}
        />
      ))}
    </div>
  );
};

export default LatestCarsList;
