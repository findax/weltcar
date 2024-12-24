"use client"
import I404Png from '@/images/404.png';
import Image from 'next/image';
import { ButtonPrimary } from '@/shared/Buttons';
import { NextRoute } from '@/types/routers';
import { useLocale, useTranslations } from 'next-intl';

const NotFound = () => {
  const translate = useTranslations();
  const locale = useLocale();
  return (
    <div className='nc-Page404'>
      <div className='container relative pt-5 pb-16 lg:pb-20 lg:pt-5'>
        {/* HEADER */}
        <header className='text-center max-w-2xl mx-auto space-y-2'>
          <Image src={I404Png} alt='not-found' />
          <span className='block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium'>
            {translate('notFound.title')}{' '}
          </span>
          <div className='pt-8'>
            <ButtonPrimary href={`/${locale}` as NextRoute}>
              {translate('notFound.button.return')}
            </ButtonPrimary>
          </div>
        </header>
      </div>
    </div>
  )
};

export default NotFound;
