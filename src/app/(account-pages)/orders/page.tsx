'use client';

import OrderAccordion from '../(components)/OrderAccordion';

const OrdersPage = () => {
  return (
    <div className='space-y-6 md:space-y-8'>
      {/* HEADING */}
      <h2 className='text-3xl font-semibold'>Your orders</h2>
      <div className='w-14 border-b border-neutral-300 dark:border-neutral-700'></div>

      <div className='w-full'>
        <div className='text-xl text-center font-semibold mb-6 pr-16 hidden md:grid grid-cols-4 gap-4'>
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
