import { Route } from 'next';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface BreadcrumbsProps {
  pages: {
    pageName: string;
    pageHref: string;
  }[];
}

const Breadcrumbs = ({ 
  pages
}: BreadcrumbsProps) => {
  return (
    <nav aria-label="breadcrumb" className="flex">
      {pages.map((page, index) => {
        const isLast = index === pages.length - 1;

        return (
          <div key={page.pageHref} className="flex items-center">
            {isLast ? (
              <span className="text-sm dark:text-neutral-400 text-neutral-500" aria-current="page">
                {page.pageName}
              </span>
            ) : (
              <>
                <Link href={page.pageHref as Route} className='text-sm dark:text-white text-neutral-1050'>
                  {page.pageName}
                </Link>
                <ChevronRightIcon className='w-4 h-4 mx-2'/>
              </>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
