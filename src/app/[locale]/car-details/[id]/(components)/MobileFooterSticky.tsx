import { ButtonPrimary, ButtonSecondary } from '@/shared/Buttons';
import priceWithComma from '@/utils/priceWithComma';
import { useLocale, useTranslations } from 'next-intl';
import { HeartIcon } from '@heroicons/react/24/outline';
import { IUser } from '@/types/user';
import { addToFavoritesCars, deleteFavoriteCar } from '@/api/favorites';
import { toast } from 'react-toastify';

const MobileFooterSticky = ({
  onClick,
  price,
  isSold,
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
  status_extra: string | null;
  isFavorite: boolean;
  user: IUser | null;
  idCar: string;
  onChangeModalAuthorizationOpen: (isAuthorizationModalOpen: boolean) => void;
  onChangeFavorite: (isFavorite: boolean) => void;
}) => {
  const translate = useTranslations();
  const locale = useLocale();
  const isDisabled = isSold || isNaN(Number(price));
  const buttonClass = isDisabled ? '!bg-gray-600 hover:bg-gray-600' : '';

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
    <div className='block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-600 z-40'>
      <div className='container flex gap-2 flex-col items-center justify-between'>
        <div className='flex justify-start w-full sm:w-4/6 mb-5'>
          <div className='flex'>
            <span className='text-xl mr-7 xl:text-2xl font-semibold'>{translate('carDetails.price.title')}</span>

            <span className='block text-xl font-semibold'>
              {priceWithComma(price)}
            </span>
          </div>

          {status_extra && 
            <div className='flex gap-1'>
              <span className='font-medium md:text-lg dark:text-neutral-400 text-neutral-1100'>Available {status_extra}</span>
            </div>
          }
        </div>

        <div className='w-full items-center flex flex-col gap-5'>
          <ButtonPrimary
            onClick={onClick}
            disabled={isDisabled}
            className={` w-full sm:w-4/6 ${buttonClass}`}
          >
            {isSold 
              ? translate('carDetails.mobile.button.sold') 
              : isDisabled ? translate('carDetails.mobile.button.outOfStock') : translate('carDetails.mobile.button.reserve')
            }
          </ButtonPrimary>

          <ButtonSecondary
            onClick={() => handleChangeFavoriteCar(idCar)}
            className='w-full sm:w-4/6'
          >
            <HeartIcon className={`h-8 w-8 mr-3`} color={` ${isFavorite ? '#FF6464' : ''}`} />
            Add to Favorite
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
};

export default MobileFooterSticky;
