'use client';

import { useState, useEffect } from 'react';
import Label from '@/components/Label';
import Avatar from '@/shared/Avatar';
import { ButtonPrimary } from '@/shared/Buttons';
import { Input } from '@/shared/FormInputs';
import Image from 'next/image';
import bgImg from '@/images/bg-cars/bg-car-3.webp';
import AccountForm from './(components)/AccountForm';
import { useUserStore } from '@/stores/user-store';

const AccountPage = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className='relative space-y-6 md:space-y-8 lg:min-h-[650px]'>
      {/* HEADING */}
      <h2 className='text-3xl font-semibold'>Account information</h2>
      <div className='w-14 border-b border-neutral-300 dark:border-neutral-700'></div>
      <div className='flex flex-col md:flex-row'>
        <div className='flex-shrink-0 flex items-start'>
          <div className='relative rounded-full overflow-hidden flex'>
            <Avatar
              sizeClass='w-32 h-32'
              userName={user?.name}
              fontSize='text-6xl mt-1'
            />
            {/* <div className='absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer'>
              <svg
                width='30'
                height='30'
                viewBox='0 0 30 30'
                fill='none'
                xmlns='https://www.w3.org/2000/svg'
              >
                <path
                  d='M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125'
                  stroke='currentColor'
                  strokeWidth={1.5}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>

              <span className='mt-1 text-xs'>Change Image</span>
            </div> */}
            <input
              type='file'
              className='absolute inset-0 opacity-0 cursor-pointer'
            />
          </div>
        </div>
        {user && <AccountForm />}
      </div>
      <Image
        className='hidden md:block absolute inset-0 top-1/2 -translate-y-1/2 object-contain w-full opacity-[0.06] -z-10'
        src={bgImg}
        alt='car background image'
        priority
      />
    </div>
  );
};

export default AccountPage;
