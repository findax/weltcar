'use client';

import AccountPartnerForm from './(components)/AccountPartnerForm';
import { ProtectedRoute, UserRole } from '@/utils/protectedRoute';
import { useEffect, useState } from 'react';
import { getPartner } from '@/api/partner';
import LoadingSpinner from '@/shared/LoadingSpinner';
import ErrorComponent from '@/components/ErrorComponent';
import { IPartnerResponse } from '@/types/partner';
import { useTranslations } from 'next-intl';

const AccountPartnerPage = () => {
  const [isFirstLoading, setFirstLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [partner, setPartner] = useState<IPartnerResponse>();
  const translate = useTranslations();

  useEffect(() => {
    if(isFirstLoading){
      getPartner()
        .then((data) => {
          if(data){
            setPartner(data);
          }
        })
        .finally(() => {
          isFirstLoading && setFirstLoading(false);
        }); 
    }
  },[isFirstLoading]);

  return isFirstLoading ? (
    <div className='h-[calc(100vh-76px)] flex justify-center items-center'>
      <div className='-mt-[76px]'>
        <LoadingSpinner className='w-12' />
      </div>
    </div>
  ) : isError ? (
    <div className='h-[calc(100vh-76px)] flex justify-center items-center'>
      <ErrorComponent />
    </div>
  ) : (
    <ProtectedRoute role={UserRole.partner}>
      <div className='relative min-h-[1200px] lg:min-h-[650px]'>
        {/* HEADING */}
        <h2 className='text-2xl lg:text-4xl font-bold'>{translate('accountPartner.title')}</h2>
        <div className='flex flex-col md:flex-row'>
          {partner && (
            <AccountPartnerForm partner={partner}/>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AccountPartnerPage;
