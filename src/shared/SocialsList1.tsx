import { SocialType } from '@/shared/SocialsShare';
import React, { FC } from 'react';
import { FaTelegram } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import Image from 'next/image';

export interface SocialsList1Props {
  className?: string;
}

const socials: SocialType[] = [
  { name: 'Facebook', icon: <FaFacebookSquare />, href: 'https://www.facebook.com/weltcar.de', iconType: 'svg' },
  { name: 'Telegram', icon: <FaTelegram />, href: 'http://t.me/weltcarde', iconType: 'svg' },
  { name: 'WhatsUp', icon: <IoLogoWhatsapp />, href: 'https://whatsapp.com/channel/0029VbBq1rO9RZAbDL2Quc2U', iconType: 'svg' },
  { name: 'Instagram', icon: <RiInstagramFill />, href: 'https://www.instagram.com/weltcar.de/', iconType: 'svg' },
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
        {item.iconType 
          ? <span className='opacity-50'>{item.icon}</span>
          : <Image 
              src={item.icon}
              alt={item.name}
            />
        }
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
