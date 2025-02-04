import Link from 'next/link';
import BtnLikeIcon from '@/components/BtnLikeIcon';
import SoldBadge from '@/components/SoldBadge';
import Badge from '@/shared/Badge';
import CardSlider from '@/components/CardSlider';
import TooltipComponent from '@/shared/TooltipComponent';
import { ButtonPrimary } from '@/shared/Buttons';
import { Route } from 'next';
import Image from 'next/image';
import defaultWatermark from '@/images/defaultWatermark.svg';
import { deleteFavoriteCar } from '@/api/favorites';
import { useLocale, useTranslations } from 'next-intl';
import { IFavoritesCarsDetails } from '@/types/favorites';
import { toast } from 'react-toastify';

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
    watermark
  } = carData;
  const translate = useTranslations();
  const locale = useLocale();
  const isActive = status === 'sold';

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
        className={`relative flex flex-col hover:shadow-lg border border-neutral-200 ${isActive ? "dark:bg-neutral-1250 dark:border-neutral-1300 bg-neutral-1350 border-neutral-1400" : ""} dark:border-neutral-700 rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 ${className}`}
        data-nc-id='CarCard'
      >
        <div className='relative w-full overflow-hidden'>
          <CardSlider
            photos={photos}
            paddingBottom={paddingBottomGrid}
            grayscale={`${isActive ? 'grayscale' : ''}`}
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
                 <span>{status_extra}</span>
              )}
            </div>
          </div>

          <div className='pt-4 flex justify-end items-center border-t border-dashed border-neutral-300 dark:border-neutral-700'>
            {
              isActive ? (
                <ButtonPrimary
                  fontSize='text-sm'
                  sizeClass='px-5 py-2'
                  onClick={handleRemoveFavoriteCar}
                >
                  {translate('favorites.catalog.button.remove')}
                </ButtonPrimary>
              ) : (
                <Link href={`/car-details/${id}` as Route } target='_blank'>
                  <ButtonPrimary
                    fontSize='text-sm'
                    sizeClass='px-5 py-2'
                  >
                    {translate('favorites.catalog.button.seeMore')}
                  </ButtonPrimary>
                </Link>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default FavoriteCarCard;
