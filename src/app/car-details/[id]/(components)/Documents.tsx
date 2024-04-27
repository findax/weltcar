import Image from 'next/image';
import { Amenities_demos } from '@/data/carimagesgallery';

export default function Documents() {
  return (
    <div className='detailsSection__wrap'>
      <div>
        <h2 className='text-2xl font-semibold'>Documents</h2>
        <span className='block mt-2 text-neutral-500 dark:text-neutral-400'>
          Questions are at the heart of making things great.
        </span>
      </div>
      <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>
      {/* 6 */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 '>
        {/* TIEN ICH 1 */}
        {Amenities_demos.map((item, index) => (
          <div key={index} className='flex items-center space-x-4 '>
            <div className='w-10 flex-shrink-0'>
              <Image src={item.icon} alt='' />
            </div>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
