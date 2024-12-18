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
    name: 'team.members.oleg.name',
    job: 'team.members.oleg.position',
    avatar: teamImg1,
  },
  {
    id: '2',
    name: 'team.members.natalia.name',
    job: 'team.members.natalia.position',
    avatar: teamImg2,
  },
  {
    id: '3',
    name: 'team.members.sergey.name',
    job: 'team.members.sergey.position',
    avatar: teamImg3,
  },
  {
    id: '4',
    name: 'team.members.alexander.name',
    job: 'team.members.alexander.position',
    avatar: teamImg4,
  },
  {
    id: '5',
    name: 'team.members.agassi.name',
    job: 'team.members.agassi.position',
    avatar: teamImg5,
  },
];

interface IProps {
  translate: any;
}

const SectionOurTeam = ({
  translate
}: IProps) => {
  return (
    <div className='nc-SectionFounder relative'>
      <div>
        <h2 className='text-3xl md:text-4xl xl:text-5xl font-bold text-neutral-1050 dark:text-white '>{translate('team.title')}</h2>
        <span className='block lg:w-[480px] my-14 lg:text-lg text-neutral-500 dark:text-neutral-400'>
          {translate('team.description')}
        </span>
      </div>
      <div className='flex flex-wrap justify-center gap-4 sm:gap-4'>
        {TEAM.map((item) => (
          <div
            key={item.id}
            className='w-[45%] sm:w-[calc(33%-9px)] lg:w-[calc(20%-13px)]'
          >
            <div className='relative h-[200px] aspect-h-1 aspect-w-1 rounded-xl overflow-hidden'>
              <Image
                fill
                className=' object-cover'
                src={item.avatar}
                alt={item.name + ' ' + item.job}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 30vw'
              />
            </div>

            <h3 className='text-lg lg:text-2xl font-bold text-neutral-900 mt-4 md:text-2xl dark:text-neutral-200'>
              {translate(item.name)}
            </h3>
            <span className='block lg:text-lg text-neutral-500 sm:text-lg dark:text-neutral-400'>
              {translate(item.job)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionOurTeam;
