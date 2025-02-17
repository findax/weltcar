'use client'

import Link from 'next/link';
import Logo from '@/shared/Logo';
import SocialsList1 from '@/shared/SocialsList1';
import SubscribeForm from '@/components/SubscribeForm';
import { WatsappIcon } from '@/shared/icons';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const { isDarkMode, mounted } = useThemeMode();
  const translate = useTranslations()
  const locale = useLocale();

  if (!mounted) return null;

  return (
    <footer className='nc-Footer relative bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700'>
      <div className='container'>
        <div className='py-24 lg:py-28'>
          <div className='grid grid-cols-12 gap-y-14 gap-x-6 px-3 xl:px-0'>
            <div className='-mt-3 col-span-12 md:col-span-6 xl:col-span-3'>
              <Logo isDark={isDarkMode} />
              <p className='mt-2 mb-6 text-neutral-600 dark:text-neutral-400'>
                {translate('footer.title.weltcarTo')}
                <br />
                {translate('footer.title.luxury')}
              </p>
              <SocialsList1 className='flex gap-2 md:space-x-0 flex-col md:space-y-2.5 items-start' />
            </div>
            <div className='col-span-12 md:col-span-6 xl:col-span-3 space-y-6'>
              <h4 className='text-2xl text-neytral-1050 font-bold dark:text-white'>{translate('footer.quickLink.title')}</h4>
              <ul className='flex flex-col gap-2'>
                <li>
                  <Link
                    href={`/${locale}/catalog`}
                    className='text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  >
                    {translate('footer.quickLink.catalog')}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/about`}
                    className='text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  >
                    {translate('footer.quickLink.about')}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/contact`}
                    className='text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  >
                    {translate('footer.quickLink.contact')}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/sold-car`}
                    className='text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  >
                    {translate('footer.quickLink.soldCar')}
                  </Link>
                </li>
              </ul>
            </div>
            <div className='col-span-12 md:col-span-6 xl:col-span-3 space-y-6'>
              <h4 className='text-2xl text-neytral-1050 font-bold dark:text-white'>{translate('footer.contact.title')}</h4>
              <ul className='flex flex-col gap-6'>
                <li className='flex items-center gap-4'>
                  {/* <i className='las la-map-marker-alt text-xl p-2 rounded-full border border-neutral-200 dark:border-neutral-700'></i> */}
                  📍{' '}
                  <Link
                    className='text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    href='https://www.google.com/maps?q=FinDax+GmbH,+Theodor-Fontane-Stra%C3%9Fe+2,+22848+Norderstedt,+Germany&ftid=0x47b229e490544979:0x29213d5a4a4d551b&entry=gps&lucs=,94224825,94227247,94227248,94222042,47071704,47069508,94214172,94218641,94203019,47084304,94208458,94208447&g_ep=CAISDTYuMTE5LjEuNjYwNTAYACCenQoqbCw5NDIyNDgyNSw5NDIyNzI0Nyw5NDIyNzI0OCw5NDIyMjA0Miw0NzA3MTcwNCw0NzA2OTUwOCw5NDIxNDE3Miw5NDIxODY0MSw5NDIwMzAxOSw0NzA4NDMwNCw5NDIwODQ1OCw5NDIwODQ0N0ICRUU%3D&g_st=com.google.maps.preview.copy'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {translate('footer.contact.street')}
                    <br />
                    {translate('footer.contact.streetCode')}
                  </Link>
                </li>
                <li className='flex items-center gap-4'>
                  {/* <i className='las la-envelope-open text-xl p-2 rounded-full border border-neutral-200 dark:border-neutral-700'></i> */}
                  ✉️{' '}
                  <Link
                    className='text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    href='mailto:info@findax.eu'
                  >
                    info@findax.eu
                  </Link>
                </li>
                <li className='flex items-center gap-4'>
                  {/* <i className='las la-phone-volume text-xl p-2 rounded-full border border-neutral-200 dark:border-neutral-700'></i> */}
                  📞{' '}
                  <Link
                    className='text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    href='tel:+4915902465256'
                  >
                    +49 1590 2465256
                  </Link>
                </li>
                <li>
                  <Link
                    className='inline-flex items-center py-1.5 text-xl border border-primary-200 dark:border-neutral-1100 rounded-full bg-primary-100/30 dark:bg-neutral-1150 hover:bg-primary-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    href='https://wa.me/&#x2B;4915902465256'
                    target='_blank'
                    rel='noreferrer noopener'
                  >
                    <WatsappIcon className='w-9 mx-2.5' />
                    <span className='mr-6'>+49 1590 2465256</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className='col-span-12 md:col-span-6 xl:col-span-3 space-y-6'>
              <h4 className='text-2xl text-neytral-1050 font-bold dark:text-white'>{translate('footer.newsletter.title')}</h4>
              <p className='text-neutral-600 dark:text-neutral-400'>
                {translate('footer.newsletter.description')}
              </p>
              <SubscribeForm 
                isButtonShowCircle={true}
              />
            </div>
          </div>
        </div>
        <div className='py-8 border-t border-neutral-200 dark:border-neutral-700'>
          <div className='grid grid-cols-12 gap-4 text-sm'>
            <div className='col-span-12 lg:col-span-6'>
              <p className='text-center lg:text-start text-neutral-500 dark:text-neutral-400'>
                {translate('footer.copyright')} &copy; {new Date().getFullYear()} WeltCar
              </p>
            </div>
            <div className='col-span-12 lg:col-span-6'>
              <ul className='flex items-center flex-wrap gap-6 justify-center lg:justify-end'>
                <li>
                  <Link
                    href={`/${locale}/privacy-policy`}
                    className='text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  >
                    {translate('footer.privacy')}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/legal-notice`}
                    className='text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  >
                    {translate('footer.legal')}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/cookie-policy`}
                    className='text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  >
                    {translate('footer.cookie')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
