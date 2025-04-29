import Link from 'next/link';
import SocialsList from '@/shared/SocialsList';
import { WatsappIcon } from '@/shared/icons';

interface IProps{
  translate: any;
}

export default function ContactHero({
  translate
}: IProps) {
  return (
    <div className='relative'>
      <div>
        <h1 className='text-4xl lg:text-6xl xl:text-[80px] font-bold text-neutral-1050 dark:text-white '>{translate('contactus.title')}</h1>
        <span className='block lg:w-[480px] my-9 lg:my-14 lg:text-lg text-neutral-500 dark:text-neutral-400'>
          {translate('contact.description')}
        </span>
      </div>
      <div className='flex-shrink-0'>
        <div className='flex gap-5 lg:gap-0 flex-col lg:flex-row justify-between border border-white bg-white dark:border-neutral-950 dark:bg-neutral-950 p-10 rounded-3xl '>
          <div className='w-full lg:w-[18%]'>
            <h2 className='font-semibold dark:text-neutral-200 tracking-wider'>
              <span className='mr-3'>📍</span>
              {translate('contact.address.label')}
            </h2>
            <Link
              className='inline-block mt-4 lg:mt-2 text-neutral-500 dark:text-neutral-400 hover:underline'
              href='#'
              target='_blank'
              rel='noopener noreferrer'
            >
              {translate('contact.address.value')}
            </Link>
          </div>
          <div className='w-full lg:w-[18%]'>
            <h2 className='font-semibold dark:text-neutral-200 tracking-wider'>
              <span className='mr-3'>✉️</span>
              {translate('contact.email.label')}
            </h2>
            <Link
              className='inline-block mt-4 lg:mt-2 text-neutral-500 dark:text-neutral-400 hover:underline'
              href='mailto:info@weltcar.de'
            >
              info@weltcar.de
            </Link>
          </div>
          <div className='flex flex-col lg:block w-full lg:w-[18%]'>
            <h2 className='font-semibold dark:text-neutral-200 tracking-wider'>
              <span className='mr-3'>📞</span>
              {translate('contact.phone.label')}
            </h2>
            <Link
              className='inline-block mt-4 lg:mt-2 text-neutral-500 dark:text-neutral-400 hover:underline'
              href='tel:+4915902465256'
            >
              +49 1590 2465256
            </Link>
            <Link
              className='inline-block mt-4 lg:mt-2 text-neutral-500 dark:text-neutral-400 hover:underline'
              href='tel:+971522272939'
            >
              +971 52 227 2939
            </Link>
          </div>
          <div className='w-full lg:w-[18%]'>
            <h2 className='font-semibold dark:text-neutral-200 tracking-wider'>
              <WatsappIcon className='w-4 inline-block mr-3' />
              {translate('contact.messenger.label')}
            </h2>
            <Link
              className='inline-block mt-4 lg:mt-2 text-neutral-500 dark:text-neutral-400 hover:underline'
              href='https://wa.me/&#x2B;4915902465256'
              target='_blank'
              rel='noreferrer noopener'
            >
              +49 1590 2465256
            </Link>
          </div>
          <div className='w-full lg:w-[18%]'>
            <h2 className='font-semibold dark:text-neutral-200 tracking-wider'>
              <span className='mr-3'>🌏</span>
              {translate('contact.social.label')}
            </h2>
            <SocialsList itemClass='text-neutral-600 dark:hover:text-white hover:text-black dark:text-neutral-200' className='mt-4 lg:mt-2' />
          </div>
        </div>
      </div>
    </div>
  );
}
