import PartnerLogoSidebar from '@/components/PartnerLogoSidebar';
import { ButtonPrimary, ButtonSecondary } from '@/shared/Buttons';
import priceWithComma from '@/utils/priceWithComma';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { IUser } from '@/types/user';
import { addToFavoritesCars, deleteFavoriteCar } from '@/api/favorites';
import { toast } from 'react-toastify';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

export default function PriceSidebar({
  onClick,
  price,
  isSold,
  buttonTitle,
  isShowPartnerLogo,
  partnerPhone,
  partnerName,
  status_extra,
  isFavorite,
  isAuthorized,
  idCar,
  onChangeModalAuthorizationOpen,
  onChangeFavorite,
  onAuthModalOpen,
}: {
  onClick: () => void;
  price: string | number;
  isSold: boolean;
  buttonTitle: string;
  isShowPartnerLogo?: boolean;
  partnerPhone: string | null;
  partnerName: string | null;
  status_extra: string | null;
  isFavorite: boolean;
  isAuthorized: boolean;
  idCar: string;
  onChangeModalAuthorizationOpen: (isAuthorizationModalOpen: boolean) => void;
  onChangeFavorite: (isFavorite: boolean) => void;
  onAuthModalOpen: () => void;
}) {
  const translate = useTranslations();
  const locale = useLocale();
  const [isPriceVisible, setIsPriceVisible] = useState<boolean>(true);

  const isDisabled = isSold || isNaN(Number(price));
  const buttonClass = isDisabled
    ? '!bg-gray-600 hover:bg-gray-600 text-white'
    : '';

  const servicesTranslateLine = translate('carDetails.service.includes');
  const splittedServices = servicesTranslateLine
    .split(';')
    .map((item) => item.trim());

  useEffect(() => {
    setIsPriceVisible(!isNaN(Number(price)));
  }, [price]);

  const handleChangeFavoriteCar = (idCar: string) => {
    if (!isAuthorized) {
      onChangeModalAuthorizationOpen(true);
    } else {
      if (isFavorite) {
        deleteFavoriteCar(idCar, locale);
        onChangeFavorite(!isFavorite);
        toast.success(translate('favorites.message.toast.delete'));
      } else {
        addToFavoritesCars(idCar, locale);
        onChangeFavorite(!isFavorite);
        toast.success(translate('favorites.message.toast.add'));
      }
    }
  };

  return (
    <div className='block flex-grow mt-0'>
      <div className='detailsSectionSidebar__wrap sticky top-28 bg-white dark:bg-neutral-900 lg:!flex'>
        {isShowPartnerLogo && (
          <PartnerLogoSidebar
            partnerPhone={partnerPhone}
            partnerName={partnerName}
            translate={translate}
            onAuthModalOpen={onAuthModalOpen}
            isAuthorized={isAuthorized}
          />
        )}

        <div
          className={`hidden lg:flex ${isPriceVisible ? 'flex justify-between items-end gap-1 ' : 'flex justify-center items-end gap-1 '}`}
        >
          {isPriceVisible && (
            <span className='text-xl xl:text-2xl font-semibold'>
              {translate('carDetails.price.title')}
            </span>
          )}
          <span className='text-3xl xl:text-4xl leading-10 font-semibold'>
            {priceWithComma(price)}
          </span>
        </div>

        <div>
          {splittedServices?.length && (
            <>
              <span>{translate('carDetails.service.title')}</span>
              <ul className='flex flex-col gap-4 mt-4 mb-6'>
                {splittedServices.map((service) => (
                  <li className='flex gap-2 items-start'>
                    <CheckCircleIcon
                      width={24}
                      color='primary'
                      className='text-primary-600 dark:text-primary-950 shrink-0'
                    />{' '}
                    {service}
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className='flex gap-2 items-start'>
            <ExclamationCircleIcon
              width={24}
              color='primary'
              className='text-secondary-950 shrink-0'
            />{' '}
            {translate('carDetails.service.alert')}
          </div>
        </div>

        {status_extra && (
          <div className='hidden lg:flex gap-1'>
            <span className='font-medium md:text-lg dark:text-neutral-400 text-neutral-1100'>
              Available {status_extra}
            </span>
          </div>
        )}

        <div className='hidden lg:flex flex-col gap-y-6'>
          <ButtonPrimary
            onClick={onClick}
            disabled={isDisabled}
            className={buttonClass}
          >
            {translate(buttonTitle)}
          </ButtonPrimary>

          <ButtonSecondary onClick={() => handleChangeFavoriteCar(idCar)}>
            <HeartIcon
              className={`h-6 w-8 mr-3`}
              color={` ${isFavorite ? '#FF6464' : ''}`}
            />
            {isFavorite
              ? translate('carDetails.button.favorite.already')
              : translate('carDetails.button.favorite.addTo')}
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
}
