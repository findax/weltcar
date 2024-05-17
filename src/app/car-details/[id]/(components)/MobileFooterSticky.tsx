import { ButtonPrimary } from '@/shared/Buttons';
import numberWithComma from '@/utils/numberWithComma';

const MobileFooterSticky = ({
  onClick,
  price,
}: {
  onClick: () => void;
  price: string | number;
}) => {
  return (
    <div className='block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-600 z-40'>
      <div className='container flex items-center justify-between'>
        <div className=''>
          <span className='block text-xl font-semibold'>
            {numberWithComma(price)} €
          </span>
        </div>
        <ButtonPrimary
          sizeClass='px-5 sm:px-7 py-3 !rounded-2xl'
          onClick={onClick}
        >
          Reserve
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default MobileFooterSticky;
