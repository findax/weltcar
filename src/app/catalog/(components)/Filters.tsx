'use client';

import { useRef } from 'react';
import RangeSlider from '@/components/RangeSlider';
import AccordionComponent from '@/components/AccordionComponent';
import { ButtonPrimary } from '@/shared/Buttons';
import { Checkbox } from '@/shared/FormInputs';
import { ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/outline';
import SearchForm from './SearchForm';
import { IFilters } from '@/types/catalog';

const Filters = ({
  filtersState,
  closeFilters,
}: {
  filtersState: IFilters[];
  closeFilters: (value: boolean) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // const handleClearData = () => {
  //   if (inputRef.current) {
  //     inputRef.current.value = '';
  //   }
  // };

  return (
    <div className='overflow-y-auto h-screen lg:visible lg:h-auto p-4 pb-24 lg:py-6 lg:px-8 lg:mb-24 bg-white dark:bg-neutral-900 lg:rounded-2xl border border-neutral-200 dark:border-neutral-700'>
      <div className='flex justify-between items-center'>
        <h4 className='mb-6 text-2xl font-semibold'>Filters</h4>
        <button
          onClick={() => closeFilters(false)}
          className='p-3 -mt-5 -mr-3 rounded-full lg:hidden'
        >
          <XMarkIcon className='w-6 h-6' />
        </button>
      </div>
      <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>
      <SearchForm />
      <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>

      {/* <AccordionComponent title='Pricing scale' className='py-6'>
        <RangeSlider />
      </AccordionComponent>
      <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div> */}

      {filtersState.length > 0 &&
        filtersState.map((filterCategory: any) => {
          if (filterCategory.type === 'range') {
            return (
              <AccordionComponent
                key={filterCategory.id}
                title={filterCategory.name}
                className='py-6'
              >
                <RangeSlider rangeData={filterCategory} />
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
                    filterCategory.values.map((filter: any) => (
                      <li
                        key={filter.id}
                        className='flex justify-between items-center'
                      >
                        <Checkbox
                          id={filter.id}
                          name={filter.name}
                          label={filter.name}
                        />
                        <span>{filter.count}</span>
                      </li>
                    ))}
                </ul>
              </AccordionComponent>
            );
          }
        })}

      <ButtonPrimary sizeClass='w-full gap-2 px-4 py-3 sm:px-6 mt-6'>
        <ArrowPathIcon className='w-5 h-5' />
        Reset Filters
      </ButtonPrimary>
    </div>
  );
};

export default Filters;
