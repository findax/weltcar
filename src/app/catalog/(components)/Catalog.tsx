'use client';

// import __CarList from '@/mock/__carList.json';
import { useState, useEffect } from 'react';
import Filters from './Filters';
import SortPanel from './SortPanel';
import CarList from './CarList';
import ErrorComponent from '@/components/ErrorComponent';
import SideMenuWrapper from '@/shared/SideMenuWrapper';
import { getCarsList } from '@/api/cars';
import { ICatalog, ICatalogQueryParams } from '@/types/catalog';
import { getSearchParamsUrl, updateSearchParam } from '@/utils/catalog';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Catalog({
  carListData,
}: {
  carListData: ICatalog | undefined;
}) {
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isGrid, setIsGrid] = useState(true);
  const [isFiltersVisible, setFiltersVisible] = useState(false);

  const searchParams = useSearchParams();
  const page = searchParams.get('page');

  const [currentPage, setCurrentPage] = useState(+(page || 1));
  const [queryParams, setQueryParams] = useState<ICatalogQueryParams>({});
  const [checkedFiltersCount, setCheckedFiltersCount] = useState(0);
  const pathname = usePathname();

  const [catalogData, setCatalogData] = useState(carListData);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () =>
      window.innerWidth < 1024 ? setIsMobile(true) : setIsMobile(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    carListData && setIsFirstLoading(false);
  }, []);

  useEffect(() => {
    if (isFirstLoading) return;
    setIsLoading(true);
    const urlParams = getSearchParamsUrl();
    urlParams.delete('page');
    getCarsList(currentPage, 10, queryParams)
      .then((data) => {
        if (data) {
          setCatalogData(data as ICatalog);
        } else {
          setIsError(true);
        }
      })
      .finally(() => setIsLoading(false));
  }, [currentPage, queryParams]);

  const handleSortChange = (id: string) => {
    let newQueryParams = { ...queryParams };
    newQueryParams.sort = [{ id }];

    setQueryParams(newQueryParams);
    updateSearchParam('page', 1, pathname);
    setCurrentPage(1);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    window.scrollTo({ top: 0 });
    updateSearchParam('page', selected + 1, pathname);
    setCurrentPage(selected + 1);
  };

  const handleSearchQuery = (value: string) => {
    let newQueryParams: { search?: string } = {};
    newQueryParams.search = value;
    setQueryParams(newQueryParams);
    document
      .querySelectorAll('input[type=checkbox]')
      .forEach((el) => ((el as HTMLInputElement).checked = false));
    setCheckedFiltersCount(0);
    updateSearchParam('page', 1, pathname);
    setCurrentPage(1);
    isFiltersVisible && setFiltersVisible(false);
  };

  const handleFilterChange = (filterCategory: string, id: number | string) => {
    let newQueryParams = { ...queryParams };
    delete newQueryParams.search;

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
    getCheckedFiltersCount(newQueryParams);

    updateSearchParam('page', 1, pathname);
    setCurrentPage(1);
    isFiltersVisible && setFiltersVisible(false);
  };

  const handleRangeFilterChange = (
    filterCategory: string,
    min: string | number,
    max: string | number
  ) => {
    let newQueryParams = { ...queryParams };

    if (newQueryParams.filters) {
      let isCategoryExist = newQueryParams.filters.findIndex(
        (item) => item.id === filterCategory
      );
      if (isCategoryExist === -1) {
        newQueryParams.filters.push({ id: filterCategory, values: [min, max] });
      } else {
        (newQueryParams.filters as {}) = newQueryParams.filters.map(
          (filter: { id: string | number; values: (string | number)[] }) => {
            if (filter.id === filterCategory) {
              filter.values = [min, max];
            }
            return filter;
          }
        );
      }
      setQueryParams(newQueryParams);
    } else {
      newQueryParams.filters = [{ id: filterCategory, values: [min, max] }];
      setQueryParams(newQueryParams);
    }
    getCheckedFiltersCount(newQueryParams);

    updateSearchParam('page', 1, pathname);
    setCurrentPage(1);
    isFiltersVisible && setFiltersVisible(false);
  };

  const resetRangeFilter = (filterCategory: string) => {
    let newQueryParams = { ...queryParams };

    newQueryParams.filters = newQueryParams.filters?.filter(
      (item) => item.id !== filterCategory
    );
    setQueryParams(newQueryParams);
    getCheckedFiltersCount(newQueryParams);
    updateSearchParam('page', 1, pathname);
    setCurrentPage(1);
    isFiltersVisible && setFiltersVisible(false);
  };

  const resetQueryParams = () => {
    document
      .querySelectorAll('input[type=checkbox]')
      .forEach((el) => ((el as HTMLInputElement).checked = false));
    setQueryParams({});
    setCheckedFiltersCount(0);
    updateSearchParam('page', 1, pathname);
    setCurrentPage(1);
    isFiltersVisible && setFiltersVisible(false);
  };

  function getCheckedFiltersCount(queryParams: ICatalogQueryParams) {
    if (queryParams.filters) {
      const checkedFilters = queryParams.filters.reduce(
        (sum, { id, values }) => {
          if (id === 'year' || id === 'price') {
            return sum + 1;
          } else {
            return sum + values.length;
          }
        },
        0
      );
      setCheckedFiltersCount(checkedFilters);
    }
  }

  const handleCloseFiltersMenu = () => setFiltersVisible(false);

  return isError ? (
    <div className='h-[calc(100vh-76px)] flex justify-center items-center'>
      <ErrorComponent />
    </div>
  ) : (
    <div className='relative container'>
      <div className='grid grid-cols-12 gap-4 lg:gap-6 pt-6'>
        <div className='hidden lg:block lg:col-span-4'>
          {isMobile ? (
            <SideMenuWrapper
              handleCloseMenu={handleCloseFiltersMenu}
              isVisable={isFiltersVisible}
              isLeftSide
            >
              <Filters
                filtersData={catalogData?.filters || []}
                closeFilters={setFiltersVisible}
                checkedFiltersCount={checkedFiltersCount}
                handleSearchQuery={handleSearchQuery}
                handleFilterChange={handleFilterChange}
                handleRangeFilterChange={handleRangeFilterChange}
                resetRangeFilter={resetRangeFilter}
                resetQueryParams={resetQueryParams}
              />
            </SideMenuWrapper>
          ) : (
            <Filters
              filtersData={catalogData?.filters || []}
              closeFilters={setFiltersVisible}
              checkedFiltersCount={checkedFiltersCount}
              handleSearchQuery={handleSearchQuery}
              handleFilterChange={handleFilterChange}
              handleRangeFilterChange={handleRangeFilterChange}
              resetRangeFilter={resetRangeFilter}
              resetQueryParams={resetQueryParams}
            />
          )}
        </div>
        <div className='col-span-12 lg:col-span-8'>
          <SortPanel
            sortData={catalogData?.sort || []}
            results={catalogData?.meta.total || 0}
            isGrid={isGrid}
            checkedFiltersCount={checkedFiltersCount}
            handleIsGrid={setIsGrid}
            openFilter={setFiltersVisible}
            handleSortChange={handleSortChange}
          />
          <CarList
            carListData={catalogData?.data || []}
            isLoading={isLoading}
            isGrid={isGrid}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            results={catalogData?.meta.total || 0}
          />
        </div>
      </div>
    </div>
  );
}
