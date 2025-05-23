import Heading from '@/shared/Heading';
import Image from 'next/image';
import React from 'react';
import teamImgOleg from '@/images/team/t.oleg.jpg';
import teamImg2 from '@/images/team/t2.svg';
import teamImg3 from '@/images/team/t3.svg';
import teamImgAndrew from '@/images/team/t.andrew.jpg';
import { hasTranslation } from '@/utils/translation';
import Link from 'next/link';
import { normalizePhone } from '@/utils/inputsNormalization';

const TEAM = [
  {
    id: '1',
    name: 'team.members.oleg.name',
    job: 'team.members.oleg.position',
    avatar: teamImgOleg,
    phone: 'team.members.oleg.phone',
    email: 'team.members.oleg.email',
  },
  {
    id: '2',
    name: 'team.members.natalia.name',
    job: 'team.members.natalia.position',
    avatar: teamImg2,
    phone: 'team.members.natalia.phone',
    email: 'team.members.natalia.email',
  },
  {
    id: '3',
    name: 'team.members.alexander.name',
    job: 'team.members.alexander.position',
    avatar: teamImg3,
    phone: 'team.members.alexander.phone',
    email: 'team.members.alexander.email',
  },
  {
    id: '4',
    name: 'team.members.andrew.name',
    job: 'team.members.andrew.position',
    avatar: teamImgAndrew,
    phone: 'team.members.andrew.phone',
    email: 'team.members.andrew.email',
  },
];

interface IProps {
  translate: any;
}

const SectionOurTeam = ({ translate }: IProps) => {
  return (
    <div className='nc-SectionFounder relative'>
      <div>
        <h2 className='text-3xl md:text-4xl xl:text-5xl font-bold text-neutral-1050 dark:text-white '>
          {translate('team.title')}
        </h2>
        <span className='block lg:w-[480px] my-14 lg:text-lg text-neutral-500 dark:text-neutral-400'>
          {translate('team.description')}
        </span>
      </div>
      <div className='flex flex-wrap justify-center gap-4 sm:gap-4'>
        {TEAM.map((item) => {
          const phone = translate(item.phone);
          const email = translate(item.email);
          return (
            <div
              key={item.id}
              className='w-[45%] sm:w-[calc(33%-9px)] lg:w-[calc(20%-13px)]'
            >
              <div className='relative h-[200px] aspect-h-1 aspect-w-1 rounded-xl overflow-hidden'>
                <Image
                  fill
                  className=' object-cover'
                  src={item.avatar}
                  alt={`${translate(item.name)} ${translate(item.job)}`}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 30vw'
                />
              </div>

              <h3 className='text-lg lg:text-2xl font-bold text-neutral-900 mt-4 md:text-2xl dark:text-neutral-200'>
                {translate(item.name)}
              </h3>
              <span className='block lg:text-lg text-neutral-500 sm:text-lg dark:text-neutral-400'>
                {translate(item.job)}
              </span>
              {hasTranslation(translate, item.phone) && (
                <Link
                  className='inline-block mt-4 lg:mt-2 text-neutral-500 dark:text-neutral-400 hover:underline'
                  href={`tel:${normalizePhone(phone)}`}
                >
                  {phone}
                </Link>
              )}
              {hasTranslation(translate, item.email) && (
                <Link
                  className='inline-block mt-4 lg:mt-2 text-neutral-500 dark:text-neutral-400 hover:underline'
                  href={`mailto:${email}`}
                >
                  {email}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionOurTeam;
