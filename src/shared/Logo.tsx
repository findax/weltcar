import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import logoLight from '@/images/logoLight.svg';
import logoDark from '@/images/logoDark.svg';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  const locale = useLocale();
  return (
    <Link
      href={`/${locale}`}
      className={`ttnc-logo inline-block text-primary-600 focus:outline-none focus:ring-0 ${className}`}
    >
      <Image
        src={logoLight.src}
        alt='logo_light'
        width={180}
        height={39}
        className='block dark:hidden'
      />
      <Image
        src={logoDark.src}
        alt='logo_dark'
        width={180}
        height={39}
        className='hidden dark:block'
      />
    </Link>
  );
};

export default Logo;
