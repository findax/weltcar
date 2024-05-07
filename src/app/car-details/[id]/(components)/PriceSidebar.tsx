import ButtonPrimary from '@/shared/ButtonPrimary';
import numberWithComma from '@/utils/numberWithComma';

export default function PriceSidebar({ onClick }: { onClick: () => void }) {
  return (
    <div className='block flex-grow mt-14 lg:mt-0'>
      <div className='detailsSectionSidebar__wrap sticky top-28 bg-white dark:bg-neutral-900 !hidden lg:!flex'>
        <div className='flex justify-between items-end gap-1'>
          <span className='text-2xl font-semibold'>Sum</span>
          <span className='flex-grow mb-1 border-b border-dashed border-neutral-300 dark:border-neutral-700'></span>
          <span className='text-3xl font-semibold'>
            {numberWithComma('120000')}€
          </span>
        </div>

        <ButtonPrimary onClick={onClick}>Reserve</ButtonPrimary>
      </div>
    </div>
  );
}
