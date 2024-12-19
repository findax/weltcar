import React, { FC } from 'react';

export interface Statistic {
  id: string;
  heading: string;
  title: string;
  subHeading: string;
}

const STATISTIC: Statistic[] = [
  {
    id: '1',
    heading: 'fastFacts.premiumVehicles.title',
    title: 'fastFacts.premiumVehicles.subtitle',
    subHeading: 'fastFacts.premiumVehicles.description',
  },
  {
    id: '2',
    heading: 'fastFacts.repeatCustomers.title',
    title: 'fastFacts.repeatCustomers.subtitle',
    subHeading: 'fastFacts.repeatCustomers.description',
  },
  {
    id: '3',
    heading: 'fastFacts.yearsExperience.title',
    title: 'fastFacts.yearsExperience.subtitle',
    subHeading: 'fastFacts.yearsExperience.description',
  },
];

export interface SectionStatisticProps {
  className?: string;
  translate: any;
}

const SectionStatistic: FC<SectionStatisticProps> = ({ 
  className = '',
  translate
}) => {
  return (
    <div className={`nc-SectionStatistic mt-72 lg:mt-60 relative ${className}`}>
      <h2 className='my-4 text-neutral-1050 dark:text-white text-center font-bold text-3xl md:text-4xl xl:text-5xl'>
        {translate('fastFacts.title.facts')}
        <span className='dark:text-primary-950 text-primary-600'>{translate('fastFacts.title.WeltCar')}</span>
      </h2>
      <div className='grid mt-16 gap-6 lg:grid-cols-3 xl:gap-8'>
        {STATISTIC.map((item) => (
          <div
            key={item.id}
            className='flex flex-col py-12 px-8 bg-white dark:bg-neutral-950 rounded-3xl'
          >
            <h3 className='text-5xl font-bold leading-none text-[#DFE172]'>
              {translate(item.heading)}
            </h3>
            <span className='block my-3 text-lg md:text-2xl font-bold text-neutral-1050 dark:text-white '>{translate(item.title)}</span>
            <span className='block md:text-lg text-neutral-500 dark:text-neutral-400'>
              {translate(item.subHeading)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionStatistic;
