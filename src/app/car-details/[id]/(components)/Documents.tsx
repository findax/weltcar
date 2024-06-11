import { ICarDocuments } from '@/types/cardetails';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

// const documents = [
//   {
//     title: 'Specification',
//     description: 'some description',
//     file_name: 'someName.pdf',
//     url: '<url>',
//   },
//   {
//     title: 'Way Bill',
//     description: 'some description',
//     file_name: 'someName.pdf',
//     url: '<url>',
//   },
//   {
//     title: 'Export Confirm',
//     description: 'some description',
//     file_name: 'someName.pdf',
//     url: '<url>',
//   },
// ];

export default function Documents({
  documents,
}: {
  documents: ICarDocuments[];
}) {
  return (
    <div className='detailsSection__wrap sm:bg-white dark:bg-neutral-900'>
      {/* <div> */}
      <h2 className='text-2xl font-semibold'>Documents</h2>
      {/* <span className='block mt-2 text-neutral-500 dark:text-neutral-400'>
          Questions are at the heart of making things great.
        </span> */}
      {/* </div> */}
      <div className='w-14 border-b border-neutral-300 dark:border-neutral-700'></div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 '>
        {documents.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target='_blank'
            rel='noopener noreferrer'
            download
            className='flex items-center space-x-2'
          >
            <DocumentTextIcon className='w-14 flex-shrink-0' />
            <span className='text-lg font-medium underline hover:no-underline ease-in duration-200 break-all'>
              {item.title || item.file_name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
