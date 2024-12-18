import PartnerLogoSidebar from '@/app/[locale]/partner-car-details/[id]/(components)/PartnerLogoSidebar';
import { ButtonPrimary } from '@/shared/Buttons';
import { IUser } from '@/types/user';
import priceWithComma from '@/utils/priceWithComma';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function PriceSidebar({
  onClick,
  price,
  isSold,
  isShowPartnerLogo,
  partnerPhone,
  partnerName,
}: {
  onClick: () => void;
  price: string | number;
  isSold: boolean;
  isShowPartnerLogo?: boolean;
  partnerPhone: string | null;
  partnerName: string | null;
}) {
  const translate = useTranslations();
  const [isPriceVisible, setIsPriceVisible] = useState<boolean>(true);

  const isDisabled = isSold || isNaN(Number(price));
  const buttonClass = isDisabled ? '!bg-gray-600 hover:bg-gray-600' : '';

  useEffect(() => {
    setIsPriceVisible(!isNaN(Number(price)));
  }, [price]);

  return (
    <div className='block flex-grow mt-14 lg:mt-0'>
      <div className='detailsSectionSidebar__wrap sticky top-28 bg-white dark:bg-neutral-900 !hidden lg:!flex'>
        {isShowPartnerLogo && partnerName && (
          <PartnerLogoSidebar 
            partnerPhone={partnerPhone} 
            partnerName={partnerName} 
            translate={translate}
          />
        )}

        <div className={`${isPriceVisible ? 'flex justify-between items-end gap-1 ' : 'flex justify-center items-end gap-1 '}`}>
          {isPriceVisible
            && <span className='text-2xl font-semibold'>{translate('carDetails.price.title')}</span>
          }
          <span className='text-5xl leading-10 font-semibold'>
            {priceWithComma(price)}
          </span>
        </div>

        <ButtonPrimary
          onClick={onClick}
          disabled={isDisabled}
          className={buttonClass}
        >
          {isSold ? translate('carDetails.button.sold') : translate('carDetails.button.reserve')}
        </ButtonPrimary>
      </div>
    </div>
  );
}
