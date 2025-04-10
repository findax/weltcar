import { SocialType } from '@/shared/SocialsShare';
import youTubeImg from '@/images/socials/youTube.svg'
import facebookImg from '@/images/socials/facebook.svg'
import twitterImg from '@/images/socials/twitter.svg'
import instagramImg from '@/images/socials/instagram.svg'
import { FaTelegram } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa";
import Image from 'next/image';

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: SocialType[];
}

const socialsDemo: SocialType[] = [
  { name: 'Facebook', icon: <FaFacebookSquare />, href: 'https://www.facebook.com/weltcar.de', iconType: 'svg' },
  { name: 'Telegram', icon: <FaTelegram />, href: 'http://t.me/weltcarde', iconType: 'svg' },
  // { name: 'Youtube', icon: youTubeImg, href: '#' },
  { name: 'Instagram', icon: <RiInstagramFill />, href: 'https://www.instagram.com/weltcar.de/', iconType: 'svg' },
];

const SocialsList = ({
  className = '',
  itemClass = 'block',
  socials = socialsDemo,
}: SocialsListProps) => {
  return (
    <nav
      className={`nc-SocialsList flex gap-4 text-2xl text-neutral-600 dark:text-neutral-300 ${className}`}
      data-nc-id='SocialsList'
    >
      {socials.map((item, i) => (
        <a
          key={i}
          className={itemClass}
          href={item.href}
          target='_blank'
          rel='noopener noreferrer'
          title={item.name}
        >
          {item.iconType 
            ? <span className='opacity-50'>{item.icon}</span>
            : <Image 
                src={item.icon}
                alt={item.name}
              />
          }
        </a>
      ))}
    </nav>
  );
};

export default SocialsList;
