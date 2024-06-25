import { useState } from 'react';
import { useQueryState, parseAsJson, parseAsInteger } from 'nuqs';
import { ICatalogQueryParams } from '@/types/catalog';
import { useQueryStore } from '@/stores/query-store';

export const useQueryParams = () => {
  const [isFiltersVisible, setFiltersVisible] = useState(false);
  const [currentPage, setPageParam] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  );
  const [queryParams, setQueryParams] = useQueryState<ICatalogQueryParams>(
    'query',
    parseAsJson()
  );

  const queryState = useQueryStore((state) => state.query);
  const updateQueryState = useQueryStore((state) => state.updateQueryState);

  const handleSortChange = (id: string) => {
    let newQueryState = { ...queryState };
    id === 'latest'
      ? delete newQueryState.sort
      : (newQueryState.sort = [{ id }]);
    updateParams(newQueryState);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    queryParams !== queryState && updateQueryState(queryParams);
    const page = selected + 1 === 1 ? null : selected + 1;
    window.scrollTo({ top: 0 });
    setPageParam(page);
  };

  const handleSearchChange = (value: string) => {
    let newQueryState = { ...queryParams };
    delete newQueryState.filters;
    newQueryState.search = value;
    document
      .querySelectorAll('input[type=checkbox]')
      .forEach((el) => ((el as HTMLInputElement).checked = false));
    updateParams(newQueryState);
  };

  const handleFilterChange = (filterCategory: string, id: number | string) => {
    let newQueryState = { ...queryParams };
    delete newQueryState.search;

    if (newQueryState?.filters) {
      let isCategoryExist = newQueryState.filters.findIndex(
        (item) => item.id === filterCategory
      );
      if (isCategoryExist === -1) {
        newQueryState.filters.push({ id: filterCategory, values: [id] });
      } else {
        (newQueryState.filters as {}) = newQueryState.filters.map(
          (filter: { id: string | number; values: (string | number)[] }) => {
            if (filter.id === filterCategory) {
              filter.values = filter.values.includes(id)
                ? filter.values.filter((value: string | number) => value !== id)
                : [...filter.values, id];
            }
            return filter;
          }
        );

        newQueryState.filters = newQueryState.filters.filter(
          (item) => item.values.length > 0
        );
      }
      updateParams(newQueryState);
    } else {
      newQueryState.filters = [{ id: filterCategory, values: [id] }];
      updateParams(newQueryState);
    }
  };

  const resetFilters = (searchQuery?: boolean) => {
    let newQueryState = { ...queryParams };
    delete newQueryState.filters;
    searchQuery && delete newQueryState.search;
    window.scrollTo({ top: 0 });
    document
      .querySelectorAll('input[type=checkbox]')
      .forEach((el) => ((el as HTMLInputElement).checked = false));
    updateParams(newQueryState);
  };

  const handleRangeFilterChange = (
    filterCategory: string,
    min: string | number,
    max: string | number
  ) => {
    let newQueryState = { ...queryParams };

    if (newQueryState.filters) {
      let isCategoryExist = newQueryState.filters.findIndex(
        (item) => item.id === filterCategory
      );
      if (isCategoryExist === -1) {
        newQueryState.filters.push({ id: filterCategory, values: [min, max] });
      } else {
        (newQueryState.filters as {}) = newQueryState.filters.map(
          (filter: { id: string | number; values: (string | number)[] }) => {
            if (filter.id === filterCategory) {
              filter.values = [min, max];
            }
            return filter;
          }
        );
      }
      updateParams(newQueryState);
    } else {
      newQueryState.filters = [{ id: filterCategory, values: [min, max] }];
      updateParams(newQueryState);
    }
  };

  const resetRangeFilter = (filterCategory: string) => {
    let newQueryState = { ...queryParams };
    newQueryState.filters = newQueryState.filters?.filter(
      (item) => item.id !== filterCategory
    );
    updateParams(newQueryState);
  };

  function updateParams(newQueryState: ICatalogQueryParams) {
    const updateQueryParams = (query: ICatalogQueryParams) => {
      function isEmpty(obj: object) {
        for (const prop in obj) {
          if (Object.hasOwn(obj, prop)) {
            return false;
          }
        }

        return true;
      }

      isEmpty(query) ? setQueryParams(null) : setQueryParams(query);
    };
    if (newQueryState.filters?.length === 0) delete newQueryState.filters;

    updateQueryParams(newQueryState);
    updateQueryState(newQueryState);
    setPageParam(null);
    isFiltersVisible && setFiltersVisible(false);
  }

  return {
    queryParams,
    currentPage,
    handleSortChange,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleRangeFilterChange,
    resetRangeFilter,
    resetFilters,
    isFiltersVisible,
    setFiltersVisible,
  };
};
