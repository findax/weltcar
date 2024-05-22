'use client';

// import __CarList from '@/mock/__carList.json';
import { useState, useEffect } from 'react';
import Filters from './Filters';
import SortPanel from './SortPanel';
import CarList from './CarList';
import LoadingSpinner from '@/shared/LoadingSpinner';
import SideMenuWrapper from '@/shared/SideMenuWrapper';
import { getCarsList } from '@/api/cars';
import { ICatalog, ICatalogQueryParams } from '@/types/catalog';
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

  const [currentPage, setCurrentPage] = useState(+(page || 1));
  const [queryParams, setQueryParams] = useState<ICatalogQueryParams>({});
  const [checkedFiltersCount, setCheckedFiltersCount] = useState(0);
  const pathname = usePathname();

  const [catalogData, setCatalogData] = useState<ICatalog | undefined>(
    undefined
  );

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
    getCarsList(currentPage, 10, queryParams)
      .then((data) => setCatalogData(data as ICatalog))
      .finally(() => {
        setIsLoading(false);
        isFirstLoading && setIsFirstLoading(false);
      });
  }, [currentPage, queryParams]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    window.scrollTo({ top: 0 });
    updateSearchParam('page', selected + 1, pathname);
    setCurrentPage(selected + 1);
  };

  const handleFilterChange = (filterCategory: string, id: number | string) => {
    let newQueryParams = { ...queryParams };

    if (newQueryParams.filters) {
      let isCategoryExist = newQueryParams.filters.findIndex(
        (item) => item.id === filterCategory
      );
      if (isCategoryExist === -1) {
        newQueryParams.filters.push({ id: filterCategory, values: [id] });
      } else {
        (newQueryParams.filters as {}) = newQueryParams.filters.map(
          (filter: { id: string | number; values: (string | number)[] }) => {
            if (filter.id === filterCategory) {
              filter.values = filter.values.includes(id)
                ? filter.values.filter((value: string | number) => value !== id)
                : [...filter.values, id];
            }
            return filter;
          }
        );

        newQueryParams.filters = newQueryParams.filters.filter(
          (item) => item.values.length > 0
        );
      }
      setQueryParams(newQueryParams);
    } else {
      newQueryParams.filters = [{ id: filterCategory, values: [id] }];
      setQueryParams(newQueryParams);
    }
    const checkedFilters = newQueryParams.filters.reduce(
      (sum, { values }) => sum + values.length,
      0
    );
    setCheckedFiltersCount(checkedFilters);

    updateSearchParam('page', 1, pathname);
    setCurrentPage(1);
  };

  const resetQueryParams = () => {
    document
      .querySelectorAll('input[type=checkbox]')
      .forEach((el) => ((el as HTMLInputElement).checked = false));
    setQueryParams({});
    setCheckedFiltersCount(0);
    updateSearchParam('page', 1, pathname);
    setCurrentPage(1);
  };

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
                  filtersState={catalogData?.filters || []}
                  closeFilters={setFiltersVisible}
                  checkedFiltersCount={checkedFiltersCount}
                  handleFilterChange={handleFilterChange}
                  resetQueryParams={resetQueryParams}
                />
              </SideMenuWrapper>
            ) : (
              <Filters
                filtersState={catalogData?.filters || []}
                closeFilters={setFiltersVisible}
                checkedFiltersCount={checkedFiltersCount}
                handleFilterChange={handleFilterChange}
                resetQueryParams={resetQueryParams}
              />
            )}
          </div>
          <div className='col-span-12 lg:col-span-8'>
            <SortPanel
              sortState={catalogData?.sort || []}
              results={catalogData?.meta.total || 0}
              handleIsGrid={setIsGrid}
              isGrid={isGrid}
              openFilter={setFiltersVisible}
            />
            <CarList
              carListState={catalogData?.data || []}
              isLoading={isLoading}
              isGrid={isGrid}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              results={catalogData?.meta.total || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
