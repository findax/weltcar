import { SocialType } from '@/shared/SocialsShare';
import React, { FC } from 'react';
import youTubeImg from '@/images/socials/youTube-1.svg'
import facebookImg from '@/images/socials/facebook-1.svg'
import twitterImg from '@/images/socials/twitter-1.svg'
import instagramImg from '@/images/socials/instagram-1.svg'
import Image from 'next/image';

export interface SocialsList1Props {
  className?: string;
}

const socials: SocialType[] = [
  { name: 'Facebook', icon: facebookImg, href: 'https://www.facebook.com/weltcar.de' },
  { name: 'Twitter', icon: twitterImg, href: '#' },
  { name: 'Youtube', icon: youTubeImg, href: '#' },
  { name: 'Instagram', icon: instagramImg, href: 'https://www.instagram.com/weltcar.de/' },
];

const SocialsList1: FC<SocialsList1Props> = ({ className = 'space-y-2.5' }) => {
  const renderItem = (item: SocialType, index: number) => {
    return (
      <a
        target='_blank'
        href={item.href}
        className='flex items-center text-2xl text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white leading-none space-x-2 group'
        key={index}
      >
        <Image 
          src={item.icon}
          alt={item.name}
        />
        <span className='text-sm'>{item.name}</span>
      </a>
    );
  };

  return (
    <div className={`nc-SocialsList1 ${className}`} data-nc-id='SocialsList1'>
      {socials.map(renderItem)}
    </div>
  );
};

export default SocialsList1;
