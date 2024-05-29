'use client';

import { useEffect, useState } from 'react';
import OrderAccordion from '../(components)/OrderAccordion';
import Image from 'next/image';
import bgImg from '@/images/bg-cars/porsche911-turbo.png';
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
    <div className='relative space-y-6 md:space-y-8 lg:min-h-[500px]'>
      {/* HEADING */}
      <h2 className='text-3xl font-semibold'>Your orders</h2>
      <div className='w-14 border-b border-neutral-300 dark:border-neutral-700'></div>

      {isLoading ? (
        <div className='w-full h-96 flex justify-center items-center'>
          <LoadingSpinner className='w-12' />
        </div>
      ) : isError ? (
        <ErrorComponent />
      ) : (
        <div className='w-full'>
          {state &&
            (state.data.length > 0 ? (
              <>
                <div className='text-xl text-center font-semibold mb-6 pr-16 hidden md:grid grid-cols-4 gap-4'>
                  <span>Name</span>
                  <span>Date</span>
                  <span>Status</span>
                  <span>Sum</span>
                </div>
                <div className='hidden md:block border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>
                {state.data.map((order) => (
                  <>
                    <OrderAccordion
                      title={`${order.car.brand} ${order.car.model}`}
                      date={order.created_at}
                      status={order.order_status_name}
                      price={order.price}
                    >
                      <div className='py-6 px-6 lg:px-40 text-center bg-white/60 dark:bg-neutral-800/80'>
                        order details
                      </div>
                    </OrderAccordion>
                    <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>
                  </>
                ))}
              </>
            ) : (
              <div className='h-[40vh] flex justify-center items-center flex-col bg-white/50 dark:bg-neutral-800/60'>
                <h3 className=''>You have no orders</h3>
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
        alt='premium logo'
        priority
      />
    </div>
  );
};

export default OrdersPage;
