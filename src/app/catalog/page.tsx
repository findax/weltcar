'use client';

// import __CarList from '@/mock/__carList.json';
import { useState, useEffect } from 'react';
import Filters from './(components)/Filters';
import SortPanel from './(components)/SortPanel';
import CarList from './(components)/CarList';
import LoadingSpinner from '@/shared/LoadingSpinner';
import SideMenuWrapper from '@/shared/SideMenuWrapper';
import { toast } from 'react-toastify';

import { getCarsListFx } from '@/app/api/cars';

const CarListPage = () => {
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isGrid, setIsGrid] = useState(true);
  const [isFiltersVisible, setFiltersVisible] = useState(false);

  const [carsData, setCarsData] = useState([]);
  const [filtersState, setFiltersState] = useState([]);

  // useEffect(() => {
  //   if (!isFirstLoading) {
  //     setIsLoading(true);
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 2000);
  //   }
  // }, [isGrid]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () =>
      window.innerWidth < 1024 ? setIsMobile(true) : setIsMobile(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    isFirstLoading && setIsFirstLoading(false);

    loadCarsList();
  }, []);

  const loadCarsList = async () => {
    try {
      setIsLoading(true);
      const data = await getCarsListFx('/api/cars/list');

      setCarsData(data.data);
      setFiltersState(data.filters);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenMenu = () => setFiltersVisible(true);
  const handleCloseMenu = () => setFiltersVisible(false);

  return isFirstLoading ? (
    <div className='w-full h-[calc(100vh-76px)] flex justify-center items-center'>
      <LoadingSpinner className='w-12' />
    </div>
  ) : (
    <div className='relative overflow-hidden'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-4 lg:gap-6 pt-6'>
          <div className='hidden lg:block lg:col-span-4'>
            {isMobile ? (
              <SideMenuWrapper
                handleCloseMenu={handleCloseMenu}
                isVisable={isFiltersVisible}
                isLeftSide
              >
                <Filters
                  filtersState={filtersState}
                  closeFilters={setFiltersVisible}
                />
              </SideMenuWrapper>
            ) : (
              <Filters
                filtersState={filtersState}
                closeFilters={setFiltersVisible}
              />
            )}
          </div>
          <div className='col-span-12 lg:col-span-8'>
            <SortPanel
              handleIsGrid={setIsGrid}
              isGrid={isGrid}
              openFilter={setFiltersVisible}
            />
            <CarList
              carsData={carsData}
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
