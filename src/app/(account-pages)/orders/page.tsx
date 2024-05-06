'use client';

import OrderAccordion from '../(components)/OrderAccordion';
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

const OrdersPage = () => {
  return (
    <div className='space-y-6 md:space-y-8'>
      {/* HEADING */}
      <h2 className='text-3xl font-semibold'>Your orders</h2>
      <div className='w-14 border-b border-neutral-300 dark:border-neutral-700'></div>

      <div className='w-full'>
        <div className='text-xl text-center font-semibold mb-6 pr-16 hidden md:grid grid-cols-4'>
          <span>Name</span>
          <span>Date</span>
          <span>Status</span>
          <span>Sum</span>
        </div>
        <div className='hidden md:block border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>

        <OrderAccordion title='BMW X5'>
          <div className='py-6 px-6 lg:px-40 text-center bg-white dark:bg-neutral-800'>
            order details
          </div>
        </OrderAccordion>
        <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>

        <OrderAccordion title='Departure Time'>
          <div className='py-6 px-6 lg:px-40 text-center bg-white dark:bg-neutral-800'>
            order details
          </div>
        </OrderAccordion>
        <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>

        <OrderAccordion title='Bags'>
          <div className='py-6 px-6 lg:px-40 text-center bg-white dark:bg-neutral-800'>
            order details
          </div>
        </OrderAccordion>
        <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>

        <OrderAccordion title='Payment type'>
          <div className='py-6 px-6 lg:px-40 text-center bg-white dark:bg-neutral-800'>
            order details
          </div>
        </OrderAccordion>
        <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>
      </div>
    </div>
  );
};

export default OrdersPage;
