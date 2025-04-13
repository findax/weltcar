import BtnLikeIcon from '@/components/BtnLikeIcon';
import SoldBadge from '@/components/SoldBadge';
import Badge from '@/shared/Badge';
import CardSlider from '@/components/CardSlider';
import TooltipComponent from '@/shared/TooltipComponent';
import { ButtonPrimary } from '@/shared/Buttons';
import priceWithComma from '@/utils/priceWithComma';
import { ICar } from '@/types/catalog';
import Link from 'next/link';
import { Route } from 'next';
import Image from 'next/image';
import defaultWatermark from '@/images/defaultWatermark.svg';
import { HeartIcon } from '@heroicons/react/24/outline';
import { IUser } from '@/types/user';
import { useMemo, useState } from 'react';
import { addToFavoritesCars, deleteFavoriteCar } from '@/api/favorites';
import { useLocale } from 'next-intl';
import { toast } from 'react-toastify';
import { usePathname } from 'next/navigation';
import Modal from '@/shared/Modal';
import AuthorizationFavorite from './authorization/AuthorizationFavorite';

const CarCardH = ({
  className = '',
  carData,
  paddingBottomHorizontal,
  translate,
  user
}: {
  className?: string;
  carData: ICar;
  paddingBottomHorizontal: string;
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
    photos,
    price,
    status,
    specification,
    year,
    watermark,
    is_favorite
  } = carData;
  const locale = useLocale();
  const pathname = usePathname();
  const [isFavorite, setIsFavorite] = useState(is_favorite);
  const [isAuthorizationModalOpen, setIsAuthorizationModalOpen] = useState(false);

  const isCatalogAPage = useMemo(() => pathname.split('/').pop() === 'catalog-a', [pathname]);
  const buttonStylesCatalogA = isCatalogAPage ? 'bg-[#f0ad4e] hover:bg-[#ec971f]' : '';

  const handleChangeFavoriteCar = (idCar: string) => {
    if(!user){
      setIsAuthorizationModalOpen(true)
    } else {
      if(isFavorite){
        deleteFavoriteCar(idCar, locale);
        setIsFavorite(!isFavorite);
        toast.success(translate('favorites.message.toast.delete'));
      } else {
        addToFavoritesCars(idCar, locale);
        setIsFavorite(!isFavorite);
        toast.success(translate('favorites.message.toast.add'));
      }
    }
  }

  const renderWatermark = () => {
    return (
      <div className='absolute bottom-4 right-4 z-10'>
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

  return (
    <>
      <div
        className={`relative flex bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700 rounded-2xl overflow-hidden ${className}`}
      >
        <div className='relative w-[55%] lg:w-[50%] xl:w-[55%] 2xl:w-[60%] overflow-hidden'>
          <CardSlider
            photos={photos}
            paddingBottom={paddingBottomHorizontal}
            grayscale={`${status === 'sold' ? 'grayscale' : ''}`}
            carName={`${brand} ${model}`}
          />
          {renderWatermark()}
          {/* <BtnLikeIcon isLiked={like} className='absolute right-3 top-3' /> */}
          {status === 'sold' && <SoldBadge />}
        </div>
        <div className='w-[45%] lg:w-[50%] xl:w-[45%] 2xl:w-[40%] flex flex-col justify-between px-5 py-4 xl:py-5 space-y-4 2xl:gap-5'>
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
            <div className='flex-grow space-y-2'>
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
            <div className='flex items-end'>
              <button className='h-8 w-8' onClick={() => handleChangeFavoriteCar(id)}>
                <HeartIcon className={`h-full w-full`} color={` ${isFavorite ? '#FF6464' : ''}`} />
              </button>
            </div>
          </div>

          <div className='pt-4 xl:pt-5 flex justify-between items-center border-t border-dashed border-neutral-300 dark:border-neutral-700'>
            <span className='text-2xl xl:text-3xl font-semibold text-primary-1000 dark:text-primary-400'>
              {priceWithComma(price)}
            </span>
            <Link href={`/car-details/${id}` as Route} target='_blank'>
              <ButtonPrimary
                className={`${buttonStylesCatalogA}`}
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

export default CarCardH;
