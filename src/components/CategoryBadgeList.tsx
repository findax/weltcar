import { Route } from '@/types/routers';
import Badge from '@/shared/Badge';

export interface CategoryBadgeListProps {
  className?: string;
  itemClass?: string;
  categories: {
    name: string;
    href: Route<string> | undefined;
    color: string;
  }[];
}

const CategoryBadgeList = ({
  className = 'flex flex-wrap space-x-2',
  itemClass,
  categories,
}: CategoryBadgeListProps) => {
  return (
    <div
      className={`nc-CategoryBadgeList ${className}`}
      data-nc-id='CategoryBadgeList'
    >
      {categories.map((item, index) => (
        <Badge
          className={itemClass}
          key={index}
          name={item.name}
          href={item.href}
          color={item.color as any}
        />
      ))}
    </div>
  );
};

export default CategoryBadgeList;
