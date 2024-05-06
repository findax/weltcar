'use client';

import { CustomLink } from '@/data/types';
import { FC } from 'react';
import twFocusClass from '@/utils/twFocusClass';
import Link from 'next/link';
import { Route } from '@/routers/types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const DEMO_PAGINATION: CustomLink[] = [
  {
    label: '1',
    href: '#',
  },
  {
    label: '2',
    href: '#',
  },
  {
    label: '3',
    href: '#',
  },
  {
    label: '4',
    href: '#',
  },
];

export interface PaginationProps {
  className?: string;
}

const Pagination: FC<PaginationProps> = ({ className = '' }) => {
  const renderItem = (pag: CustomLink, index: number) => {
    if (index === 0) {
      // RETURN ACTIVE PAGINATION
      return (
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-600 text-white ${twFocusClass()}`}
        >
          {pag.label}
        </span>
      );
    }
    // RETURN UNACTIVE PAGINATION
    return (
      <Link
        key={index}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-600 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        href={pag.href as Route}
      >
        {pag.label}
      </Link>
    );
  };

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      <button
        className={`w-11 rounded-full flex items-center justify-center bg-primary-600 focus:outline-none ${true ? '!bg-primary-400 dark:!bg-primary-900' : 'cursor-pointer hover:bg-primary-700'}`}
        style={{ transform: 'translate3d(0, 0, 0)' }}
        onClick={() => console.log('prev')}
        disabled={false}
      >
        <ChevronLeftIcon className='w-6 mr-0.5' color='white' />
      </button>

      {DEMO_PAGINATION.map(renderItem)}

      <button
        className={`w-11 rounded-full flex items-center justify-center bg-primary-600 focus:outline-none ${false ? '!bg-primary-400 dark:!bg-primary-900' : 'cursor-pointer hover:bg-primary-700'}`}
        style={{ transform: 'translate3d(0, 0, 0)' }}
        onClick={() => console.log('next')}
        disabled={true}
      >
        <ChevronRightIcon className='w-6 ml-0.5' color='white' />
      </button>
    </nav>
  );
};

export default Pagination;
