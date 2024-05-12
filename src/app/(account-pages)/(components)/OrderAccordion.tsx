import React, { FC, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import numberWithComma from '@/utils/numberWithComma';

export interface AccordionProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
}

const OrderAccordion: FC<AccordionProps> = ({
  className = '',
  title,
  children,
}) => {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setOpened(!opened)}
        className={`relative text-sm md:text-base font-medium py-4 pr-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full ${className}`}
      >
        <span className='text-nowrap text-ellipsis overflow-hidden'>
          BMW X5
        </span>
        <span className='text-nowrap text-ellipsis overflow-hidden'>
          20.05.2025
        </span>
        <span className='text-nowrap text-ellipsis overflow-hidden'>
          processing
        </span>
        <span className='text-nowrap text-ellipsis overflow-hidden'>
          {numberWithComma(75000)} €
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
