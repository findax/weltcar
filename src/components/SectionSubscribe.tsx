import Image from 'next/image';
import SubscribeForm from '@/components/SubscribeForm';
import { ButtonPrimary } from '@/shared/Buttons';
import coverImg from '@/images/icons/cover.svg'
import { useLocale } from 'next-intl';
import { NextRoute } from '@/types/routers';

export interface IProps {
  className?: string;
  translate: any;
}

const Subscribe = ({ 
  className = '',
  translate
}:IProps) => {
  const locale = useLocale();
  const newHref = `/${locale}/catalog`;
  return (
    <div
      className={`nc-Subscribe flex flex-col gap-12 xl:gap-0 lg:flex-row justify-between  ${className}`}
      data-nc-id='Subscribe'
    >
      <div className='w-full lg:w-[506px]'>
        <h2 className='mb-10 lg:mb-20 font-bold text-neutral-1050 dark:text-white text-3xl md:text-4xl xl:text-5xl'>{translate('joinOurNewsletter.title')}</h2>
        <SubscribeForm isButtonShowClassic={true}/>
      </div>
      <div className='w-full lg:w-[581px]'>
        <ul className='space-y-8'>
          <li className=''>
            <h3 className='flex items-center space-x-4 text-lg lg:text-xl font-bold text-neutral-1050 dark:text-white'>
              <Image src={coverImg} alt='cover image' className='mr-3'/> {translate('joinOurNewsletter.stayUpdated.title')}
            </h3>
            <p className='mt-4 text-base lg:text-lg text-neutral-500 dark:text-neutral-400'>
              {translate('joinOurNewsletter.stayUpdated.description')}
            </p>
          </li>
          <li className=''>
            <h3 className='flex items-center space-x-4 text-lg lg:text-xl font-bold text-neutral-1050 dark:text-white'>
              <Image src={coverImg} alt='cover image' className='mr-3'/> {translate('joinOurNewsletter.subscribe.title')}
            </h3>
            <p className='mt-4 text-base lg:text-lg text-neutral-500 dark:text-neutral-400'>
              {translate('joinOurNewsletter.subscribe.description')}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Subscribe;
