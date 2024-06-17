import { SocialType } from '@/shared/SocialsShare';

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: SocialType[];
}

const socialsDemo: SocialType[] = [
  { name: 'Facebook', icon: 'lab la-facebook-square', href: '#' },
  { name: 'Twitter', icon: 'lab la-twitter', href: '#' },
  { name: 'Youtube', icon: 'lab la-youtube', href: '#' },
  { name: 'Instagram', icon: 'lab la-instagram', href: '#' },
];

const SocialsList = ({
  className = '',
  itemClass = 'block',
  socials = socialsDemo,
}: SocialsListProps) => {
  return (
    <nav
      className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-600 dark:text-neutral-300 ${className}`}
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
          <i className={item.icon}></i>
        </a>
      ))}
    </nav>
  );
};

export default SocialsList;
