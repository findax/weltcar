import { useState } from 'react';
import Slider from 'rc-slider';
import { ButtonPrimary, ButtonThird } from '@/shared/Buttons';
import { IFilters } from '@/types/catalog';

interface rangeDataProps {
  rangeData: IFilters;
  onChange: (filterCategory: string, min: number, max: number) => void;
  resetRangeFilter: (filterCategory: string) => void;
}

export default function RangeSlider({
  rangeData,
  onChange,
  resetRangeFilter,
}: rangeDataProps) {
  const defaultRangeState = [rangeData.min, rangeData.max];
  const [rangeState, setRangeState] = useState([rangeData.min, rangeData.max]);

  const handleMinPriceChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === '') {
      setRangeState([0, rangeState[1]]);
      return;
    }
    const newMinPrice = parseInt(e.currentTarget.value);
    if (rangeState[1] && newMinPrice <= rangeState[1]) {
      setRangeState([newMinPrice, rangeState[1]]);
    }
  };

  const handleMaxPriceChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === '') {
      setRangeState([rangeState[0], 0]);
      return;
    }
    const newMaxPrice = parseInt(e.currentTarget.value);
    if (newMaxPrice >= 0) {
      setRangeState([rangeState[0], newMaxPrice]);
    }
  };

  const resetRange = () => {
    setRangeState(defaultRangeState);
    resetRangeFilter(rangeData.id);
  };

  return (
    <div className='mb-6 relative flex flex-col space-y-8'>
      <div className='flex justify-between space-x-5'>
        <div>
          <label
            htmlFor={`min-${rangeData.id}`}
            className='block text-sm font-medium text-neutral-700 dark:text-neutral-300'
          >
            Min
          </label>
          <div className='mt-1 relative rounded-md'>
            {rangeData.id === 'price' && (
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <span className='text-neutral-500 sm:text-sm'>€</span>
              </div>
            )}
            <input
              type='text'
              id={`min-${rangeData.id}`}
              className='bg-transparent focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full'
              value={rangeState[0]?.toString()}
              onChange={handleMinPriceChange}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor={`max-${rangeData.id}`}
            className='block text-sm font-medium text-neutral-700 dark:text-neutral-300'
          >
            Max
          </label>
          <div className='mt-1 relative rounded-md'>
            {rangeData.id === 'price' && (
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <span className='text-neutral-500 sm:text-sm'>€</span>
              </div>
            )}
            <input
              type='text'
              id={`max-${rangeData.id}`}
              className='bg-transparent focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full'
              value={rangeState[1]?.toString()}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>
      </div>

      <div className='space-y-5'>
        <Slider
          range
          allowCross={false}
          className='block mx-auto w-11/12 text-primary-600'
          min={rangeData.min || 0}
          max={rangeData.max || 0}
          value={rangeState as number[]}
          onChange={(e) => setRangeState(e as number[])}
        />
      </div>

      <div className='flex items-center justify-between'>
        <ButtonThird
          onClick={resetRange}
          fontSize='text-sm'
          sizeClass='px-4 py-2 sm:px-5'
        >
          Clear
        </ButtonThird>
        <ButtonPrimary
          fontSize='text-sm'
          sizeClass='px-5 py-2 md:px-6'
          onClick={() =>
            onChange(rangeData.id, rangeState[0] ?? 0, rangeState[1] ?? 0)
          }
        >
          Apply
        </ButtonPrimary>
      </div>
    </div>
  );
}
