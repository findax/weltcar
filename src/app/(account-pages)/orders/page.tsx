'use client';

import { useEffect, useState } from 'react';
import OrderAccordion from './(components)/OrderAccordion';
import OrderDetails from './(components)/OrderDetails';
import Image from 'next/image';
import bgImg from '@/images/bg-cars/bg-car-5.webp';
import { getUserOrders } from '@/api/user';
import { IUserOrdersData } from '@/types/user';
import LoadingSpinner from '@/shared/LoadingSpinner';
import { ButtonPrimary } from '@/shared/Buttons';
import ErrorComponent from '@/components/ErrorComponent';

const OrdersPage = () => {
  const [state, setState] = useState<IUserOrdersData | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getUserOrders()
      .then((res) => {
        if (res) {
          setState(res as IUserOrdersData);
        } else {
          setIsError(true);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className='relative space-y-6 md:space-y-8 lg:min-h-[600px]'>
      {/* HEADING */}
      <h2 className='text-3xl font-semibold'>Your orders</h2>
      <div className='w-14 border-b border-neutral-300 dark:border-neutral-700'></div>

      {isLoading ? (
        <div className='w-full h-96 flex justify-center items-center'>
          <div className='-mt-[76px]'>
            <LoadingSpinner className='w-12' />
          </div>
        </div>
      ) : isError ? (
        <ErrorComponent />
      ) : (
        <div className='w-full'>
          {state &&
            (state.data.length > 0 ? (
              <>
                <div className='text-xl text-center font-semibold mb-6 pr-16 hidden md:grid grid-cols-4 gap-4'>
                  <h3>Car</h3>
                  <h3>Date</h3>
                  <h3>Status</h3>
                  <h3>Price</h3>
                </div>
                <div className='hidden md:block border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>
                <ul>
                  {state.data.map((order) => (
                    <li key={order.id}>
                      <OrderAccordion
                        title={`${order.car.brand} ${order.car.model} ${order.car.specification}`}
                        date={order.created_at}
                        status={order.order_status_name}
                        price={order.price}
                      >
                        <OrderDetails order={order} />
                      </OrderAccordion>
                      <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className='h-[40vh] flex justify-center items-center flex-col bg-white/50 dark:bg-neutral-800/60'>
                <h3 className='text-2xl'>You have no orders</h3>
                <ButtonPrimary className='mt-6' href='/catalog'>
                  Choose your car
                </ButtonPrimary>
              </div>
            ))}
        </div>
      )}
      <Image
        className='hidden md:block absolute inset-0 top-1/2 -translate-y-1/2 object-contain w-full opacity-[0.08] -z-10'
        src={bgImg}
        alt='car background image'
        priority
      />
    </div>
  );
};

export default OrdersPage;
