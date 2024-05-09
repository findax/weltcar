'use client';

import { useState, useEffect } from 'react';
import { DEMO_CAR_LIST } from '@/data/carlist';
import Filter from './(components)/Filter';
import SortPanel from './(components)/SortPanel';
import CarList from './(components)/CarList';
import LoadingSpinner from '@/shared/LoadingSpinner';
import SideMenuWrapper from '@/shared/SideMenuWrapper';

const CarListPage = () => {
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isGrid, setIsGrid] = useState(true);
  const [isFilterVisible, setFilterVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isGrid]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () =>
      window.innerWidth < 1024 ? setIsMobile(true) : setIsMobile(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpenMenu = () => setFilterVisible(true);
  const handleCloseMenu = () => setFilterVisible(false);

  return isFirstLoading ? (
    <div className='w-full h-[calc(100vh-76px)] flex justify-center items-center'>
      <LoadingSpinner className='w-12' />
    </div>
  ) : (
    <div className='relative overflow-hidden'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-4 lg:gap-6 md:pt-6'>
          <div className='hidden lg:block lg:col-span-4'>
            {isMobile ? (
              <SideMenuWrapper
                handleCloseMenu={handleCloseMenu}
                isVisable={isFilterVisible}
                isLeftSide
              >
                <Filter closeFilter={setFilterVisible} />
              </SideMenuWrapper>
            ) : (
              <Filter closeFilter={setFilterVisible} />
            )}
          </div>
          <div className='col-span-12 lg:col-span-8'>
            <SortPanel
              handleIsGrid={setIsGrid}
              isGrid={isGrid}
              openFilter={setFilterVisible}
            />
            <CarList
              CarList={DEMO_CAR_LIST}
              isLoading={isLoading}
              isGrid={isGrid}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListPage;
