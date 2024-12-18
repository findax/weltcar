import { Metadata } from 'next';
import BlogHero from './(components)/BlogHero';
import BlogCatalog from './(components)/BlogCatalog';
import { Suspense } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';

const blogPages = [
  {
    pageName: 'Blog.breadcrump.main',
    pageHref: '/'
  },
  {
    pageName: 'Blog.breadcrump.blog',
    pageHref: '/blog'
  }
];

export const metadata: Metadata = {
  title: 'Blog | Elite Car Sales & Global Delivery Services | WeltCar',
  description:
    'Learn more about our commitment to providing the finest luxury cars with exceptional global delivery services. Discover our mission, values, and why we are the preferred choice for elite vehicles worldwide.',
};


const PageBlog = () => {
  return (
    <div className={`nc-PageBlog overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}

      <div className='container mt-8 mb-44'>
        <div className="space-y-6">
          <Breadcrumbs 
            pages={blogPages}
          />
          <BlogHero />
        </div>

        <div className='relative flex pb-20 py-12'>
          <Suspense>
            <BlogCatalog />
          </Suspense>
        </div>
      </div>
      
    </div>
  );
};

export default PageBlog;
