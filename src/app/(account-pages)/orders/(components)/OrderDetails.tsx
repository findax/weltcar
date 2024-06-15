import Link from 'next/link';
import Image from 'next/image';
import numberWithComma from '@/utils/numberWithComma';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { IOrderDetails } from '@/types/user';

export default function OrderDetails({ order }: { order: IOrderDetails }) {
  function correctDate(date: string) {
    const dateArray = date.split('T')[0].split('-');
    return `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}`;
  }

  function correctTime(date: string) {
    const timeArray = date.split('T')[1].split(':');
    return `${timeArray[0]}:${timeArray[1]}`;
  }
  return (
    <ul className='py-6 px-2 sm:px-6 lg:px-10 xl:px-20 bg-white/60 dark:bg-neutral-800/80 space-y-3'>
      <li>
        <Link
          href={`/car-details/${order.car.id}`}
          className='mb-4 group inline-flex flex-wrap'
        >
          <div className='mr-4'>
            <h4 className='text-xl font-semibold underline transition-all duration-[500ms] group-hover:no-underline'>
              {order.car.brand} {order.car.model} ({order.car.year})
            </h4>
            <span className='block mt-1 text-sm font-semibold text-neutral-500 dark:text-neutral-400'>
              {order.car.car_id}
            </span>
            <span className='block mt-1 text-xl font-semibold'>
              {numberWithComma(order.car.price)} €
            </span>
          </div>
          <Image
            src={order.car.photos[0].thumb || ''}
            alt='car image'
            className={`transition-opacity opacity-0 duration-[500ms] group-hover:opacity-80`}
            onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
            height={100}
            width={140}
          />
        </Link>
      </li>
      <li className='flex items-center flex-wrap'>
        <h4 className='text-md font-semibold mr-4'>Order:</h4>
        <span className='text-md'>{order.order_no}</span>
      </li>
      <li className='flex items-center flex-wrap'>
        <h4 className='text-md font-semibold mr-4'>Order status:</h4>
        <span className='text-md'>{order.order_status_name}</span>
      </li>
      <li className='flex items-center flex-wrap'>
        <h4 className='text-md font-semibold mr-4'>Created:</h4>
        <span className='text-md'>
          {correctDate(order.created_at)} at {correctTime(order.created_at)}
        </span>
      </li>
      <li className='flex items-center flex-wrap'>
        <h4 className='text-md font-semibold mr-4'>Payment status:</h4>
        <span className='text-md'>{order.payment_status_name}</span>
      </li>
      <li className='flex flex-col items-start'>
        <h4 className='text-md font-semibold mr-4'>Documents:</h4>
        <ul className='ml-6 space-y-2'>
          {order.files.map((file, index) => (
            <li key={index} className='text-md font-medium'>
              <a
                href={file.url}
                target='_blank'
                rel='noopener noreferrer'
                download
                className='flex items-center space-x-2'
              >
                <DocumentTextIcon className='w-8 flex-shrink-0' />
                <span className='max-w-[350px] underline hover:no-underline break-all'>
                  {file.type}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </li>

      <li className='pt-4 flex items-center flex-wrap'>
        <h4 className='text-md font-semibold mr-4'>Last update:</h4>
        <span className='text-md'>
          {correctDate(order.updated_at)} at {correctTime(order.updated_at)}
        </span>
      </li>
    </ul>
  );
}
