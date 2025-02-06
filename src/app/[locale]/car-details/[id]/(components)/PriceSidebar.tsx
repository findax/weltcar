import PartnerLogoSidebar from '@/components/PartnerLogoSidebar';
import { ButtonPrimary, ButtonSecondary } from '@/shared/Buttons';
import priceWithComma from '@/utils/priceWithComma';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { IUser } from '@/types/user';
import { addToFavoritesCars, deleteFavoriteCar } from '@/api/favorites';
import { toast } from 'react-toastify';

export default function PriceSidebar({
  onClick,
  price,
  isSold,
  isShowPartnerLogo,
  partnerPhone,
  partnerName,
  status_extra,
  isFavorite,
  user,
  idCar,
  onChangeModalAuthorizationOpen,
  onChangeFavorite
}: {
  onClick: () => void;
  price: string | number;
  isSold: boolean;
  isShowPartnerLogo?: boolean;
  partnerPhone: string | null;
  partnerName: string | null;
  status_extra: string | null;
  isFavorite: boolean;
  user: IUser | null;
  idCar: string;
  onChangeModalAuthorizationOpen: (isAuthorizationModalOpen: boolean) => void;
  onChangeFavorite: (isFavorite: boolean) => void;
}) {
  const translate = useTranslations();
  const locale = useLocale();
  const [isPriceVisible, setIsPriceVisible] = useState<boolean>(true);

  const isDisabled = isSold || isNaN(Number(price));
  const buttonClass = isDisabled ? '!bg-gray-600 hover:bg-gray-600 text-white' : '';

  useEffect(() => {
    setIsPriceVisible(!isNaN(Number(price)));
  }, [price]);

  const handleChangeFavoriteCar = (idCar: string) => {
    if(!user){
      onChangeModalAuthorizationOpen(true)
    } else {
      if(isFavorite){
        deleteFavoriteCar(idCar, locale);
        onChangeFavorite(!isFavorite);
        toast.success(translate('favorites.message.toast.delete'));
      } else {
        addToFavoritesCars(idCar, locale);
        onChangeFavorite(!isFavorite);
        toast.success(translate('favorites.message.toast.add'));
      }
    }
  }

  return (
    <div className='block flex-grow mt-14 lg:mt-0'>
      <div className='detailsSectionSidebar__wrap sticky top-28 bg-white dark:bg-neutral-900 !hidden lg:!flex'>
        {status_extra && (
          <PartnerLogoSidebar 
            partnerPhone={partnerPhone} 
            partnerName={partnerName} 
            translate={translate}
            status_extra={status_extra || null}
          />
        )}

        <div className={`${isPriceVisible ? 'flex justify-between items-end gap-1 ' : 'flex justify-center items-end gap-1 '}`}>
          {isPriceVisible
            && <span className='text-xl xl:text-2xl font-semibold'>{translate('carDetails.price.title')}</span>
          }
          <span className='text-3xl xl:text-4xl leading-10 font-semibold'>
            {priceWithComma(price)}
          </span>
        </div>

        {!isShowPartnerLogo && status_extra && 
          <div className='flex gap-1'>
            <span className='font-medium md:text-lg dark:text-neutral-400 text-neutral-1100'>Available {status_extra}</span>
          </div>
        }

        <ButtonPrimary
          onClick={onClick}
          disabled={isDisabled}
          className={buttonClass}
        >
          { isDisabled ? translate('carDetails.button.outOfStock') : translate('carDetails.button.reserve')}
        </ButtonPrimary>

        <ButtonSecondary onClick={() => handleChangeFavoriteCar(idCar)}>
          <HeartIcon className={`h-8 w-8 mr-3`} color={` ${isFavorite ? '#FF6464' : ''}`} />
          {isFavorite 
            ? translate('carDetails.button.favorite.already')
            : translate('carDetails.button.favorite.addTo')
          }
        </ButtonSecondary>
      </div>
    </div>
  );
}
