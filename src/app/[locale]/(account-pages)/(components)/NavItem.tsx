import { Route } from "next";
import { useLocale } from "next-intl";
import Link from "next/link";

interface IProps {
  item: string;
  href: string;
  className?: string; 
  translate: any;
}

export const NavItem = ({
  item,
  href,
  className,
  translate
}:IProps) => {
  const name = translate(item);
  const locale = useLocale();
  return (
    <Link
      href={`/${locale}${href}` as Route}
      className={className}
    >
      {name.replace('-', ' ').replace('/', ' ')}
    </Link>
  );
}