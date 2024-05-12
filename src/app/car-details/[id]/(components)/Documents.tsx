import { documents } from '@/types/carimagesgallery';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

export default function Documents() {
  return (
    <div className='detailsSection__wrap sm:bg-white dark:bg-neutral-900'>
      <div>
        <h2 className='text-2xl font-semibold'>Documents</h2>
        <span className='block mt-2 text-neutral-500 dark:text-neutral-400'>
          Questions are at the heart of making things great.
        </span>
      </div>
      <div className='w-14 border-b border-neutral-300 dark:border-neutral-700'></div>
      {/* 6 */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 '>
        {/* TIEN ICH 1 */}
        {documents.map((item, index) => (
          <div key={index} className='flex items-center space-x-4'>
            <a
              href={item.url}
              target='_blank'
              rel='noopener noreferrer'
              download
              className='w-14 flex-shrink-0'
            >
              <DocumentArrowDownIcon className='w-full' />
            </a>
            <a
              href={item.url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-lg font-medium underline hover:no-underline ease-in duration-200 cursor-pointer'
            >
              {item.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
