'use client';

import AccountForm from './(components)/AccountForm';
import { ProtectedRoute, UserRole } from '@/utils/protectedRoute';

const AccountPage = () => {
  return (
    <ProtectedRoute role={UserRole.user}>
      <div className='relative min-h-[1100px] lg:min-h-[650px]'>
        {/* HEADING */}
        <h2 className='text-2xl lg:text-4xl font-bold'>Account information</h2>
        <div className='flex flex-col md:flex-row'>
          <AccountForm />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AccountPage;
