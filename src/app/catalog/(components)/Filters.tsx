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
  handleSearchChange,
  handleFilterChange,
  handleRangeFilterChange,
  resetRangeFilter,
  resetQueryParams,
}: {
  filtersData: IFilters[];
  closeFilters: (value: boolean) => void;
  checkedFiltersCount: number;
  handleSearchChange: (value: string) => void;
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
    <div className='overflow-y-auto h-screen lg:visible lg:h-auto p-4 pb-24 lg:py-6 lg:px-8 lg:mb-24 bg-white dark:bg-neutral-900 lg:rounded-2xl border border-neutral-200 dark:border-neutral-700'>
      <div className='flex justify-between items-center'>
        <h4 className='flex justify-between items-center mb-6 text-2xl font-semibold'>
          Filters{' '}
          {checkedFiltersCount > 0 && (
            <span className='inline-flex text-white items-center justify-center w-7 h-7 ml-2 text-sm font-normal rounded-full bg-primary-700'>
              {checkedFiltersCount}
            </span>
          )}
        </h4>
        <button
          onClick={() => closeFilters(false)}
          className='p-3 -mt-5 -mr-3 rounded-full lg:hidden'
        >
          <XMarkIcon className='w-6 h-6' />
        </button>
      </div>
      <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>
      <SearchForm handleSearchChange={handleSearchChange} />
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

      <ButtonPrimary
        sizeClass='w-full gap-2 px-4 py-3 sm:px-6 mt-6'
        onClick={resetQueryParams}
      >
        <ArrowPathIcon className='w-5 h-5' />
        Reset Filters
      </ButtonPrimary>
    </div>
  );
};

export default Filters;
