'use client';

import { useEffect, useState } from 'react';
import OrderAccordion from './(components)/OrderAccordion';
import OrderDetails from './(components)/OrderDetails';
import { getUserOrders } from '@/api/user';
import { IUserOrdersData } from '@/types/user';
import LoadingSpinner from '@/shared/LoadingSpinner';
import { ButtonPrimary } from '@/shared/Buttons';
import ErrorComponent from '@/components/ErrorComponent';
import { useLocale, useTranslations } from 'next-intl';
import { NextRoute } from '@/types/routers';

const OrdersPage = () => {
  const translate = useTranslations();
  const locale = useLocale();
  const [state, setState] = useState<IUserOrdersData | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getUserOrders(locale)
      .then((res) => {
        if (res) {
          setState(res as IUserOrdersData);
        } else {
          setIsError(true);
        }
      })
      .finally(() => setIsLoading(false));
  }, [locale]);

  return (
    <div className='relative min-h-[540px] space-y-10 md:space-y-14 lg:min-h-[650px] xl:min-h-[600px]'>
      {/* HEADING */}
      <h2 className='text-2xl lg:text-4xl font-bold'>{translate('yourOrders.title')}</h2>

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
            (state.data.length < 0 ? (
              <>
                <div className='text-xl text-center font-semibold mb-6 pr-16 hidden md:grid grid-cols-4 gap-4'>
                  <h3>{translate('yourOrders.car.title')}</h3>
                  <h3>{translate('yourOrders.date.title')}</h3>
                  <h3>{translate('yourOrders.status.title')}</h3>
                  <h3>{translate('yourOrders.price.title')}</h3>
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
              <div className='mb-28 rounded-3xl h-[360px] md:h-[380px] lg:h-[420px] flex justify-center items-center flex-col bg-white dark:bg-neutral-950'>
                <h3 className='text-lg lg:text-2xl font-bold'>{translate('yourOrders.noOrdersMessage')}</h3>
                <ButtonPrimary className='text-base lg:text-lg mt-6' href={`/${locale}/catalog` as NextRoute}>
                  {translate('yourOrders.button.chooseCar')}
                </ButtonPrimary>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
