'use client';

import SignInFavorite from './components/SignInFavorite';
import { ReactElement, useState } from 'react';

export default function AuthorizationFavotrite({
  setIsModalOpen,
}: {
  setIsModalOpen: (isModalOpen: boolean) => void;
}) {
  const handleChangeAuthorizationPage = (page: ReactElement) => {
    setPage(page);
  }

  const [page, setPage] = useState(
    <SignInFavorite 
      changeCurrentPage={handleChangeAuthorizationPage} 
      setIsModalOpen={setIsModalOpen} 
    />
  );

  return (
    <div className='w-full'>
      {page}
    </div>
  );
}
