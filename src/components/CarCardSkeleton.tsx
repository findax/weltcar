export default function CarCardSkeleton() {
  return (
    <ul className='grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-2'>
      {Array.from(new Array(6)).map((_, i) => (
        <li
          key={i}
          className='bg-white dark:bg-transparent border border-neutral-200 dark:border-neutral-700 p-2 rounded-2xl'
        >
          <div className='animate-pulse'>
            <div className='relative pb-[55%] rounded-2xl overflow-hidden'>
              <div className='absolute inset-0 bg-neutral-300 dark:bg-neutral-700'></div>
            </div>
            <div className='flex-1 space-y-6 pt-6 px-3'>
              <div className='space-y-3'>
                <div className='h-8 bg-neutral-300 dark:bg-neutral-700 rounded'></div>
                <div className='h-4 w-2/5 bg-neutral-300 dark:bg-neutral-700 rounded'></div>
              </div>
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <div className='h-5 w-2/5 bg-neutral-300 dark:bg-neutral-700 rounded col-span-1'></div>
                  <div className='h-5 w-2/5 bg-neutral-300 dark:bg-neutral-700 rounded col-span-2'></div>
                </div>
                <div className='flex justify-between'>
                  <div className='h-5 w-2/5 bg-neutral-300 dark:bg-neutral-700 rounded col-span-1'></div>
                  <div className='h-5 w-2/5 bg-neutral-300 dark:bg-neutral-700 rounded col-span-2'></div>
                </div>
              </div>
              <div className='flex justify-between py-2'>
                <div className='h-10 w-1/3 bg-neutral-300 dark:bg-neutral-700 rounded col-span-1'></div>
                <div className='h-10 w-1/3 bg-neutral-300 dark:bg-neutral-700 rounded-full col-span-1'></div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
