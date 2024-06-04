'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { ButtonPrimary } from '@/shared/Buttons';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function CookieAlert() {
  const [cookieAlertOpen, setCookieAlertOpen] = useState(false);

  useEffect(() => {
    const checkCookie = document.cookie.indexOf('CookieBy=WeltCar');
    checkCookie != -1
      ? setCookieAlertOpen(false)
      : setTimeout(() => setCookieAlertOpen(true), 3000);
  }, []);

  const handleAcceptCookie = () => {
    document.cookie = 'CookieBy=WeltCar; max-age=' + 60 * 60 * 24 * 30;

    if (document.cookie) {
      setCookieAlertOpen(false);
    } else {
      toast.error(
        'Filed to accept cookies. Please check your browser settings and try again.'
      );
    }
  };

  return (
    cookieAlertOpen && (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className='fixed bottom-0 inset-x-0 z-50 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-6 lg:px-8 bg-white dark:bg-neutral-800 shadow-lg border-t border-neutral-100 dark:border-neutral-700'
      >
        <div className='container relative flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0'>
          <p
            className='cookie-popup__text'
            dangerouslySetInnerHTML={{
              __html:
                'We use cookies to improve your experience and for ads personalisation, by continuing to use this website, you are agreeing to our <a class="underline hover:no-underline" href="/cookie-policy">cookie policy</a>.',
            }}
          />
          <ButtonPrimary
            className='w-full sm:w-auto mx-5'
            onClick={handleAcceptCookie}
          >
            Accept
          </ButtonPrimary>
          <button
            onClick={() => setCookieAlertOpen(false)}
            className='p-3 absolute -top-12 sm:-top-6 -right-4 sm:-right-6 2xl:right-12 rounded-full'
          >
            <XMarkIcon className='w-6 h-6' />
          </button>
        </div>
      </motion.div>
    )
  );
}
