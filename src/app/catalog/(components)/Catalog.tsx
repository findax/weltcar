'use client';

// import __CarList from '@/mock/__carList.json';
import { useState, useEffect } from 'react';
import Filters from './Filters';
import SortPanel from './SortPanel';
import CarList from './CarList';
import LoadingSpinner from '@/shared/LoadingSpinner';
import SideMenuWrapper from '@/shared/SideMenuWrapper';
import { getCarsList } from '@/api/cars';
import { ICatalog } from '@/types/catalog';
import { getSearchParamsUrl, updateSearchParam } from '@/utils/catalog';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Catalog() {
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isGrid, setIsGrid] = useState(true);
  const [isFiltersVisible, setFiltersVisible] = useState(false);

  const searchParams = useSearchParams();
  const page = searchParams.get('page');

  const [currentPage, setCurrentPage] = useState(+(page || 0));
  const pathname = usePathname();

  const [state, setState] = useState<ICatalog | undefined>();

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () =>
      window.innerWidth < 1024 ? setIsMobile(true) : setIsMobile(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsFirstLoading(true);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const urlParams = getSearchParamsUrl();
    urlParams.delete('page');
    getCarsList(currentPage + 1, urlParams.toString())
      .then((data) => setState(data as ICatalog))
      .finally(() => {
        setIsLoading(false);
        isFirstLoading && setIsFirstLoading(false);
      });
  }, [currentPage]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    window.scrollTo({ top: 0 });
    updateSearchParam('page', selected, pathname);
    setCurrentPage(selected);
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
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              results={state?.meta.total || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
