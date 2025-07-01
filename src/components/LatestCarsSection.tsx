import { getLatestCarsList } from '@/api';
import Heading from '@/shared/Heading';
import { getTranslations } from 'next-intl/server';
import LatestCarsList from './LatestCarsList';

interface Props {
  locale: string;
}

export default async function LatestCarsSections({ locale }: Props) {
  const t = await getTranslations('welcome');
  const carsResponse = await getLatestCarsList(locale);
  const carList = carsResponse?.data || [];

  return (
    <div className={`nc-LatestCarsSections`} data-nc-id='LatestCarsSections'>
      <Heading
        isCenter={true}
        fontClass='!font-bold text-3xl md:text-4xl xl:text-5xl text-neutral-1050 dark:text-white'
      >
        {t('latestCars.title')}
      </Heading>
      <div className='flex flex-col gap-5 lg:flex-row justify-around mt-14'>
        <LatestCarsList carList={carList} />
      </div>
    </div>
  );
}
