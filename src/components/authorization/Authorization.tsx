'use client';

import { use, useState } from 'react';
import SocialAuth from './components/SocialAuth';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { AuthorizationPages } from '@/types/authorization';

export default function Authorization({
  setIsModalOpen,
}: {
  setIsModalOpen: (isModalOpen: boolean) => void;
}) {
  const [isDispatched, setIsDispatched] = useState(false);
  const [page, setPage] = useState(<SignIn setIsModalOpen={setIsModalOpen} />);
  const [currentPage, setCurrentPage] = useState<AuthorizationPages>(AuthorizationPages.login);

  return (
    <div className='w-full max-w-md mx-auto space-y-6'>
      <div style={{ display: `${isDispatched ? 'none' : 'display'}`}} className='w-full flex justify-between'>
        <button
          id='login'
          className={`w-1/2 text-xl pb-4 border-b-4 ${
            currentPage === AuthorizationPages.login ? 'border-primary-500 font-semibold' : 'border-transparent'
          }`}
          onClick={() => {
            setCurrentPage(AuthorizationPages.login);
            setPage(<SignIn setIsModalOpen={setIsModalOpen} />);
          }}
        >
          SIGN IN
        </button>
        <button
          id='signup'
          className={`w-1/2 text-xl pb-4 border-b-4 ${
            currentPage === AuthorizationPages.signup ? 'border-primary-500 font-semibold' : 'border-transparent'
          }`}
          onClick={() => {
            setCurrentPage(AuthorizationPages.signup);
            setPage(<SignUp setIsDispatched={setIsDispatched} isDispatched={isDispatched} setIsModalOpen={setIsModalOpen} />);
          }}
        >
          SIGN UP
        </button>
      </div>
      {/* <SocialAuth /> */}
      {page}
    </div>
  );
}
