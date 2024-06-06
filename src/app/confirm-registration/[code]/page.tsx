'use client';

import { useEffect, useState } from 'react';
import { ButtonPrimary } from '@/shared/Buttons';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { activateAccount } from '@/api/auth';
import LoadingSpinner from '@/shared/LoadingSpinner';
import ErrorComponent from '@/components/ErrorComponent';

export default function ConfirmRegistrationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const code = window.location.href.split('/').pop();

    if (code) {
      activateAccount({ code })
        .then((res) => {
          console.log(res);
          !res && setIsError(true);
        })
        .finally(() => setIsLoading(false));
    }
  });

  return isLoading ? (
    <div className='w-full h-[calc(100vh-76px)] flex justify-center items-center'>
      <LoadingSpinner className='w-12' />
    </div>
  ) : isError ? (
    <div className='w-full h-[calc(100vh-76px)] flex justify-center items-center'>
      <ErrorComponent />
    </div>
  ) : (
    <div className='w-full h-[calc(100vh-76px)] flex justify-center items-center'>
      <div className='text-center space-y-10'>
        <CheckCircleIcon className='block mx-auto w-24 h-24 text-green-500' />
        <p className='px-6 text-2xl font-semibold'>
          Your account has been successfully created!
        </p>
        <ButtonPrimary href='/catalog'>Choose your car</ButtonPrimary>
      </div>
    </div>
  );
}
