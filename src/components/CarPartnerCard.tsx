import BtnLikeIcon from '@/components/BtnLikeIcon';
import Badge from '@/shared/Badge';
import CardSlider from '@/components/CardSlider';
import TooltipComponent from '@/shared/TooltipComponent';
import { ButtonPrimary, ButtonThird } from '@/shared/Buttons';
import priceWithComma from '@/utils/priceWithComma';
import Link from 'next/link';
import { ICarsPartner } from '@/types/partner';
import InactiveBadge from './InactiveBadge';
import {
  deletePartnerCar,
  reactivatePartnerCar,
  updatePartnerCarPrice,
} from '@/api/cars';
import DeletedBadge from './deletedBadge';
import Modal from '@/shared/Modal';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Route } from 'next';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import defaultWatermark from '@/images/defaultWatermark.svg';
import { Menu } from '@headlessui/react';
import {
  ArrowPathIcon,
  BanknotesIcon,
  ChevronDoubleRightIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Form, Formik } from 'formik';
import { FormikInputPrice } from '@/shared/FormInputs';
import * as Yup from 'yup';

const CarPriceSchema = Yup.object().shape({
  price: Yup.number().required('partnerCarsSchema.price.required'),
});

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
  const [isModalReactivateOpen, setIsModalReactivateOpen] = useState(false);
  const [isModalPriceOpen, setIsModalPriceOpen] = useState(false);
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
    watermark,
    status,
  } = carData;

  const isInactive = status === 'inactive';
  const hotFixHide = false; // temporary hot fix, business logic is not ready yet

  const handleModalDeleteOpen = () => {
    setIsModalDeleteOpen(true);
  };

  const handleDeleteCarCard = () => {
    deletePartnerCar(id, locale);
    let delateMessage = translate('yourCars.toast.success.delete');
    toast.success(delateMessage);
    setIsModalDeleteOpen(false);
  };

  const handleModalReactivateOpen = () => {
    setIsModalReactivateOpen(true);
  };

  const handleReactivateCar = async () => {
    const response = await reactivatePartnerCar(id, locale);
    if (response) {
      toast.success(translate('yourCars.toast.success.reactivated'));
      setIsModalReactivateOpen(false);
      if (typeof window !== 'undefined') {
        window.location.reload(); // TODO: Override fetch/refetch with tanstack
      }
    }
  };

  const handleKeyPressNumber = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleUpdateCarPrice = async (price: number) => {
    const response = await updatePartnerCarPrice({ price }, id, locale);
    if (response) {
      toast.success(translate('yourCars.toast.success.priceUpdated'));
      setIsModalPriceOpen(false);
      if (typeof window !== 'undefined') {
        window.location.reload(); // TODO: Override fetch/refetch with tanstack
      }
    }
    return response;
  };

  const renderBadge = () => {
    if (!is_verified && is_deleted) {
      return <DeletedBadge />;
    }
    if (!is_verified) {
      return <InactiveBadge />;
    } else {
      return null;
    }
  };

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
    );
  };

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
            {vin && (
              <div className='flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2'>
                <span className=''>{vin}</span>
                <span>-</span>
                <span className=''>{'VIN'} </span>
              </div>
            )}
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

          {contractor_comment && (
            <div className='flex-grow py-3 text-sm space-y-2'>
              <h4 className='flex items-center'>{contractor_comment}</h4>
            </div>
          )}

          <div className='pt-4 flex flex-col gap-3 justify-between items-center border-t border-dashed border-neutral-300 dark:border-neutral-700'>
            <span className='2xl:text-2xl xl:text-xl font-semibold text-primary-1000 dark:text-primary-400'>
              {priceWithComma(price)}
            </span>

            <div
              style={{ display: `${is_deleted ? 'none' : 'display'}` }}
              className='flex w-full justify-between items-center'
            >
              <Link href={`/car-details/${id}` as Route} target='_blank'>
                <ButtonPrimary
                  fontSize='lg:text-md text-xs'
                  sizeClass='h-full lg:px-2.5 lg:py-2 px-2 py-1.5'
                >
                  {translate('yourCars.button.seeMore')}
                </ButtonPrimary>
              </Link>

              <Menu as='div' className='relative inline-block text-left'>
                <Menu.Button className='p-2 hover:bg-gray-100 rounded-full'>
                  <EllipsisVerticalIcon className='h-6 w-6 text-gray-600' />
                </Menu.Button>

                <Menu.Items className='absolute right-0 mb-2 bottom-full rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-10 whitespace-nowrap'>
                  <div className='px-1 py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setIsModalPriceOpen(true)}
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                        >
                          <BanknotesIcon className='h-4 w-4 text-gray-500 shrink-0' />
                          {translate('yourCars.button.priceUpdate')}
                        </button>
                      )}
                    </Menu.Item>

                    {isInactive && (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href={`/partner-cars?id=${id}` as Route}
                            target='_blank'
                          >
                            <button
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                            >
                              <PencilIcon className='h-4 w-4 text-gray-500 shrink-0' />
                              {translate('yourCars.button.edit')}
                            </button>
                          </Link>
                        )}
                      </Menu.Item>
                    )}

                    {hotFixHide && (
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleModalReactivateOpen}
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                          >
                            <ArrowPathIcon className='h-4 w-4 shrink-0' />
                            {translate('yourCars.button.reactivate')}
                          </button>
                        )}
                      </Menu.Item>
                    )}

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleModalDeleteOpen}
                          className={`${
                            active ? 'bg-red-50 text-red-700' : 'text-red-600'
                          } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                        >
                          <TrashIcon className='h-4 w-4 shrink-0' />
                          {translate('yourCars.button.delete')}
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
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
      <Modal
        title='yourCars.modal.reactivate.title'
        isModalOpen={isModalReactivateOpen}
        setIsModalOpen={setIsModalReactivateOpen}
      >
        <div className='flex flex-col'>
          <div className='text-center space-y-5'>
            <ArrowPathIcon className='block mx-auto w-24 h-24 text-yellow-500' />
            <p className='px-3 text-md font-semibold'>
              {translate('yourCars.modal.reactivate.label')}
            </p>
          </div>
          <div className='flex gap-3 pt-5 m-auto'>
            <ButtonThird
              onClick={() => setIsModalReactivateOpen(false)}
              fontSize='text-sm'
              sizeClass='px-3 py-2 md:px-4 md:py-2'
            >
              {translate('yourCars.modal.reactivate.button.cancel')}
            </ButtonThird>
            <ButtonPrimary
              onClick={handleReactivateCar}
              fontSize='text-sm'
              sizeClass='px-3 py-2 md:px-4 md:py-2'
            >
              {translate('yourCars.modal.reactivate.button.accept')}
            </ButtonPrimary>
          </div>
        </div>
      </Modal>
      <Modal
        title='yourCars.modal.priceUpdate.title'
        isModalOpen={isModalPriceOpen}
        setIsModalOpen={setIsModalPriceOpen}
        maxWidth='max-w-max'
      >
        <div className='flex flex-col'>
          <div className='space-y-5'>
            <div>
              <Formik
                initialValues={{
                  price: undefined,
                }}
                validationSchema={CarPriceSchema}
                onSubmit={(values, { setSubmitting }) => {
                  const castValues = CarPriceSchema.cast(values);
                  handleUpdateCarPrice(castValues.price).finally(() =>
                    setSubmitting(false)
                  );
                }}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form className='flex flex-col gap-4 justify-start'>
                    <div className='flex gap-8 items-center'>
                      <div className='flex flex-col h-full justify-between'>
                        <span className='text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-3 whitespace-nowrap'>
                          {translate('yourCars.modal.form.priceCurrent.label')}
                        </span>
                        <div className='flex items-center justify-center text-lg font-normal h-14'>
                          {priceWithComma(price)}
                        </div>
                      </div>

                      <ChevronDoubleRightIcon className='h-6 w-6 text-gray-500 shrink-0' />

                      <FormikInputPrice
                        onKeyPress={handleKeyPressNumber}
                        name='price'
                        placeholder='yourCars.modal.form.price.placeholder'
                        title='yourCars.modal.form.price.label'
                        rounded='rounded-full'
                        sizeClass='h-14'
                        error={errors.price}
                        touched={touched.price}
                      />
                    </div>

                    <div className='flex gap-3 pt-5 m-auto'>
                      <ButtonThird
                        type='button'
                        onClick={() => setIsModalPriceOpen(false)}
                        fontSize='text-sm'
                        sizeClass='px-3 py-2 md:px-4 md:py-2'
                      >
                        {translate('yourCars.modal.priceUpdate.button.cancel')}
                      </ButtonThird>
                      <ButtonPrimary
                        type='submit'
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        fontSize='text-sm'
                        sizeClass='px-3 py-2 md:px-4 md:py-2'
                      >
                        {translate('yourCars.modal.priceUpdate.button.accept')}
                      </ButtonPrimary>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CarPartnerCard;
