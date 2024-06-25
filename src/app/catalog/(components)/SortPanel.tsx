import { useState } from 'react';
import {
  ListBulletIcon,
  Squares2X2Icon,
  AdjustmentsHorizontalIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline';
import { ICatalogQueryParams, ISort } from '@/types/catalog';
import { ButtonPrimary } from '@/shared/Buttons';

interface SortPanelProps {
  sortData: ISort[];
  queryState: ICatalogQueryParams;
  results: number;
  isGrid: boolean;
  checkedFiltersCount: number;
  handleIsGrid: (isGrid: boolean) => void;
  openFilter: (value: boolean) => void;
  handleSortChange: (id: string) => void;
}

const SortPanel = ({
  sortData,
  queryState,
  results,
  isGrid,
  checkedFiltersCount,
  handleIsGrid,
  openFilter,
  handleSortChange,
}: SortPanelProps) => {
  const [fileFormat, setFileFormat] = useState<string>('pdf');
  const isSelectorShortWidth =
    (queryState && queryState.sort && queryState.sort[0].id === 'oldest') !==
    false;

  function handleSortSelectChange(select: HTMLSelectElement) {
    let tempOption = document.createElement('option');
    tempOption.textContent = select.selectedOptions[0].textContent;

    let tempSelect = document.createElement('select');
    tempSelect.style.visibility = 'hidden';
    tempSelect.style.position = 'fixed';
    tempSelect.appendChild(tempOption);

    select.after(tempSelect);
    select.style.width = `${+tempSelect.clientWidth + 4}px`;
    tempSelect.remove();

    handleSortChange(select.value);
  }

  return (
    <div className='col-span-12 bg-white dark:bg-neutral-900 mb-4 py-2 pl-4 pr-1 lg:mb-6 border border-neutral-200 dark:border-neutral-700 rounded-xl'>
      <div className='mt-2 flex flex-wrap items-center justify-between gap-4'>
        <h2 className='text-lg md:text-xl font-semibold'>
          Download the catalog
        </h2>
        <div>
          <label className='flex flex-wrap items-center'>
            <p className='inline-block mr-2 font-medium'>
              <span className='hidden xl:!inline'>Select </span>File Type:
            </p>
            <select
              className='bg-transparent cursor-pointer border-0 focus:ring-indigo-500 focus:border-indigo-500 rounded-full'
              defaultValue='pdf'
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFileFormat(e.target.value)
              }
            >
              <option value='pdf'>PDF</option>
              <option value='xlsx'>CSV</option>
            </select>
            <ButtonPrimary
              href={`https://api.weltcar.de/api/cars/list/export?type=${fileFormat}`}
              download
              className='!py-2 mx-2'
            >
              <span className='mr-2'>Download</span>
              <DocumentArrowDownIcon className='w-6' />
            </ButtonPrimary>
          </label>
        </div>
      </div>
      <div className='mt-4 mb-2 border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>
      <ul className='flex justify-between items-center flex-wrap gap-2'>
        <li className='py-2.5 lg:py-0'>
          <p className='mb-0 clr-neutral-500'>{results} Results</p>
        </li>
        <li className='flex-grow'>
          <div className='hidden md:flex flex-wrap justify-center justify-content-lg-start justify-content-xl-center gap-4'>
            <button
              className={`flex items-center gap-2 clr-neutral-500 hover:text-primary ${
                isGrid ? 'text-primary-600 dark:text-primary-400' : ''
              }`}
              onClick={() => handleIsGrid(true)}
            >
              <Squares2X2Icon className='w-5 h-5' />
              <span className='inline-block font-medium'>Grid</span>
            </button>
            <button
              className={`flex items-center gap-2 clr-neutral-500 hover:text-primary ${
                !isGrid ? 'text-primary-600 dark:text-primary-400' : ''
              }`}
              onClick={() => handleIsGrid(false)}
            >
              <ListBulletIcon className='w-5 h-5' />
              <span className='inline-block font-medium'>List</span>
            </button>
          </div>
        </li>
        <li className='flex items-center'>
          <label className='mb-0 clr-neutral-500 flex-grow whitespace-nowrap'>
            Sort By :
            <select
              className={`${isSelectorShortWidth ? 'w-[105px]' : ''} pl-4 pr-8 py-2 bg-transparent cursor-pointer border-0 focus:ring-indigo-500 focus:border-indigo-500 rounded-full`}
              defaultValue={`${(queryState && queryState.sort && queryState.sort[0].id) || 'latest'}`}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleSortSelectChange(e.target)
              }
            >
              {sortData.map((sort) => (
                <option key={sort.id} id={sort.id} value={sort.id}>
                  {sort.name}
                </option>
              ))}
            </select>
          </label>
        </li>
        <li className='w-full lg:hidden'>
          <button
            onClick={() => openFilter(true)}
            className={`py-2.5 flex items-center justify-center rounded-lg text-xl text-neutral-700 dark:text-neutral-300 focus:outline-none`}
          >
            <span className='inline-block font-bold'>Filters</span>
            <AdjustmentsHorizontalIcon className='w-7 ml-1' />{' '}
            {checkedFiltersCount > 0 && (
              <span className='inline-flex text-white items-center justify-center w-7 h-7 ml-2 text-sm font-normal rounded-full bg-primary-700'>
                {checkedFiltersCount}
              </span>
            )}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SortPanel;
