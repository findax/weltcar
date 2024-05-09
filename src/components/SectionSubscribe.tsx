import React, { FC } from 'react';
import { ButtonCircle } from '@/shared/Buttons';
import rightImg from '@/images/Subcribe.webp';
import Badge from '@/shared/Badge';
import { Input } from '@/shared/FormInputs';
import Image from 'next/image';

export interface SectionSubscribeProps {
  className?: string;
}

const SectionSubscribe: FC<SectionSubscribeProps> = ({ className = '' }) => {
  return (
    <div
      className={`nc-SectionSubscribe relative flex flex-col lg:flex-row lg:items-center gap-16 ${className}`}
      data-nc-id='SectionSubscribe'
    >
      <div className='flex-shrink-0 lg:w-1/2 lg:pr-16'>
        <h2 className='font-semibold text-4xl'>📨 Join our newsletter</h2>
        <span className='block mt-5 text-neutral-500 dark:text-neutral-400'>
          Read and share new perspectives on just about any topic. Everyone’s
          welcome.
        </span>
        <ul className='space-y-4 mt-10'>
          <li className='flex items-center space-x-4'>
            <Badge name='01' />
            <span className='font-medium text-neutral-700 dark:text-neutral-300'>
              Get more discount
            </span>
          </li>
          <li className='flex items-center space-x-4'>
            <Badge color='red' name='02' />
            <span className='font-medium text-neutral-700 dark:text-neutral-300'>
              Get premium magazines
            </span>
          </li>
        </ul>
        <form className='mt-10 relative max-w-sm'>
          <Input
            required
            aria-required
            placeholder='Enter your email'
            type='email'
            rounded='rounded-full'
            sizeClass='h-12 px-5 py-3'
          />
          <ButtonCircle
            type='submit'
            className='absolute transform top-1/2 -translate-y-1/2 right-1.5'
            size='w-10 h-10'
          >
            <i className='las la-arrow-right text-xl'></i>
          </ButtonCircle>
        </form>
      </div>
      <div className='flex-grow'>
        <Image alt='happy car buyer' src={rightImg} />
      </div>
    </div>
  );
};

export default SectionSubscribe;
