import { useState, useEffect } from 'react';
import { ICatalogQueryParams } from '@/types/catalog';
import { useQueryStore } from '@/stores/query-store';

// Функция для формирования читаемой строки из объекта запроса
function buildReadableQuery(query: ICatalogQueryParams): string {
  const params = [];

  if (query.filters && Array.isArray(query.filters)) {
    query.filters.forEach((filter) => {
      // Например, преобразуем фильтр в строку brands=8 или brands=8,9 (если значений несколько)
      params.push(`${filter.id}=${filter.values.join(',')}`);
    });
  }

  if (query.search) {
    params.push(`search=${query.search}`);
  }

  if (query.sort) {
    params.push(`sort=${query.sort.map((item) => item.id).join(',')}`);
  }

  return '?' + params.join('&');
}

// Функция для парсинга читаемого URL в объект запроса
function parseReadableQuery(search: string): ICatalogQueryParams {
  const params = new URLSearchParams(search);
  const query: ICatalogQueryParams = {};

  if (params.has('brands')) {
    query.filters = [{ id: 'brands', values: [Number(params.get('brands'))] }];
  }

  if (params.has('search')) {
    query.search = params.get('search')!;
  }

  if (params.has('sort')) {
    query.sort = params.get('sort')!.split(',').map((id) => ({ id }));
  }

  return query;
}

export const useQueryParams = () => {
  // Инициализируем состояние запроса, парся URL только на клиенте
  const initialQuery =
    typeof window !== 'undefined'
      ? parseReadableQuery(window.location.search)
      : ({} as ICatalogQueryParams);
  const [queryParams, setQueryParams] = useState<ICatalogQueryParams>(initialQuery);
  const [currentPage, setPageParam] = useState<number | null>(1);

  const queryState = useQueryStore((state) => state.query);
  const updateQueryState = useQueryStore((state) => state.updateQueryState);
  const [isFiltersVisible, setFiltersVisible] = useState(false);

  // Обновление URL происходит только на клиенте
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const readableUrl = buildReadableQuery(queryParams);
      window.history.replaceState(null, '', readableUrl);
    }
  }, [queryParams]);

  // Функция обновления состояния запроса
  function updateParams(newQueryState: ICatalogQueryParams) {
    if (newQueryState.filters && newQueryState.filters.length === 0) {
      delete newQueryState.filters;
    }
    setQueryParams(newQueryState);
    updateQueryState(newQueryState);
    setPageParam(null);
    if (isFiltersVisible) setFiltersVisible(false);

    // Обновляем URL, если window доступен
    if (typeof window !== 'undefined') {
      const readableUrl = buildReadableQuery(newQueryState);
      window.history.replaceState(null, '', readableUrl);
    }
  }

  const handleSortChange = (id: string) => {
    let newQueryState = { ...queryState };
    if (id === 'latest') {
      delete newQueryState.sort;
    } else {
      newQueryState.sort = [{ id }];
    }
    updateParams(newQueryState);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    if (queryParams !== queryState) {
      updateQueryState(queryParams);
    }
    const page = selected + 1 === 1 ? null : selected + 1;
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0 });
    }
    setPageParam(page);
  };

  const handleSearchChange = (value: string) => {
    let newQueryState = { ...queryParams };
    delete newQueryState.filters;
    newQueryState.search = value;
    if (typeof document !== 'undefined') {
      document
        .querySelectorAll('input[type=checkbox]')
        .forEach((el) => ((el as HTMLInputElement).checked = false));
    }
    updateParams(newQueryState);
  };

  const handleFilterChange = (filterCategory: string, id: number | string) => {
    let newQueryState = { ...queryParams };
    delete newQueryState.search;

    if (newQueryState.filters) {
      const index = newQueryState.filters.findIndex(
        (item) => item.id === filterCategory
      );
      if (index === -1) {
        newQueryState.filters.push({ id: filterCategory, values: [id] });
      } else {
        newQueryState.filters = newQueryState.filters
          .map((filter) => {
            if (filter.id === filterCategory) {
              filter.values = filter.values.includes(id)
                ? filter.values.filter((value) => value !== id)
                : [...filter.values, id];
            }
            return filter;
          })
          .filter((item) => item.values.length > 0);
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
    if (searchQuery) delete newQueryState.search;
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0 });
    }
    if (typeof document !== 'undefined') {
      document
        .querySelectorAll('input[type=checkbox]')
        .forEach((el) => ((el as HTMLInputElement).checked = false));
    }
    updateParams(newQueryState);
  };

  const handleRangeFilterChange = (
    filterCategory: string,
    min: string | number,
    max: string | number
  ) => {
    let newQueryState = { ...queryParams };

    if (newQueryState.filters) {
      const index = newQueryState.filters.findIndex(
        (item) => item.id === filterCategory
      );
      if (index === -1) {
        newQueryState.filters.push({ id: filterCategory, values: [min, max] });
      } else {
        newQueryState.filters = newQueryState.filters.map((filter) => {
          if (filter.id === filterCategory) {
            filter.values = [min, max];
          }
          return filter;
        });
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

export default useQueryParams;
