import React, { FC } from 'react';
import { ButtonPrimary, ButtonSecondary } from '@/shared/Buttons';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useTranslations } from 'next-intl';

export interface PageSubcriptionProps {}

export interface PricingItem {
  isPopular: boolean;
  name: string;
  pricing: string;
  desc: string;
  per: string;
  features: string[];
}

const pricings: PricingItem[] = [
  {
    isPopular: false,
    name: 'subscription.starter.name',
    pricing: '$5',
    per: '/mo',
    features: ['subscription.starter.features.automated', 'subscription.starter.features.faster', 'subscription.starter.features.customizations'],
    desc: ` subscription.starter.desc`,
  },
  {
    isPopular: true,
    name: 'subscription.basic.name',
    pricing: '$15',
    per: '/mo',
    features: [
      'subscription.basic.features.everything',
      'subscription.basic.features.builds',
      'subscription.basic.features.progress',
      'subscription.basic.features.premium',
    ],
    desc: ` subscription.basic.desc`,
  },
  {
    isPopular: false,
    name: 'subscription.plus.name',
    pricing: '$25',
    per: '/mo',
    features: [
      'subscription.plus.features.everything"',
      'subscription.plus.features.builds"',
      'subscription.plus.features.analytics"',
      'subscription.plus.features.evaluations"',
    ],
    desc: ` subscription.plus.desc`,
  },
];

const PageSubcription: FC<PageSubcriptionProps> = () => {
  const translate = useTranslations();
  const renderPricingItem = (pricing: PricingItem, index: number) => {
    return (
      <div
        key={index}
        className={`h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden ${
          pricing.isPopular
            ? 'border-primary-500'
            : 'border-neutral-100 dark:border-neutral-700'
        }`}
      >
        {pricing.isPopular && (
          <span className='bg-primary-500 text-white px-3 py-1 tracking-widest text-xs absolute right-3 top-3 rounded-full z-10'>
            {translate('subscription.badge.popular')}
          </span>
        )}
        <div className='mb-8'>
          <h3 className='block text-sm uppercase tracking-widest text-neutral-600 dark:text-neutral-300 mb-2 font-medium'>
            {translate(pricing.name)}
          </h3>
          <h2 className='text-5xl leading-none flex items-center text-neutral-900 dark:text-neutral-300'>
            <span>{pricing.pricing}</span>
            <span className='text-lg ml-1 font-normal text-neutral-500'>
              {translate(pricing.per)}
            </span>
          </h2>
        </div>
        <nav className='space-y-4 mb-8'>
          {pricing.features.map((item, index) => (
            <li className='flex items-center' key={index}>
              <span className='mr-4 inline-flex flex-shrink-0 text-primary-6000'>
                <CheckIcon className='w-5 h-5' aria-hidden='true' />
              </span>
              <span className='text-neutral-700 dark:text-neutral-300'>
                {translate(item)}
              </span>
            </li>
          ))}
        </nav>
        <div className='flex flex-col mt-auto'>
          {pricing.isPopular ? (
            <ButtonPrimary>{translate('subscription.button.submit')}</ButtonPrimary>
          ) : (
            <ButtonSecondary>
              <span className='font-medium'>{translate('subscription.button.submit')}</span>
            </ButtonSecondary>
          )}
          <p className='text-xs text-neutral-500 dark:text-neutral-400 mt-3'>
            {translate(pricing.desc)}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-PageSubcription container pb-24 lg:pb-32 `}>
      <header className='text-center max-w-2xl mx-auto my-20'>
        <h2 className='flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
          <span className='mr-4 text-3xl md:text-4xl leading-none'>💎</span>
          {translate('subscription.title')}
        </h2>
        <span className='block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200'>
          {translate('subscription.description')}
        </span>
      </header>
      <section className='text-neutral-600 text-sm md:text-base overflow-hidden'>
        <div className='grid lg:grid-cols-3 gap-5 xl:gap-8'>
          {pricings.map(renderPricingItem)}
        </div>
      </section>
    </div>
  );
};

export default PageSubcription;
