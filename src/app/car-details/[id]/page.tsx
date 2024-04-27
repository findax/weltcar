'use client';

import ImagesHeader from './(components)/ImagesHeader';
import { DEMO_CAR_IMAGES_GALLERY } from '@/data/carimagesgallery';
import Documents from './(components)/Documents';
import CarDescriptions from './(components)/CarDescriptions';
import PriceSidebar from './(components)/PriceSidebar';
import MobileFooterSticky from './(components)/MobileFooterSticky';

const CarDetailsPage = () => {
  return (
    <div className='CarDetailsPage'>
      <div className='container CarDetailsPage__content'>
        <div className={` nc-CarDetailsPage `}>
          <ImagesHeader images={DEMO_CAR_IMAGES_GALLERY} />

          <main className=' relative z-10 my-11 flex flex-col lg:flex-row '>
            <div className='w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10'>
              <Documents />
              <CarDescriptions />
            </div>

            <PriceSidebar />
          </main>
        </div>
      </div>

      <MobileFooterSticky />
    </div>
  );
};

export default CarDetailsPage;
