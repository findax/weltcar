'use client';

import { useTranslations } from 'next-intl';
import AccountForm from './(components)/AccountForm';
import { ProtectedRoute, UserRole } from '@/utils/protectedRoute';

const AccountPage = () => {
  const translate = useTranslations();
  return (
    <ProtectedRoute role={UserRole.user}>
      <div className='relative min-h-[1100px] lg:min-h-[650px]'>
        {/* HEADING */}
        <h2 className='text-2xl lg:text-4xl font-bold'>{translate('accountInformation.title')}</h2>
        <div className='flex flex-col md:flex-row'>
          <AccountForm />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AccountPage;
