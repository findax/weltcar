import React, { FC, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export interface AccordionProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
}

const AccordionComponent: FC<AccordionProps> = ({
  className = '',
  title,
  children,
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpened(!opened)}
        className={`text-xl font-medium flex justify-between items-center w-full ${className}`}
      >
        {title}
        <ChevronDownIcon
          className={`w-6 h-6 duration-300 ${opened ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimateHeight duration={300} height={opened ? 'auto' : 0}>
        {children}
      </AnimateHeight>
      <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>
    </>
  );
};

export default AccordionComponent;
