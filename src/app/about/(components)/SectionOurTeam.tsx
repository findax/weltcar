import Heading from '@/shared/Heading';
import Image from 'next/image';
import React from 'react';
import teamImg1 from '@/images/team/t1.svg';
import teamImg2 from '@/images/team/t2.svg';
import teamImg3 from '@/images/team/t3.svg';
import teamImg4 from '@/images/team/t4.svg';
import teamImg5 from '@/images/team/t5.svg';

const TEAM = [
  {
    id: '1',
    name: 'Oleg',
    job: 'Founder, Director',
    avatar: teamImg1,
  },
  {
    id: '2',
    name: 'Natalia',
    job: 'Founder, Director',
    avatar: teamImg2,
  },
  {
    id: '3',
    name: 'Sergey',
    job: 'Director, Partner',
    avatar: teamImg3,
  },
  {
    id: '4',
    name: 'Alexander',
    job: 'Purchasing Manager',
    avatar: teamImg4,
  },
  {
    id: '5',
    name: 'Agassi',
    job: 'Administrative Manager',
    avatar: teamImg5,
  },
];

const SectionOurTeam = () => {
  return (
    <div className='nc-SectionFounder relative'>
      <div>
        <h2 className='text-5xl font-bold text-neutral-1050 dark:text-white '>Our Team</h2>
        <span className='block w-[480px] my-14 text-lg text-neutral-500 dark:text-neutral-400'>
          Our team at WeltCar is composed of industry experts dedicated to providing you with the best luxury car buying experience. We work together to ensure that every aspect of your interaction with us is seamless and satisfying, making your journey to owning 
          a premium vehicle both enjoyable and memorable.
        </span>
      </div>
      <div className='flex flex-wrap justify-center gap-10 sm:gap-4'>
        {TEAM.map((item) => (
          <div
            key={item.id}
            className='w-full sm:w-[calc(33%-9px)] lg:w-[calc(20%-13px)]'
          >
            <div className='relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden'>
              <Image
                fill
                className=' object-cover'
                src={item.avatar}
                alt={item.name + ' ' + item.job}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 30vw'
              />
            </div>

            <h3 className='text-xl font-bold text-neutral-900 mt-4 md:text-2xl dark:text-neutral-200'>
              {item.name}
            </h3>
            <span className='block text-sm text-neutral-500 sm:text-lg dark:text-neutral-400'>
              {item.job}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionOurTeam;
