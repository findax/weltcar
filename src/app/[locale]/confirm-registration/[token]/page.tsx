'use client';

import { useEffect, useState } from 'react';
import { ButtonPrimary } from '@/shared/Buttons';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { activateAccount } from '@/api/auth';
import LoadingSpinner from '@/shared/LoadingSpinner';
import ErrorComponent from '@/components/ErrorComponent';
import Image from 'next/image';
import bgImg from '@/images/bg-cars/bg-car-7.webp';
import { useUserStore } from '@/stores/user-store';
import { IUser } from '@/types/user';
import { useLocale, useTranslations } from 'next-intl';
import { NextRoute } from '@/types/routers';

export default function ConfirmRegistrationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const translate = useTranslations();
  const locale = useLocale();

  const updateUserState = useUserStore((state) => state.updateUserState);

  useEffect(() => {
    const code = window.location.href.split('/').pop();

    if (code) {
      activateAccount({ code })
        .then((res) => {
          res ? updateUserState(res as IUser) : setIsError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  return (
    <div className='h-[calc(100vh-76px)] flex justify-center items-center'>
      {isLoading ? (
        <div className='-mt-[76px]'>
          <LoadingSpinner className='w-12' />
        </div>
      ) : isError ? (
        <ErrorComponent />
      ) : (
        <div className='-mt-[76px] text-center space-y-10'>
          <CheckCircleIcon className='block mx-auto w-24 h-24 text-green-500' />
          <p className='px-6 text-2xl font-semibold'>
            {translate('confirmRegister.successfully.title')}
          </p>
          <ButtonPrimary href={`/${locale}/catalog` as NextRoute}>{translate('confirmRegister.button.choose')}</ButtonPrimary>
        </div>
      )}

      <Image
        className='hidden sm:block absolute inset-0 object-contain w-full max-w-7xl m-auto opacity-[0.08] -z-10'
        src={bgImg}
        alt='car background image'
        priority
      />
    </div>
  );
}
