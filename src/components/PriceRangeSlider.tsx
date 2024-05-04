import { useState } from 'react';
import Slider from 'rc-slider';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonThird from '@/shared/ButtonThird';

export default function PriceRangeSlider() {
  const [rangePrices, setRangePrices] = useState<number[]>([0, 260000]);
  // const [rangePrices, setRangePrices] = useState([0, 260000]);
  const handleMinPriceChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === '') {
      setRangePrices([0, rangePrices[1]]);
      return;
    }
    const newMinPrice = parseInt(e.currentTarget.value);
    if (newMinPrice <= rangePrices[1]) {
      setRangePrices([newMinPrice, rangePrices[1]]);
    }
  };

  const handleMaxPriceChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === '') {
      setRangePrices([rangePrices[0], 0]);
      return;
    }
    const newMaxPrice = parseInt(e.currentTarget.value);
    if (newMaxPrice >= 0) {
      setRangePrices([rangePrices[0], newMaxPrice]);
    }
  };

  const resetRange = () => {
    setRangePrices([0, 260000]);
  };

  return (
    <div className='mb-6 relative flex flex-col space-y-8'>
      <div className='flex justify-between space-x-5'>
        <div>
          <label
            htmlFor='minPrice'
            className='block text-sm font-medium text-neutral-700 dark:text-neutral-300'
          >
            Min price
          </label>
          <div className='mt-1 relative rounded-md'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <span className='text-neutral-500 sm:text-sm'>€</span>
            </div>
            <input
              type='text'
              name='minPrice'
              id='minPrice'
              className='bg-transparent focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full'
              value={rangePrices[0]}
              onChange={handleMinPriceChange}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor='maxPrice'
            className='block text-sm font-medium text-neutral-700 dark:text-neutral-300'
          >
            Max price
          </label>
          <div className='mt-1 relative rounded-md'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <span className='text-neutral-500 sm:text-sm'>€</span>
            </div>
            <input
              type='text'
              name='maxPrice'
              id='maxPrice'
              className='bg-transparent focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full'
              value={rangePrices[1]}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>
      </div>

      <div className='space-y-5'>
        <Slider
          range
          className='block mx-auto w-11/12 text-primary-600'
          min={0}
          max={260000}
          value={rangePrices}
          onChange={(e) => setRangePrices(e as number[])}
        />
      </div>

      <div className='flex items-center justify-between'>
        <ButtonThird onClick={resetRange} sizeClass='px-4 py-2 sm:px-5'>
          Clear
        </ButtonThird>
        <ButtonPrimary sizeClass='px-4 py-2 sm:px-5'>Apply</ButtonPrimary>
      </div>
    </div>
  );
}
