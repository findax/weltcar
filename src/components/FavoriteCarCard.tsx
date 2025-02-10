import Link from 'next/link';
import SoldBadge from '@/components/SoldBadge';
import CardSlider from '@/components/CardSlider';
import { ButtonPrimary } from '@/shared/Buttons';
import { Route } from 'next';
import Image from 'next/image';
import defaultWatermark from '@/images/defaultWatermark.svg';
import { deleteFavoriteCar } from '@/api/favorites';
import { useLocale, useTranslations } from 'next-intl';
import { IFavoritesCarsDetails } from '@/types/favorites';
import { toast } from 'react-toastify';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const FavoriteCarCard = ({
  className = '',
  carData,
  paddingBottomGrid,
  fetchFavoritesCars
}: {
  className?: string;
  carData: IFavoritesCarsDetails;
  paddingBottomGrid: string;
  fetchFavoritesCars: () => void;
}) => {
  const {
    brand,
    id,
    model,
    photos,
    specification,
    status,
    year,
    status_extra,
    watermark,
    is_favorite
  } = carData;
  const translate = useTranslations();
  const locale = useLocale();
  const [isFavorite, setIsFavorite] = useState(is_favorite);
  const isInActive = status === 'sold' || status === 'inactive';

  const renderWatermark = () => {
    return (
      <div className='absolute bottom-3 right-4 z-10'>
        {watermark ? (
          <Image
            src={watermark}
            alt={'default watermark'}
            height={25}
            width={80}
          />
        ) : (
          <Image
            src={defaultWatermark}
            alt={'default watermark'}
            height={25}
            width={80}
          />
        )}
      </div>
    )
  }

  const handleRemoveFavoriteCar = async () => {
    await deleteFavoriteCar(id, locale);
    toast.success(translate('favorites.toast.success.delete'));
    fetchFavoritesCars();
  }

  return (
    <>
      <div
        className={`relative flex flex-col hover:shadow-lg border border-neutral-200 ${isInActive ? "dark:bg-neutral-1250 dark:border-neutral-1300 bg-neutral-1350 border-neutral-1400" : ""} dark:border-neutral-700 rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 ${className}`}
        data-nc-id='CarCard'
      >
        <div className='relative w-full overflow-hidden'>
          <CardSlider
            photos={photos}
            paddingBottom={paddingBottomGrid}
            grayscale={`${isInActive ? 'grayscale' : ''}`}
            carName={`${brand} ${model}`}
          />
          {renderWatermark()}
          {status === 'sold' && <SoldBadge />}
        </div>
        <div className='flex flex-grow flex-col justify-between py-4 px-5 space-y-2'>
          <div className='space-y-2'>
            <h3 className='flex justify-between capitalize text-xl font-semibold'>
              <span className={`mr-4`}>
                {brand} {model}{' '}
                <span className='whitespace-nowrap'>{specification}</span>
              </span>
              <span>{year}</span>
            </h3>
            <div className='flex items-center text-neutral-500 dark:text-neutral-400 space-x-2'>
              <span>{status}</span>
              {status_extra && (
                 <span className={`${isInActive ? 'hidden' : 'block'}`}>{status_extra}</span>
              )}
            </div>
          </div>

          <div className='pt-4 flex justify-end gap-5 items-center border-t border-dashed border-neutral-300 dark:border-neutral-700'>
            <button onClick={handleRemoveFavoriteCar}>
              <HeartIcon className={`h-8 w-8 mr-3`} color={` ${isFavorite ? '#FF6464' : ''}`} />
            </button>

            <Link href={`/car-details/${id}` as Route } target='_blank'>
              <ButtonPrimary
                fontSize='text-sm'
                sizeClass='px-5 py-2'
              >
                {translate('favorites.catalog.button.seeMore')}
              </ButtonPrimary>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FavoriteCarCard;
