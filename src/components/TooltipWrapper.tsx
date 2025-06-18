'use client';

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import Link from 'next/link';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface TooltipWrapperProps {
  id: string;
  children?: React.ReactNode;
  tooltipContent?: React.ReactNode;
  place?: 'top' | 'bottom' | 'left' | 'right';
}

export const TooltipWrapper = ({
  id,
  children,
  tooltipContent,
  place = 'top',
}: TooltipWrapperProps) => {
  return (
    <>
      <div data-tooltip-id={id} className='inline-block cursor-pointer'>
        {children ?? (
          <InformationCircleIcon className='w-5 h-5 text-gray-500' />
        )}
      </div>

      <ReactTooltip
        id={id}
        place={place}
        className='!max-w-max !text-sm'
        clickable
      >
        {tooltipContent}
      </ReactTooltip>
    </>
  );
};
