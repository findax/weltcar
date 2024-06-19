'use client';

import RangeSlider from '@/components/RangeSlider';
import AccordionComponent from '@/components/AccordionComponent';
import { ButtonPrimary } from '@/shared/Buttons';
import { Checkbox } from '@/shared/FormInputs';
import { ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/outline';
import SearchForm from './SearchForm';
import { IFilters } from '@/types/catalog';

const Filters = ({
  filtersData,
  closeFilters,
  checkedFiltersCount,
  handleSearchQuery,
  handleFilterChange,
  handleRangeFilterChange,
  resetRangeFilter,
  resetQueryParams,
}: {
  filtersData: IFilters[];
  closeFilters: (value: boolean) => void;
  checkedFiltersCount: number;
  handleSearchQuery: (value: string) => void;
  handleFilterChange: (filterCategory: string, id: number | string) => void;
  handleRangeFilterChange: (
    filterCategory: string,
    min: number,
    max: number
  ) => void;
  resetRangeFilter: (filterCategory: string) => void;
  resetQueryParams: () => void;
}) => {
  return (
    <div className='max-lg:overflow-y-auto h-screen lg:visible lg:h-auto p-4 pb-24 lg:py-6 lg:px-8 lg:mb-24 bg-white dark:bg-neutral-900 lg:rounded-2xl border border-neutral-200 dark:border-neutral-700'>
      <button
        onClick={() => closeFilters(false)}
        className='block p-3 ml-auto mb-2 -mt-3 -mr-4 rounded-full lg:hidden'
      >
        <XMarkIcon className='w-6 h-6' />
      </button>
      <SearchForm handleSearchChange={handleSearchQuery} />
      <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>
      <div className='sticky top:0 lg:top-20 flex justify-between items-center bg-white dark:bg-neutral-900 z-10'>
        <h4 className='flex justify-between items-center my-6 text-2xl font-semibold'>
          Filters{' '}
          {checkedFiltersCount > 0 && (
            <span className='inline-flex text-white items-center justify-center w-7 h-7 ml-2 text-sm font-normal rounded-full bg-primary-700'>
              {checkedFiltersCount}
            </span>
          )}
        </h4>
        {checkedFiltersCount > 0 && (
          <ButtonPrimary sizeClass='gap-2 px-4 py-2' onClick={resetQueryParams}>
            <ArrowPathIcon className='w-4' />
            Clear<span className='lg:hidden xl:inline-block'> Filters</span>
          </ButtonPrimary>
        )}
      </div>
      <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>

      {filtersData.length > 0 &&
        filtersData.map((filterCategory: any) => {
          if (filterCategory.type === 'range') {
            return (
              <AccordionComponent
                key={filterCategory.id}
                title={filterCategory.name}
                className='py-6'
              >
                <RangeSlider
                  rangeData={filterCategory}
                  onChange={handleRangeFilterChange}
                  resetRangeFilter={resetRangeFilter}
                />
              </AccordionComponent>
            );
          } else if (filterCategory.type === 'multiselect') {
            return (
              <AccordionComponent
                key={filterCategory.id}
                title={filterCategory.name}
                className='py-6'
              >
                <ul className='mb-6 flex flex-col gap-3'>
                  {filterCategory.values?.length > 0 &&
                    filterCategory.values.map(
                      (filter: {
                        id: string | number;
                        name: string;
                        count: number;
                        meta: { value: string };
                      }) => (
                        <li
                          key={filter.id}
                          className='flex justify-between items-center'
                        >
                          <Checkbox
                            filterCategory={filterCategory.id}
                            id={filter.id}
                            name={filter.name}
                            label={filter.name}
                            onChange={handleFilterChange}
                            color={filter.meta.value}
                          />
                          <span>{filter.count}</span>
                        </li>
                      )
                    )}
                </ul>
              </AccordionComponent>
            );
          }
        })}
    </div>
  );
};

export default Filters;
