import { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import numberWithComma from '@/utils/numberWithComma';

export interface AccordionProps {
  className?: string;
  title: string;
  date?: string;
  status?: string;
  price: string | number;
  children?: React.ReactNode;
}

const OrderAccordion = ({
  className = '',
  title,
  date,
  status,
  price,
  children,
}: AccordionProps) => {
  const [opened, setOpened] = useState<boolean>(false);

  function correctDate(date: string) {
    const dateArray = date.split('T')[0].split('-');
    return `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}`;
  }

  return (
    <>
      <button
        onClick={() => setOpened(!opened)}
        className={`relative text-sm md:text-base font-medium py-4 pr-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full hover:bg-white/40 dark:hover:bg-neutral-800/60 ${className}`}
      >
        <span className='text-nowrap text-ellipsis overflow-hidden'>
          {title}
        </span>
        <span className='text-nowrap text-ellipsis overflow-hidden'>
          {date && correctDate(date)}
        </span>
        <span className='text-nowrap text-ellipsis overflow-hidden'>
          {status}
        </span>
        <span className='text-nowrap text-ellipsis overflow-hidden'>
          {numberWithComma(price)} €
        </span>
        <ChevronDownIcon
          className={`absolute top-1/2 -translate-y-1/2 right-0 w-4 duration-300 ${opened ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimateHeight duration={300} height={opened ? 'auto' : 0}>
        {children}
      </AnimateHeight>
    </>
  );
};

export default OrderAccordion;
