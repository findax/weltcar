'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { ButtonPrimary } from '@/shared/Buttons';
import { useLocale, useTranslations } from 'next-intl';

export default function CookieAlert() {
  const translate = useTranslations();
  const locale = useLocale();
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
        className='fixed bottom-0 inset-x-0 z-50 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-6 lg:px-8 bg-primary-100 dark:bg-neutral-800 shadow-xl border-t border-neutral-100 dark:border-neutral-700'
      >
        <div className='container relative flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0'>
          <p className='cookie-popup__text'>
            {translate('cookieAlert.text.description')}
            <Link
              className='underline hover:no-underline'
              href={`/${locale}/cookie-policy`}
            >
              {translate('cookieAlert.link.policy')}
            </Link>
            .
          </p>
          <ButtonPrimary
            className='w-full sm:w-auto sm:ml-5'
            onClick={handleAcceptCookie}
          >
            {translate('cookieAlert.button.accept')}
          </ButtonPrimary>
        </div>
      </motion.div>
    )
  );
}
