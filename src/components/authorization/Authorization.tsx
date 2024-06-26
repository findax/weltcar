'use client';

import { useState } from 'react';
import SocialAuth from './components/SocialAuth';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

export default function Authorization({
  setIsModalOpen,
}: {
  setIsModalOpen: (isModalOpen: boolean) => void;
}) {
  const [page, setPage] = useState(<SignIn setIsModalOpen={setIsModalOpen} />);
  const [isActive, setActive] = useState(true);

  return (
    <div className='w-full max-w-md mx-auto space-y-6'>
      <div className='w-full flex justify-between'>
        <button
          id='login'
          className={`w-1/2 text-xl pb-4 border-b-4 ${
            isActive ? 'border-primary-500 font-semibold' : 'border-transparent'
          }`}
          onClick={() => {
            setActive(true);
            setPage(<SignIn setIsModalOpen={setIsModalOpen} />);
          }}
        >
          SIGN IN
        </button>
        <button
          id='signup'
          className={`w-1/2 text-xl pb-4 border-b-4 ${
            isActive ? 'border-transparent' : 'border-primary-500 font-semibold'
          }`}
          onClick={() => {
            setActive(false);
            setPage(<SignUp setIsModalOpen={setIsModalOpen} />);
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
