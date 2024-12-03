import PartnerLogoSidebar from '@/app/partner-car-details/[id]/(components)/PartnerLogoSidebar';
import { ButtonPrimary } from '@/shared/Buttons';
import { IUser } from '@/types/user';
import priceWithComma from '@/utils/priceWithComma';

export default function PriceSidebar({
  onClick,
  price,
  isSold,
  isShowPartnerLogo,
  userData,
}: {
  onClick: () => void;
  price: string | number;
  isSold: boolean;
  isShowPartnerLogo?: boolean;
  userData?: IUser | null;
}) {
  return (
    <div className='block flex-grow mt-14 lg:mt-0'>
      <div className='detailsSectionSidebar__wrap sticky top-28 bg-white dark:bg-neutral-900 !hidden lg:!flex'>
        {isShowPartnerLogo && userData && (
          <PartnerLogoSidebar userData={userData} />
        )}

        <div className='flex justify-between items-end gap-1'>
          <span className='text-2xl font-semibold'>Price</span>
          <span className='text-5xl leading-10 font-semibold'>
            {priceWithComma(price)}
          </span>
        </div>

        <ButtonPrimary
          onClick={onClick}
          disabled={isSold}
          className={isSold ? '!bg-gray-600 hover:bg-gray-600' : ''}
        >
          {isSold ? 'Sold' : 'Reserve'}
        </ButtonPrimary>
      </div>
    </div>
  );
}
