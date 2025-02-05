'use client';

import { use, useState } from 'react';
import SocialAuth from './components/SocialAuth';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { AuthorizationPages } from '@/types/authorization';
import { useTranslations } from 'next-intl';

export default function Authorization({
  setIsModalOpen,
}: {
  setIsModalOpen: (isModalOpen: boolean) => void;
}) {
  const translate = useTranslations();
  const [isDispatched, setIsDispatched] = useState(false);
  const [page, setPage] = useState(<SignIn setIsModalOpen={setIsModalOpen} />);
  const [currentPage, setCurrentPage] = useState<AuthorizationPages>(AuthorizationPages.login);

  return (
    <div className='w-full max-w-md mx-auto space-y-6'>
      <div style={{ display: `${isDispatched ? 'none' : 'display'}`}} className='w-full flex justify-between'>
        <button
          id='login'
          className={`w-1/2 text-sm md:text-lg pb-4 border-b-4 ${
            currentPage === AuthorizationPages.login ? 'border-primary-950 font-semibold' : 'border-transparent'
          }`}
          onClick={() => {
            setCurrentPage(AuthorizationPages.login);
            setPage(<SignIn setIsModalOpen={setIsModalOpen} />);
          }}
        >
          {translate('authorization.button.signIn')}
        </button>
        <button
          id='signup'
          className={`w-1/2 text-sm  md:text-lg pb-4 border-b-4 ${
            currentPage === AuthorizationPages.signup ? 'border-primary-950 font-semibold' : 'border-transparent'
          }`}
          onClick={() => {
            setCurrentPage(AuthorizationPages.signup);
            setPage(<SignUp setIsDispatched={setIsDispatched} isDispatched={isDispatched} setIsModalOpen={setIsModalOpen} />);
          }}
        >
          {translate('authorization.button.signUp')}
        </button>
      </div>
      {/* <SocialAuth /> */}
      {page}
    </div>
  );
}
