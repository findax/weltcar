import Link from 'next/link';
import BtnLikeIcon from '@/components/BtnLikeIcon';
import SoldBadge from '@/components/SoldBadge';
import Badge from '@/shared/Badge';
import CardSlider from '@/components/CardSlider';
import TooltipComponent from '@/shared/TooltipComponent';
import { ButtonPrimary } from '@/shared/Buttons';
import priceWithComma from '@/utils/priceWithComma';
import { ICar } from '@/types/catalog';
import { Route } from 'next';
import Image from 'next/image';
import defaultWatermark from '@/images/defaultWatermark.svg';
import { HeartIcon } from '@heroicons/react/24/outline';
import { IUser } from '@/types/user';
import { useState } from 'react';
import Modal from '@/shared/Modal';
import AuthorizationFavorite from './authorization/AuthorizationFavorite';
import { addToFavoritesCars, deleteFavoriteCar } from '@/api/favorites';
import { useLocale } from 'next-intl';

const CarCard = ({
  className = '',
  carData,
  paddingBottomGrid,
  translate,
  user
}: {
  className?: string;
  carData: ICar;
  paddingBottomGrid: string;
  translate: any;
  user: IUser | null;
}) => {
  const {
    brand,
    car_id,
    id,
    inner_color_hex,
    inner_color_name,
    model,
    outer_color_hex,
    outer_color_name,
    is_favorite,
    photos,
    price,
    status,
    specification,
    year,
    watermark
  } = carData;
  const [isFavorite, setIsFavorite] = useState(is_favorite);
  const locale = useLocale();
  const [isAuthorizationModalOpen, setIsAuthorizationModalOpen] = useState(false);

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

  const handleChangeFavoriteCar = (idCar: string) => {
    if(!user){
      setIsAuthorizationModalOpen(true)
    } else {
      if(isFavorite){
        deleteFavoriteCar(idCar, locale);
        setIsFavorite(!isFavorite);
      } else {
        addToFavoritesCars(idCar, locale);
        setIsFavorite(!isFavorite);
      }
    }
  }

  return (
    <>
      <div
        className={`relative flex flex-col hover:shadow-lg border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 ${className}`}
        data-nc-id='CarCard'
      >
        <div className='relative w-full overflow-hidden'>
          <CardSlider
            photos={photos}
            paddingBottom={paddingBottomGrid}
            grayscale={`${status === 'sold' ? 'grayscale' : ''}`}
            carName={`${brand} ${model}`}
          />
          {renderWatermark()}
          {/* <BtnLikeIcon isLiked={like} className='absolute right-3 top-3 z-[1]' /> */}
          {status === 'sold' && <SoldBadge />}
        </div>
        <div className='flex flex-grow flex-col justify-between py-4 px-5 space-y-2'>
          <div className='space-y-2'>
            <h3 className='flex justify-between capitalize text-xl font-semibold'>
              {/* {status !== 'sold' && <Badge name='ADS' color='green' />} */}
              <span className='mr-4'>
                {brand} {model}{' '}
                <span className='whitespace-nowrap'>{specification}</span>
              </span>
              <span>{year}</span>
            </h3>
            <div className='flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2'>
              <span className=''>{car_id}</span>
              {/* <span>-</span>
              <span className=''>{gearshift} </span> */}
            </div>
          </div>

          <div className='flex'>
            <div className='flex-grow py-3 text-sm space-y-2'>
              <h4 className='flex items-center'>
                {translate('catalog.exterior.title')}
                &nbsp;
                {translate('catalog.exterior.label')}:
                &nbsp;
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
                {translate('catalog.interior.title')}
                &nbsp;
                {translate('catalog.interior.label')}:
                &nbsp;
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
            <div className='flex py-3 items-end'>
              <button className='h-8 w-8' onClick={() => handleChangeFavoriteCar(id)}>
                <HeartIcon className={`h-full w-full`} color={` ${isFavorite ? '#FF6464' : ''}`} />
              </button>
            </div>
          </div>

          <div className='pt-4 flex justify-between items-center border-t border-dashed border-neutral-300 dark:border-neutral-700'>
            <span className='text-2xl font-semibold text-primary-1000 dark:text-primary-400'>
              {priceWithComma(price)}
            </span>
            <Link href={`/car-details/${id}` as Route } target='_blank'>
              <ButtonPrimary
                fontSize='text-sm'
                sizeClass='px-5 py-2'
              >
                {translate('catalog.button.seeMore')}
              </ButtonPrimary>
            </Link>
          </div>
        </div>
      </div>

      {isAuthorizationModalOpen && (
        <Modal isModalOpen={isAuthorizationModalOpen} setIsModalOpen={setIsAuthorizationModalOpen}>
          <AuthorizationFavorite setIsModalOpen={setIsAuthorizationModalOpen} />
        </Modal>
      )}
    </>
  );
};

export default CarCard;
