export default function CarCardHSkeleton() {
  return (
    <ul className='flex flex-col gap-4 lg:gap-6'>
      {Array.from(new Array(6)).map((_, i) => (
        <li
          key={i}
          className='bg-white dark:bg-transparent border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden'
        >
          <div className='flex flex-row animate-pulse'>
            <div className='w-[55%] lg:w-[50%] xl:w-[55%] 2xl:w-[60%]'>
              <div className='relative pb-[67.6%] lg:pb-[83.8%] xl:pb-[60.4%] 2xl:pb-[51.4%]'>
                <div className='absolute inset-0 bg-neutral-300 dark:bg-neutral-700'></div>
              </div>
            </div>
            <div className='flex-1 p-5 space-y-4'>
              <div className='space-y-2'>
                <div className='h-8 bg-neutral-300 dark:bg-neutral-700 rounded'></div>
                <div className='h-5 w-2/5 bg-neutral-300 dark:bg-neutral-700 rounded'></div>
              </div>
              <div className='space-y-2 py-3'>
                <div className='h-5 w-2/5 bg-neutral-300 dark:bg-neutral-700 rounded'></div>
                <div className='h-5 w-2/5 bg-neutral-300 dark:bg-neutral-700 rounded'></div>
              </div>
              <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>
              <div className='flex items-center justify-between pt-1'>
                <div className='h-10 w-1/3 bg-neutral-300 dark:bg-neutral-700 rounded'></div>
                <div className='h-11 w-2/5 bg-neutral-300 dark:bg-neutral-700 rounded-full'></div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
