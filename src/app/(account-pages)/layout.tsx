'use client';

import { getAuth } from '@/api/apiInstance';
import { Nav } from './(components)/Nav';

const CommonLayout = ({ children }: { children?: React.ReactNode }) => {
  if (!getAuth()) {
    typeof window !== 'undefined' && (window.location.href = '/');
  }

  return (
    <div className='nc-CommonLayoutAccount'>
      <div className='border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800'>
        <Nav />
      </div>
      <div className='container my-12 xl:my-14'>{children}</div>
    </div>
  );
};

export default CommonLayout;
