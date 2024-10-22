import { ICarDetails } from '@/types/cardetails';
import { ICarPartnerDetails } from '@/types/partner';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

export default function Title({
  carData,
}: {
  carData: ICarDetails | ICarPartnerDetails | undefined;
}) {
  const {
    brand,
    car_id,
    inner_color_hex,
    inner_color_name,
    model,
    outer_color_hex,
    outer_color_name,
    pdf_url,
    specification,
    vin,
    year,
  } = carData || {};

  return (
    <div className='detailsSection__wrap sm:bg-white dark:bg-neutral-900'>
      <div>
        <h2 className='flex justify-between text-2xl sm:text-3xl lg:text-4xl font-semibold'>
          <span className='mr-4'>
            {brand} {model}{' '}
            <span className='whitespace-nowrap'>{specification}</span>
          </span>
          <span>{year}</span>
        </h2>
        <div className='mt-3 font-semibold text-neutral-400'>{car_id}</div>
      </div>

      <div className='flex flex-wrap justify-between gap-4'>
        <div className='flex flex-col justify-betwee space-y-2 text-base mr-4'>
          <div className='my-2 flex items-center flex-wrap gap-1'>
            <div className='flex items-center'>
              <span className=''>exterior color:</span>
              <span
                className='w-6 h-6 mx-3 rounded-full inline-block border border-neutral-500 flex-shrink-0'
                style={{ backgroundColor: `${outer_color_hex}` }}
              ></span>
            </div>
            <span className=''>{outer_color_name}</span>
          </div>
          <div className='mt-auto my-2 flex items-center flex-wrap gap-1'>
            <div className='flex items-center'>
              <span className=''>interior color:</span>
              <span
                className='w-6 h-6 mx-3 rounded-full inline-block border border-neutral-500 flex-shrink-0'
                style={{ backgroundColor: `${inner_color_hex}` }}
              ></span>
            </div>
            <span className=''>{inner_color_name}</span>
          </div>
        </div>

        <a
          href={pdf_url}
          download
          className='flex flex-col items-center justify-center group'
        >
          <DocumentArrowDownIcon className='w-12 group-hover:text-primary-700 dark:group-hover:text-primary-500' />
          <span className='text-lg font-semibold group-hover:text-primary-700 dark:group-hover:text-primary-500'>
            PDF
          </span>
        </a>
      </div>

      {
        vin && 
          <div 
            className='font-semibold'
          >
            VIN: {vin}
          </div>
      }
    </div>
  );
}
