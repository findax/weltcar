'use client';

import React, { useRef } from 'react';
import PriceRangeSlider from '@/components/PriceRangeSlider';
import AccordionComponent from '@/components/AccordionComponent';
import Input from '@/shared/Input';
import ButtonCircle from '@/shared/ButtonCircle';
import ButtonPrimary from '@/shared/ButtonPrimary';
import Checkbox from '@/shared/Checkbox';
import { ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/outline';

// DEMO DATA
const cabtypes = [
  {
    id: 1,
    title: 'Toyota Corolla',
    number: 352,
  },
  {
    id: 2,
    title: 'Honda Civic',
    number: 125,
  },
  {
    id: 3,
    title: 'Ford Mustang',
    number: 56,
  },
  {
    id: 4,
    title: 'Chevrolet Camaro',
    number: 85,
  },
  {
    id: 5,
    title: 'Volkswagen Golf',
    number: 140,
  },
  {
    id: 6,
    title: 'BMW 3 Series',
    number: 250,
  },
  {
    id: 7,
    title: 'Mercedes Benz',
    number: 40,
  },
  {
    id: 8,
    title: 'Audi A4',
    number: 85,
  },
  {
    id: 9,
    title: 'Tesla Model S',
    number: 20,
  },
];
const cabdeparturetimes = [
  {
    id: 1,
    title: 'Early Morning',
    time: '12am - 8am',
  },
  {
    id: 2,
    title: 'Morning',
    time: '8am - 12pm',
  },
  {
    id: 3,
    title: 'Mid Day',
    time: '12pm - 4pm',
  },
  {
    id: 4,
    title: 'Evening',
    time: '4pm - 8pm',
  },
  {
    id: 5,
    title: 'Night',
    time: '8pm - 12am',
  },
];

const Filter = ({ closeFilter }: { closeFilter: (value: boolean) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // const handleClearData = () => {
  //   if (inputRef.current) {
  //     inputRef.current.value = '';
  //   }
  // };
  return (
    <div className='overflow-y-auto h-screen lg:visible lg:h-auto p-4 pb-24 lg:py-6 lg:px-8 bg-white dark:bg-neutral-900 lg:rounded-2xl border border-neutral-200 dark:border-neutral-700'>
      <div className='flex justify-between items-center'>
        <h4 className='mb-6 text-2xl font-semibold'>Filter</h4>
        <button
          onClick={() => closeFilter(false)}
          className='p-3 -mt-5 -mr-3 rounded-full lg:hidden'
        >
          <XMarkIcon className='w-6 h-6' />
        </button>
      </div>
      <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>
      <form className='py-6 relative w-full'>
        <Input
          type='text'
          placeholder='Search by car name'
          rounded='rounded-full'
          sizeClass='h-12 px-5 py-3'
        />
        <ButtonCircle
          type='button'
          className='absolute transform top-1/2 -translate-y-1/2 right-1.5'
          size='w-10 h-10'
        >
          <i className='las la-search text-xl'></i>
        </ButtonCircle>
      </form>
      <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>

      <AccordionComponent title='Pricing scale' className='py-6'>
        <PriceRangeSlider />
      </AccordionComponent>
      <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>

      <AccordionComponent title='Car Types' className='py-6'>
        <ul className='mb-6 flex flex-col gap-3'>
          {cabtypes.map(({ id, number, title }) => (
            <li key={id} className='flex justify-between items-center'>
              <Checkbox name={title} label={title} />
              <span>{number}</span>
            </li>
          ))}
        </ul>
      </AccordionComponent>
      <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>

      <AccordionComponent title='Departure Time' className='py-6'>
        <ul className='mb-6 flex flex-col gap-3'>
          {cabdeparturetimes.map(({ id, time, title }) => (
            <li key={id} className='flex justify-between items-center'>
              <Checkbox name={title} label={title} />
              <span>{time}</span>
            </li>
          ))}
        </ul>
      </AccordionComponent>
      <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>

      <AccordionComponent title='Bags' className='py-6'>
        <ul className='mb-6 flex flex-col gap-3'>
          <li className='flex justify-between items-center gap-3'>
            <Checkbox name='1 to 2 bags' label='1 to 2 bags' />
            <span>122</span>
          </li>
          <li className='flex justify-between items-center gap-3'>
            <Checkbox name='3 to 4 bags' label='3 to 4 bags' />
            <span>65</span>
          </li>
          <li className='flex justify-between items-center gap-3'>
            <Checkbox name='5 or more' label='5 or more' />
            <span>147</span>
          </li>
        </ul>
      </AccordionComponent>
      <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>

      <AccordionComponent title='Payment type' className='py-6'>
        <div className='mb-6 grid grid-cols-12 gap-4'>
          <div className='col-span-12'>
            <ul className='flex flex-col gap-4'>
              <li className='flex items-center justify-between'>
                <Checkbox name='Pay Now' label='Pay Now' />
              </li>
              <li className='flex items-center justify-between'>
                <Checkbox name='Pay at Counter' label='Pay at Counter' />
              </li>
            </ul>
          </div>
        </div>
      </AccordionComponent>
      <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>

      <ButtonPrimary sizeClass='w-full gap-2 px-4 py-3 sm:px-6 mt-6'>
        <ArrowPathIcon className='w-5 h-5' />
        Reset Filter
      </ButtonPrimary>
    </div>
  );
};

export default Filter;
