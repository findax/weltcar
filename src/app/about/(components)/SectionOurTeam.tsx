import Heading from '@/shared/Heading';
import Image from 'next/image';
import React from 'react';
import teamImg1 from '@/images/team/t1.webp';
import teamImg2 from '@/images/team/t2.webp';
import teamImg3 from '@/images/team/t3.webp';
import teamImg4 from '@/images/team/t4.webp';
import teamImg5 from '@/images/team/t5.webp';

const TEAM_DEMO = [
  {
    id: '1',
    name: `Niamh O'Shea`,
    job: 'Co-founder and Chief Executive',
    avatar: teamImg1,
  },
  {
    id: '2',
    name: `Dara Frazier`,
    job: 'Co-founder and Chief Executive',
    avatar: teamImg2,
  },
  {
    id: '3',
    name: `Danien Jame`,
    job: 'Co-Founder, Chief Strategy Officer',
    avatar: teamImg3,
  },
  {
    id: '4',
    name: `Danien Jame`,
    job: 'Co-Founder, Chief Strategy Officer',
    avatar: teamImg4,
  },
  {
    id: '5',
    name: `Danien Jame`,
    job: 'Co-Founder, Chief Strategy Officer',
    avatar: teamImg5,
  },
];

const SectionOurTeam = () => {
  return (
    <div className='nc-SectionFounder relative'>
      <Heading desc='Our team at WeltCar is composed of industry experts dedicated to providing you with the best luxury car buying experience. We work together to ensure that every aspect of your interaction with us is seamless and satisfying, making your journey to owning a premium vehicle both enjoyable and memorable.'>
        Our Team
      </Heading>
      <div className='flex flex-wrap justify-center gap-10 sm:gap-4'>
        {TEAM_DEMO.map((item) => (
          <div
            key={item.id}
            className='w-full sm:w-[calc(33%-9px)] lg:w-[calc(20%-13px)]'
          >
            <div className='relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden'>
              <Image
                fill
                className=' object-cover'
                src={item.avatar}
                alt='team member'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 30vw'
              />
            </div>

            <h3 className='text-lg font-semibold text-neutral-900 mt-4 md:text-xl dark:text-neutral-200'>
              {item.name}
            </h3>
            <span className='block text-sm text-neutral-500 sm:text-base dark:text-neutral-400'>
              {item.job}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionOurTeam;
