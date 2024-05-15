'use client';

// import __CarList from '@/mock/__carList.json';
import { useState, useEffect } from 'react';
import Filters from './(components)/Filters';
import SortPanel from './(components)/SortPanel';
import CarList from './(components)/CarList';
import LoadingSpinner from '@/shared/LoadingSpinner';
import SideMenuWrapper from '@/shared/SideMenuWrapper';
import { toast } from 'react-toastify';

import { getCarsList } from '@/api/cars';
import { ICatalog } from '@/types/catalog';

const CarListPage = () => {
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isGrid, setIsGrid] = useState(true);
  const [isFiltersVisible, setFiltersVisible] = useState(false);

  const [state, setState] = useState<ICatalog | undefined>();

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
    setIsFirstLoading(true);
    loadCarsList();
  }, []);

  const loadCarsList = async () => {
    try {
      setIsLoading(true);
      const data = await getCarsList('');

      setState(data);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
      isFirstLoading && setIsFirstLoading(false);
    }
  };

  const handleOpenFiltersMenu = () => setFiltersVisible(true);
  const handleCloseFiltersMenu = () => setFiltersVisible(false);

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
                handleCloseMenu={handleCloseFiltersMenu}
                isVisable={isFiltersVisible}
                isLeftSide
              >
                <Filters
                  filtersState={state?.filters || []}
                  closeFilters={setFiltersVisible}
                />
              </SideMenuWrapper>
            ) : (
              <Filters
                filtersState={state?.filters || []}
                closeFilters={setFiltersVisible}
              />
            )}
          </div>
          <div className='col-span-12 lg:col-span-8'>
            <SortPanel
              sortState={state?.sort || []}
              results={state?.meta.total || 0}
              handleIsGrid={setIsGrid}
              isGrid={isGrid}
              openFilter={setFiltersVisible}
            />
            <CarList
              carListState={state?.data || []}
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
