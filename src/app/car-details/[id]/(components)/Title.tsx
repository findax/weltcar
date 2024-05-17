import { ICarDetails } from '@/types/cardetails';

export default function Title({
  carData,
}: {
  carData: ICarDetails | undefined;
}) {
  const { brand, model, year, car_id, vin } = carData || {};

  return (
    <div className='detailsSection__wrap sm:bg-white dark:bg-neutral-900'>
      <div>
        <h2 className='flex items-center justify-between text-2xl sm:text-3xl lg:text-4xl font-semibold'>
          <span>
            {brand} {model}
          </span>{' '}
          <span>{year}</span>
        </h2>
        <div className='mt-3 font-semibold text-neutral-400'>{car_id}</div>
      </div>

      <div className='w-full border-b border-neutral-300 dark:border-neutral-700' />

      <div className='font-semibold'>VIN: {vin}</div>
    </div>
  );
}
