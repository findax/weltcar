export default function CarCardSkeleton() {
  return (
    <ul className='grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-2'>
      {Array.from(new Array(6)).map((_, i) => (
        <li
          key={i}
          className='bg-white dark:bg-transparent border border-neutral-200 dark:border-neutral-700 p-2 rounded-2xl'
        >
          <div className='animate-pulse'>
            <div className='rounded-2xl bg-neutral-300 dark:bg-neutral-700 aspect-w-4 aspect-h-3'></div>
            <div className='flex-1 space-y-6 pt-6'>
              <div className='h-10 bg-neutral-300 dark:bg-neutral-700 rounded'></div>
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <div className='h-6 w-2/5 bg-neutral-300 dark:bg-neutral-700 rounded col-span-1'></div>
                  <div className='h-6 w-2/5 bg-neutral-300 dark:bg-neutral-700 rounded col-span-2'></div>
                </div>
                <div className='flex justify-between'>
                  <div className='h-6 w-2/5 bg-neutral-300 dark:bg-neutral-700 rounded col-span-1'></div>
                  <div className='h-6 w-2/5 bg-neutral-300 dark:bg-neutral-700 rounded col-span-2'></div>
                </div>
              </div>
              <div className='flex justify-between p-2'>
                <div className='h-10 w-1/4 bg-neutral-300 dark:bg-neutral-700 rounded col-span-1'></div>
                <div className='h-10 w-1/4 bg-neutral-300 dark:bg-neutral-700 rounded-full col-span-1'></div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
