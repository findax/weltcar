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
import Modal from '@/shared/Modal';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Route } from 'next';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import defaultWatermark from '@/images/defaultWatermark.svg';

const CarPartnerCard = ({
  className = '',
  carData,
  paddingBottomGrid,
}: {
  className?: string;
  carData: ICarsPartner;
  paddingBottomGrid: string;
}) => {
  const translate = useTranslations();
  const locale = useLocale();
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
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
    is_deleted,
    watermark
  } = carData;

  const handleModalDeleteOpen = () => {
    setIsModalDeleteOpen(true);
  }

  const handleDeleteCarCard = () => {
    deletePartnerCar(id, locale);
    let delateMessage = translate('yourCars.toast.success.delete');
    toast.success(delateMessage);
    setIsModalDeleteOpen(false);
  }

  const renderBadge = () => {
    if (!is_verified && is_deleted){
      return <DeletedBadge />
    }
    if(!is_verified){
      return <InactiveBadge />
    } else {
      return null
    }
  } 

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
            grayscale={`${!is_verified ? 'grayscale' : ''}`}
            carName={`${brand} ${model}`}
          />
          {renderWatermark()}
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
              {translate('yourCars.exterior.label')}
              &nbsp;
              {translate('yourCars.exterior.color')}
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
              {translate('yourCars.interior.label')}
              &nbsp;
              {translate('yourCars.interior.color')}
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

          <div className='flex-grow py-3 text-sm space-y-2'>
            <h4 className='flex items-center'>
              {contractor_comment}
            </h4>
          </div>

          <div className='pt-4 flex flex-col gap-3 justify-between items-center border-t border-dashed border-neutral-300 dark:border-neutral-700'>
            <span className='2xl:text-2xl xl:text-xl font-semibold text-primary-1000 dark:text-primary-400'>
              {priceWithComma(price)}
            </span>
            <div style={{ display: `${ is_deleted ? "none" : "display"}`}} className='flex w-full justify-around'>
              <ButtonPrimary
                onClick={handleModalDeleteOpen}
                fontSize='lg:text-md text-xs'
                sizeClass='h-full lg:px-2.5 lg:py-2 px-2 py-1.5'
                >
                  {translate('yourCars.button.delete')}
              </ButtonPrimary>
              <Link href={`/partner-cars?id=${id}` as Route} target='_blank'>
                <ButtonPrimary
                  fontSize='lg:text-md text-xs'
                  sizeClass='h-full lg:px-2.5 lg:py-2 px-2 py-1.5'
                >
                  {translate('yourCars.button.edit')}
                </ButtonPrimary>
              </Link>
              <Link href={`/partner-car-details/${id}` as Route} target='_blank'>
                <ButtonPrimary
                  fontSize='lg:text-md text-xs'
                  sizeClass='h-full lg:px-2.5 lg:py-2 px-2 py-1.5'
                >
                  {translate('yourCars.button.seeMore')}
                </ButtonPrimary>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Modal 
        title='yourCars.modal.title' 
        isModalOpen={isModalDeleteOpen} 
        setIsModalOpen={setIsModalDeleteOpen}
      >
        <div className='flex flex-col'>
          <div className='text-center space-y-5'>
            <InformationCircleIcon className='block mx-auto w-24 h-24 text-yellow-500' />
            <p className='px-3 text-md font-semibold'>
              {translate('yourCars.modal.label')}
            </p>
          </div>
          <div className='flex gap-3 pt-5 m-auto'>
            <ButtonPrimary
              onClick={() => setIsModalDeleteOpen(false)}
              fontSize='text-sm'
              sizeClass='px-3 py-2 md:px-4 md:py-2'
              >
                {translate('yourCars.modal.button.cancel')}
            </ButtonPrimary>
            <ButtonPrimary
              onClick={handleDeleteCarCard}
              fontSize='text-sm'
              sizeClass='px-3 py-2 md:px-4 md:py-2'
              >
                {translate('yourCars.modal.button.delete')}
            </ButtonPrimary>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CarPartnerCard;
