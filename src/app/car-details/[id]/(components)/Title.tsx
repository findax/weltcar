import { ICarDetails } from '@/types/cardetails';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

export default function Title({
  carData,
}: {
  carData: ICarDetails | undefined;
}) {
  const {
    brand,
    model,
    year,
    car_id,
    vin,
    outer_color_hex,
    outer_color_name,
    inner_color_hex,
    inner_color_name,
    pdf_url,
  } = carData || {};

  return (
    <div className='detailsSection__wrap sm:bg-white dark:bg-neutral-900'>
      <div>
        <h2 className='flex items-center justify-between text-2xl sm:text-3xl lg:text-4xl font-semibold'>
          <span className='mr-4'>
            {brand} {model}
          </span>
          <span>{year}</span>
        </h2>
        <div className='mt-3 font-semibold text-neutral-400'>{car_id}</div>
      </div>

      <div className='flex flex-wrap items-center justify-between'>
        <div className='space-y-2 text-sm whitespace-nowrap mr-4'>
          <div className='flex items-center'>
            <span className=''>exterior color:</span>
            <span
              className='w-6 h-6 mx-2 rounded-full inline-block border border-neutral-500'
              style={{ backgroundColor: `${outer_color_hex}` }}
            ></span>
            <span className=''> - {outer_color_name}</span>
          </div>
          <div className='flex items-center'>
            <span className=''>interior color:</span>
            <span
              className='w-6 h-6 mx-2 rounded-full inline-block border border-neutral-500'
              style={{ backgroundColor: `${inner_color_hex}` }}
            ></span>
            <span className=''> - {inner_color_name}</span>
          </div>
        </div>

        <a
          href={pdf_url}
          download
          className='flex flex-col items-center justify-center py-3 text-sm'
        >
          <DocumentArrowDownIcon className='w-8' />
          <span>PDF</span>
        </a>
      </div>

      <div className='w-full border-b border-neutral-300 dark:border-neutral-700' />

      <div className='font-semibold'>VIN: {vin}</div>
    </div>
  );
}
