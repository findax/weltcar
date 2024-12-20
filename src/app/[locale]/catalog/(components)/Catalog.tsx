'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '@/shared/LoadingSpinner';
import ErrorComponent from '@/components/ErrorComponent';
import SideMenuWrapper from '@/shared/SideMenuWrapper';
import { getCarsList } from '@/api/cars';
import { ICatalog, ICatalogQueryParams } from '@/types/catalog';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useQueryStore } from '@/stores/query-store';
import FiltersCatalog from '@/components/catalogs/FiltersCatalog';
import SortPanelCatalog from '@/components/catalogs/SortPanelCatalog';
import CarListCatalog from '@/components/catalogs/CarListCatalog';
import { useLocale, useTranslations } from 'next-intl';

export default function Catalog() {
  const [isFirstLoading, setFirstLoading] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isGrid, setGrid] = useState(true);
  const isMobile = useMediaQuery(1024);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [catalogData, setCatalogData] = useState({} as ICatalog);

  const translate = useTranslations();
  const locale = useLocale();
  const queryState = useQueryStore((state) => state.query);
  const { queryParams, currentPage, isFiltersVisible, setFiltersVisible } =
    useQueryParams();

  useEffect(() => {
    const query = isFirstLoading ? queryParams : queryState;
    setLoading(true);
    getCarsList(currentPage, 10, locale, query as ICatalogQueryParams)
      .then((data) => {
        if (data) {
          setCatalogData(data as ICatalog);
          getActiveFiltersCount(query as ICatalogQueryParams);
        } else {
          setError(true);
        }
      })
      .finally(() => {
        setLoading(false);
        isFirstLoading && setFirstLoading(false);
      });
  }, [currentPage, queryState]);

  function getActiveFiltersCount(queryParams: ICatalogQueryParams) {
    if (queryParams?.filters) {
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
      setActiveFiltersCount(checkedFilters);
    } else {
      setActiveFiltersCount(0);
    }
  }

  const handleCloseFiltersMenu = () => setFiltersVisible(false);

  return isFirstLoading ? (
    <div className='h-[calc(100vh-76px)] flex justify-center items-center'>
      <div className='-mt-[76px]'>
        <LoadingSpinner className='w-12' />
      </div>
    </div>
  ) : isError ? (
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
              <FiltersCatalog
                filtersData={catalogData?.filters || []}
                closeFilters={setFiltersVisible}
                activeFiltersCount={activeFiltersCount}
                translate={translate}
              />
            </SideMenuWrapper>
          ) : (
            <FiltersCatalog
              filtersData={catalogData?.filters || []}
              closeFilters={setFiltersVisible}
              activeFiltersCount={activeFiltersCount}
              translate={translate}
            />
          )}
        </div>
        <div className='col-span-12 lg:col-span-8'>
          <SortPanelCatalog
            sortData={catalogData?.sort || []}
            results={catalogData?.meta.total || 0}
            isGrid={isGrid}
            activeFiltersCount={activeFiltersCount}
            handleIsGrid={setGrid}
            openFilter={setFiltersVisible}
            translate={translate}
          />
          <CarListCatalog
            carListData={catalogData?.data || []}
            isLoading={isLoading}
            isGrid={isGrid}
            results={catalogData?.meta.total || 0}
            translate={translate}
          />
        </div>
      </div>
    </div>
  );
}
