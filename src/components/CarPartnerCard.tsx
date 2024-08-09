import BtnLikeIcon from '@/components/BtnLikeIcon';
import Badge from '@/shared/Badge';
import CardSlider from '@/components/CardSlider';
import TooltipComponent from '@/shared/TooltipComponent';
import { ButtonPrimary } from '@/shared/Buttons';
import priceWithComma from '@/utils/priceWithComma';
import Link from 'next/link';
import { ICarsPartner } from '@/types/partner';
import InactiveBadge from './InactiveBadge';
import { deletePartnerCar } from '@/api/cars';
import DeletedBadge from './deletedBadge';

const CarPartnerCard = ({
  className = '',
  carData,
  paddingBottomGrid,
}: {
  className?: string;
  carData: ICarsPartner;
  paddingBottomGrid: string;
}) => {
  const {
    vin,
    brand,
    id,
    inner_color_hex,
    inner_color_name,
    model,
    outer_color_hex,
    outer_color_name,
    photos,
    price,
    is_sold,
    specification,
    contractor_comment,
    year,
    is_verified,
    is_deleted
  } = carData;

  const handleDeleteCarCard = () => {
    deletePartnerCar(id)
  }

  const renderBadge = () => {
    if (!is_verified && is_deleted){
      return <DeletedBadge />
    }
    if(!is_verified){
      return <InactiveBadge />
    } 
  } 

  return (
    <div
      className={`relative flex flex-col hover:shadow-lg border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 ${className}`}
      data-nc-id='CarCard'
    >
      <div className='relative w-full overflow-hidden'>
        <CardSlider
          photos={photos}
          paddingBottom={paddingBottomGrid}
          grayscale={`${!is_verified ? 'grayscale' : ''}`}
          carName={`${brand} ${model}`}
        />
        {/* <BtnLikeIcon isLiked={like} className='absolute right-3 top-3 z-[1]' /> */}
        {renderBadge()}
      </div>
      <div className='flex flex-grow flex-col justify-between py-4 px-5 space-y-2'>
        <div className='space-y-2'>
          <h3 className='flex justify-between capitalize text-xl font-semibold'>
            {is_sold && <Badge name='ADS' color='green' />}
            <span className='mr-4'>
              {brand} {model}{' '}
              <span className='whitespace-nowrap'>{specification}</span>
            </span>
            <span>{year}</span>
          </h3>
          {
            vin && 
            <div className='flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2'>
              <span className=''>{vin}</span>
              <span>-</span>
              <span className=''>{'VIN'} </span>
            </div>
          }
        </div>

        <div className='flex-grow py-3 text-sm space-y-2'>
          <h4 className='flex items-center'>
            exterior&nbsp;color:&nbsp;
            <span
              className='w-6 h-6 mx-2 rounded-full inline-block border border-neutral-500 flex-shrink-0'
              style={{ backgroundColor: `${outer_color_hex}` }}
              data-tooltip-id={`${id}-exterior-color`}
            >
              <TooltipComponent
                id={`${id}-exterior-color`}
                content={outer_color_name}
              />
            </span>
          </h4>
          <h4 className='flex items-center'>
            interior&nbsp;color:&nbsp;
            <span
              className='w-6 h-6 mx-2 rounded-full inline-block border border-neutral-500 flex-shrink-0'
              style={{ backgroundColor: `${inner_color_hex}` }}
              data-tooltip-id={`${id}-interior-color`}
            >
              <TooltipComponent
                id={`${id}-interior-color`}
                content={inner_color_name}
              />
            </span>
          </h4>
        </div>

        <div className='flex-grow py-3 text-sm space-y-2'>
          <h4 className='flex items-center'>
            {contractor_comment}
          </h4>
        </div>

        <div className='pt-4 flex justify-between items-center border-t border-dashed border-neutral-300 dark:border-neutral-700'>
          <span className='text-2xl font-semibold text-primary-400'>
            {priceWithComma(price)}
          </span>
          <div className='flex gap-1'>
            <ButtonPrimary
              onClick={handleDeleteCarCard}
              fontSize='text-sm'
              sizeClass='px-3 py-2 md:px-4 md:py-2'
              >
                Remove
            </ButtonPrimary>
            <Link href={`/partner-cars?id=${id}`} target='_blank'>
              <ButtonPrimary
                fontSize='text-sm'
                sizeClass='px-3 py-2 md:px-4 md:py-2'
              >
                Edit
              </ButtonPrimary>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarPartnerCard;
