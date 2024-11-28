import { SocialType } from '@/shared/SocialsShare';
import youTubeImg from '@/images/socials/youTube.svg'
import facebookImg from '@/images/socials/facebook.svg'
import twitterImg from '@/images/socials/twitter.svg'
import instagramImg from '@/images/socials/instagram.svg'
import Image from 'next/image';

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: SocialType[];
}

const socialsDemo: SocialType[] = [
  { name: 'Youtube', icon: youTubeImg, href: '#' },
  { name: 'Facebook', icon: facebookImg, href: '#' },
  { name: 'Twitter', icon: twitterImg, href: '#' },
  { name: 'Instagram', icon: instagramImg, href: 'https://www.instagram.com/weltcar.de' },
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
          <Image 
            src={item.icon}
            alt={item.name}
          />
        </a>
      ))}
    </nav>
  );
};

export default SocialsList;
