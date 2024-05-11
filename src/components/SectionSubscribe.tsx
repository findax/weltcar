import React, { FC } from 'react';
import { ButtonCircle } from '@/shared/Buttons';
import rightImg from '@/images/ferrari-yellow.webp';
import Badge from '@/shared/Badge';
import { Input } from '@/shared/FormInputs';
import Image from 'next/image';
import SBS1img from '@/images/icons/message.webp';
import SBS2img from '@/images/icons/bell.webp';

export interface SectionSubscribeProps {
  className?: string;
}

const SectionSubscribe: FC<SectionSubscribeProps> = ({ className = '' }) => {
  return (
    <div
      className={`nc-SectionSubscribe relative flex flex-col lg:flex-row items-start lg:items-center gap-16 ${className}`}
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
        <div className='grid grid-cols-2'>
          <div className='relative w-8/12 sm:w-7/12 m-auto after:content after:absolute after:inset-0 after:rounded-full after:shadow-2xl after:shadow-[#fed800]'>
            <Image
              alt='shaking hands'
              className='opacity-[0.82] dark:opacity-100'
              src={SBS1img}
            />
          </div>
          <div className='relative w-8/12 sm:w-7/12 m-auto after:content after:absolute after:inset-0 after:rounded-full after:shadow-2xl after:shadow-[#fed800]'>
            <Image
              alt='best prices'
              className='opacity-[0.82] dark:opacity-100'
              src={SBS2img}
            />
          </div>
        </div>
        <Image className='mt-12' alt='car' src={rightImg} />
      </div>
    </div>
  );
};

export default SectionSubscribe;
