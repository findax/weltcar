'use client';

import AccountForm from './(components)/AccountForm';
import { useUserStore } from '@/stores/user-store';
import { ProtectedRoute, UserRole } from '@/utils/protectedRoute';

const AccountPage = () => {
  const user = useUserStore((state) => state.user);

  return (
    <ProtectedRoute role={UserRole.user}>
      <div className='relative space-y-6 md:space-y-8 lg:min-h-[650px]'>
        {/* HEADING */}
        <h2 className='text-4xl font-bold'>Account information</h2>
        <div className='flex flex-col md:flex-row'>
          <AccountForm />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AccountPage;
