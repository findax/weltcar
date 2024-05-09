import { ButtonPrimary } from '@/shared/Buttons';
import numberWithComma from '@/utils/numberWithComma';

export default function PriceSidebar({
  onClick,
  data,
}: {
  onClick: (modalId: string) => void;
  data: string;
}) {
  return (
    <div className='block flex-grow mt-14 lg:mt-0'>
      <div className='detailsSectionSidebar__wrap sticky top-28 bg-white dark:bg-neutral-900 !hidden lg:!flex'>
        <div className='flex justify-between items-end gap-1'>
          <span className='text-2xl font-semibold'>Sum</span>
          <span className='flex-grow mb-1 border-b border-dashed border-neutral-300 dark:border-neutral-700'></span>
          <span className='text-3xl font-semibold'>
            {numberWithComma(data)}€
          </span>
        </div>

        <ButtonPrimary onClick={() => onClick('confirm')}>
          Reserve
        </ButtonPrimary>
      </div>
    </div>
  );
}
