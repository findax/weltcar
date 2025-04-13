import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import logoLight from '@/images/logoLight.svg';
import logoDark from '@/images/logoDark.svg';

interface LogoProps {
  className?: string;
  isDark: boolean;
}

const Logo = ({ 
  className,
  isDark
}: LogoProps) => {
  const locale = useLocale();
  return (
    <Link
      href={`/${locale}`}
      className={`ttnc-logo inline-block text-primary-600 focus:outline-none focus:ring-0 ${className}`}
    >
    {isDark 
      ? ( <Image src={logoDark.src} alt='logo' width={180} height={39}/> ) 
      : (<Image src={logoLight.src} alt='logo' width={180} height={39}/> )
    }
    </Link>
  );
};

export default Logo;
