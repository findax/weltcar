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
    heading: '500',
    title: 'Premium Vehicles Sold Annually',
    subHeading:
      'Our extensive inventory and expert sales team ensure that we meet the high demand for luxury cars, serving clients from all around the world.',
  },
  {
    id: '2',
    heading: '90%',
    title: 'Repeat Customers',
    subHeading:
      'A significant majority of our clients return for their next luxury vehicle purchase, a testament to our exceptional service and the quality of our vehicles',
  },
  {
    id: '3',
    heading: '20+',
    title: 'Years of Experience in the Luxury Auto Industry',
    subHeading:
      'We provide expert support in custom website and ERP development, ensuring your digital platforms run smoothly. Our team is ready to solve  any technical challenges.',
  },
];

export interface SectionStatisticProps {
  className?: string;
}

const SectionStatistic: FC<SectionStatisticProps> = ({ className = '' }) => {
  return (
    <div className={`nc-SectionStatistic mt-72 lg:mt-60 relative ${className}`}>
      <h2 className='my-4 text-neutral-1050 dark:text-white text-center font-bold text-3xl md:text-4xl xl:text-5xl'>
        Fast Facts About <span className='text-primary-600'>WeltCar</span>
      </h2>
      <div className='grid mt-16 gap-6 lg:grid-cols-3 xl:gap-8'>
        {STATISTIC.map((item) => (
          <div
            key={item.id}
            className='flex flex-col py-12 px-8 bg-white dark:bg-neutral-950 rounded-3xl'
          >
            <h3 className='text-5xl font-bold leading-none text-[#DFE172]'>
              {item.heading}
            </h3>
            <span className='block my-3 text-lg md:text-2xl font-bold text-neutral-1050 dark:text-white '>{item.title}</span>
            <span className='block md:text-lg text-neutral-500 dark:text-neutral-400'>
              {item.subHeading}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionStatistic;
