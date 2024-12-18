import { Route } from "next";
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
  return (
    <Link
      href={href as Route}
      className={className}
    >
      {name.replace('-', ' ').replace('/', ' ')}
    </Link>
  );
}