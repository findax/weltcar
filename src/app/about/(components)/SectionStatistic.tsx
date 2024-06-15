import React, { FC } from 'react';
import Heading from '@/shared/Heading';

export interface Statistic {
  id: string;
  heading: string;
  subHeading: string;
}

const FOUNDER_DEMO: Statistic[] = [
  {
    id: '1',
    heading: 'Over 500 Premium Vehicles Sold Annually',
    subHeading:
      'Our extensive inventory and expert sales team ensure that we meet the high demand for luxury cars, serving clients from all around the world.',
  },
  {
    id: '2',
    heading: '90% Repeat Customers',
    subHeading:
      'A significant majority of our clients return for their next luxury vehicle purchase, a testament to our exceptional service and the quality of our vehicles',
  },
  {
    id: '3',
    heading: '20+ Years of Experience in the Luxury Auto Industry',
    subHeading:
      'Our deep industry knowledge and long-standing relationships with top car manufacturers guarantee that you receive the best vehicles and services available',
  },
];

export interface SectionStatisticProps {
  className?: string;
}

const SectionStatistic: FC<SectionStatisticProps> = ({ className = '' }) => {
  return (
    <div className={`nc-SectionStatistic relative ${className}`}>
      <Heading
      // desc=' We’re impartial and independent, and every day we create distinctive,
      //   world-class programmes and content'
      >
        Fast Facts About WeltCar
      </Heading>
      <div className='grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8'>
        {FOUNDER_DEMO.map((item) => (
          <div
            key={item.id}
            className='flex flex-col p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800'
          >
            <h3 className='text-2xl font-semibold leading-none mb-4 text-neutral-900 md:text-2xl dark:text-neutral-200'>
              {item.heading}
            </h3>
            <span className='block text-sm text-neutral-500 mt-auto sm:text-base dark:text-neutral-400'>
              {item.subHeading}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionStatistic;
