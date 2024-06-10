import { ButtonPrimary } from '@/shared/Buttons';
import numberWithComma from '@/utils/numberWithComma';

const MobileFooterSticky = ({
  onClick,
  price,
  isSold,
}: {
  onClick: () => void;
  price: string | number;
  isSold: boolean;
}) => {
  return (
    <div className='block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-600 z-40'>
      <div className='container flex items-center justify-between'>
        <div className=''>
          <span className='block text-xl font-semibold'>
            {parseInt(price.toString()) ? numberWithComma(price) + ' €' : price}
          </span>
        </div>
        <ButtonPrimary
          sizeClass='px-5 sm:px-7 py-3 !rounded-2xl'
          onClick={onClick}
          disabled={isSold}
          className={isSold ? '!bg-gray-600 hover:bg-gray-600' : ''}
        >
          {isSold ? 'Sold' : 'Reserve'}
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default MobileFooterSticky;
