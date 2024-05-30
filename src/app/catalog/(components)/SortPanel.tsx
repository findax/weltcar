import {
  ListBulletIcon,
  Squares2X2Icon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import { ISort } from '@/types/catalog';

interface SortPanelProps {
  sortData: ISort[];
  results: number;
  handleIsGrid: (isGrid: boolean) => void;
  isGrid: boolean;
  openFilter: (value: boolean) => void;
  handleSortChange: (id: string) => void;
}

const SortPanel = ({
  sortData,
  results,
  handleIsGrid,
  isGrid,
  openFilter,
  handleSortChange,
}: SortPanelProps) => {
  const handleChange = (select: HTMLSelectElement) => {
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
  };

  return (
    <div className='col-span-12 bg-white dark:bg-neutral-900 mb-4 py-2 pl-4 pr-1 lg:mb-6 border border-neutral-200 dark:border-neutral-700 rounded-xl'>
      <ul className='flex justify-between items-center flex-wrap gap-2'>
        <li className='hidden lg:block'>
          <p className='mb-0 clr-neutral-500'>{results} Results</p>
        </li>
        <li className='lg:hidden'>
          <button
            onClick={() => openFilter(true)}
            className={`focus:outline-none flex items-center justify-center py-2.5 rounded-lg text-neutral-700 dark:text-neutral-300`}
          >
            <span className='inline-block font-medium'>Filters</span>
            <AdjustmentsHorizontalIcon className='h-5 w-5 ml-1' />
          </button>
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
              className='w-[105px] bg-transparent cursor-pointer pl-4 pr-8 py-2 border-0 focus:ring-indigo-500 focus:border-indigo-500 rounded-full'
              defaultValue='latest'
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleChange(e.target)
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
      </ul>
    </div>
  );
};

export default SortPanel;
