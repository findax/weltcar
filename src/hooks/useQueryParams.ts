import { useState, useEffect } from 'react';
import { ICatalogQueryParams } from '@/types/catalog';
import { useQueryStore } from '@/stores/query-store';
import { useQueryState, parseAsInteger } from 'nuqs';

function buildReadableQuery(query: ICatalogQueryParams): string {
  const params: string[] = [];

  if (query.filters && Array.isArray(query.filters)) {
    query.filters.forEach((filter) => {
      // Например brands=8 или brands=8,4
      params.push(`${filter.id}=${filter.values.join(',')}`);
    });
  }
  if (query.search) {
    params.push(`search=${query.search}`);
  }
  if (query.sort) {
    params.push(`sort=${query.sort.map((item) => item.id).join(',')}`);
  }
  // Не добавляем page в сам queryParams
  return params.length ? '?' + params.join('&') : '';
}

function parseReadableQuery(search: string): ICatalogQueryParams {
  const params = new URLSearchParams(search);
  let query: ICatalogQueryParams = {};

  // Старый формат (query=...)
  if (params.has('query')) {
    try {
      query = JSON.parse(decodeURIComponent(params.get('query')!));
      return query;
    } catch (e) {
      console.error('Ошибка парсинга старого формата query:', e);
    }
  }

  // Новый формат
  for (const key of params.keys()) {
    // Явно пропускаем page:
    if (key === 'page') {
      continue;
    }
    if (key === 'search') {
      query.search = params.get('search')!;
    } else if (key === 'sort') {
      query.sort = params
        .get('sort')!
        .split(',')
        .map((id) => ({ id }));
    } else {
      // Остальные ключи = фильтры
      const value = params.get(key)!;
      const values = value.split(',').map((item) => {
        const num = Number(item);
        return isNaN(num) ? item : num;
      });
      if (!query.filters) {
        query.filters = [];
      }
      query.filters.push({ id: key, values });
    }
  }
  return query;
}

export const useQueryParams = () => {
  const initialQuery =
    typeof window !== 'undefined'
      ? parseReadableQuery(window.location.search)
      : ({} as ICatalogQueryParams);

  const [queryParams, setQueryParams] = useState<ICatalogQueryParams>(initialQuery);

  // currentPage хранится отдельно, через nuqs
  const [currentPage, setPageParam] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  );

  const queryState = useQueryStore((state) => state.query);
  const updateQueryState = useQueryStore((state) => state.updateQueryState);
  const [isFiltersVisible, setFiltersVisible] = useState(false);

  // В этом useEffect мы собираем финальный URL:
  //  1) С помощью buildReadableQuery(queryParams) добавляем все фильтры/поиск/sort
  //  2) Если currentPage > 1 (или другое условие), добавляем &page=...
  //  3) Делаем replaceState
  useEffect(() => {
    if (typeof window === 'undefined') return;
  
    // Стартуем с pathname, без query
    let baseUrl = window.location.pathname;
  
    // Формируем query-строку (она может быть пустой)
    let queryString = buildReadableQuery(queryParams);
  
    // Добавляем &page=..., если текущая страница не 1
    if (currentPage !== 1) {
      const joiner = queryString.includes('?') ? '&' : '?';
      queryString += `${joiner}page=${currentPage}`;
    }
  
    // Если queryString в итоге осталась пустой, replaceState убирает вообще все параметры
    window.history.replaceState(null, '', baseUrl + queryString);
  }, [queryParams]);
  

  function updateParams(newQueryState: ICatalogQueryParams) {
    // Удаляем пустые filters
    if (newQueryState.filters && newQueryState.filters.length === 0) {
      delete newQueryState.filters;
    }
    setQueryParams(newQueryState);
    updateQueryState(newQueryState);

    // При изменении фильтров или сортировки сбрасываем страницу
    setPageParam(1);

    if (isFiltersVisible) setFiltersVisible(false);
  }

  const handleSortChange = (id: string) => {
    const newQueryState = { ...queryState };
    if (id === 'latest') {
      delete newQueryState.sort;
    } else {
      newQueryState.sort = [{ id }];
    }
    updateParams(newQueryState);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    const page = selected + 1;
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0 });
    }
    setPageParam(page);
  };

  const handleSearchChange = (value: string) => {
    const newQueryState = { ...queryParams };
    delete newQueryState.filters;
    newQueryState.search = value;
    if (typeof document !== 'undefined') {
      document
        .querySelectorAll('input[type=checkbox]')
        .forEach((el) => ((el as HTMLInputElement).checked = false));
    }
    updateParams(newQueryState);
  };

  const handleFilterChange = (filterCategory: string, value: number | string) => {
    const newQueryState = { ...queryParams };
    delete newQueryState.search;

    if (!newQueryState.filters) {
      newQueryState.filters = [{ id: filterCategory, values: [value] }];
    } else {
      const idx = newQueryState.filters.findIndex((f) => f.id === filterCategory);
      if (idx === -1) {
        newQueryState.filters.push({ id: filterCategory, values: [value] });
      } else {
        newQueryState.filters[idx].values = newQueryState.filters[idx].values.includes(value)
          ? newQueryState.filters[idx].values.filter((val) => val !== value)
          : [...newQueryState.filters[idx].values, value];

        // Удаляем фильтр, если значения пустые
        newQueryState.filters = newQueryState.filters.filter(
          (f) => f.values.length > 0
        );
      }
    }
    updateParams(newQueryState);
  };

  const handleRangeFilterChange = (
    filterCategory: string,
    min: number | string,
    max: number | string
  ) => {
    const newQueryState = { ...queryParams };

    if (!newQueryState.filters) {
      newQueryState.filters = [{ id: filterCategory, values: [min, max] }];
    } else {
      const idx = newQueryState.filters.findIndex((f) => f.id === filterCategory);
      if (idx === -1) {
        newQueryState.filters.push({ id: filterCategory, values: [min, max] });
      } else {
        newQueryState.filters[idx].values = [min, max];
      }
    }
    updateParams(newQueryState);
  };

  const resetRangeFilter = (filterCategory: string) => {
    const newQueryState = { ...queryParams };
    if (newQueryState.filters) {
      newQueryState.filters = newQueryState.filters.filter(
        (f) => f.id !== filterCategory
      );
      if (!newQueryState.filters.length) {
        delete newQueryState.filters;
      }
    }
    updateParams(newQueryState);
  };

  const resetFilters = (clearSearch?: boolean) => {
    const newQueryState = { ...queryParams };
    delete newQueryState.filters;
    if (clearSearch) {
      delete newQueryState.search;
    }
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