import { Metadata } from 'next';
import BlogHero from './(components)/BlogHero';
import BlogCatalog from './(components)/BlogCatalog';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Blog | Elite Car Sales & Global Delivery Services | WeltCar',
  description:
    'Learn more about our commitment to providing the finest luxury cars with exceptional global delivery services. Discover our mission, values, and why we are the preferred choice for elite vehicles worldwide.',
};

const PageBlog = () => {
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}

      <div className='container my-12 xl:my-20'>
        <BlogHero />

        <div className='relative flex pb-20 py-12 lg:py-20'>
          <Suspense>
            <BlogCatalog />
          </Suspense>
        </div>
      </div>
      
    </div>
  );
};

export default PageBlog;
