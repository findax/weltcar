export default function CarCardHSkeleton() {
  return (
    <ul className='flex flex-col gap-4 lg:gap-6'>
      {Array.from(new Array(6)).map((_, i) => (
        <li className='bg-white dark:bg-transparent border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden'>
          <div className='flex animate-pulse'>
            <div className='bg-neutral-300 dark:bg-neutral-700 w-2/5'></div>
            <div className='flex-1 space-y-6 p-3'>
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
              <div className='flex justify-between p-1'>
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
