import { XCircleIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

export default function ErrorComponent() {
  const translate = useTranslations();
  return (
    <div className='-mt-[76px] text-center'>
      <XCircleIcon className='block mx-auto w-24 h-24 text-red-500 mb-10' />
      <p className='px-6 text-2xl font-semibold'>
        {translate('errorComponent.error.title')} <br />
        {translate('errorComponent.tryAgain.title')}
      </p>
    </div>
  );
}
