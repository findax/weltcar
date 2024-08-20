import { Route } from "next";
import Link from "next/link";

interface IProps {
  item: Route<string>;
  className?: string; 
}

export const NavItem = ({
  item,
  className
}:IProps) => {
  return (
    <Link
      href={item}
      className={className}
    >
      {item.replace('-', ' ').replace('/', ' ')}
    </Link>
  );
}