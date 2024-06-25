import { create } from 'zustand';
import { ICatalogQueryParams } from '@/types/catalog';

export interface QueryState {
  query: ICatalogQueryParams | null;
}

export type QueryActions = {
  updateQueryState: (newQuery: ICatalogQueryParams | null) => void;
};

export const useQueryStore = create<QueryState & QueryActions>()((set) => ({
  query: null,
  updateQueryState: (newQuery: ICatalogQueryParams | null) =>
    set({ query: newQuery }),
}));
