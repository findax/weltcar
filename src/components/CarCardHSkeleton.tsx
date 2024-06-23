export default function CarCardHSkeleton({
  paddingBottomHorizontal,
}: {
  paddingBottomHorizontal: string;
}) {
  return (
    <ul className='flex flex-col gap-4 lg:gap-6'>
      {Array.from(new Array(6)).map((_, i) => (
        <li
          key={i}
          className='bg-white dark:bg-transparent border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden'
        >
          <div className='flex flex-row animate-pulse'>
            <div className='w-[55%] lg:w-[50%] xl:w-[55%] 2xl:w-[60%]'>
              <div className={`relative ${paddingBottomHorizontal}`}>
                <div className='absolute inset-0 bg-neutral-300 dark:bg-neutral-700'></div>
              </div>
            </div>
            <div className='w-[45%] lg:w-[50%] xl:w-[45%] 2xl:w-[40%] flex flex-col justify-between px-5 py-4 xl:py-5 space-y-4 2xl:gap-5'>
              <div className='space-y-2'>
                <div className='h-8 bg-neutral-300 dark:bg-neutral-700 rounded'></div>
                <div className='h-4 w-2/5 bg-neutral-300 dark:bg-neutral-700 rounded'></div>
              </div>
              <div className='space-y-2'>
                <div className='h-6 w-2/5 bg-neutral-300 dark:bg-neutral-700 rounded'></div>
                <div className='h-6 w-2/5 bg-neutral-300 dark:bg-neutral-700 rounded'></div>
              </div>

              <div className='pt-4 xl:pt-5 flex items-center justify-between pt-1 border-t border-dashed border-neutral-300 dark:border-neutral-700'>
                <div className='h-10 w-1/3 bg-neutral-300 dark:bg-neutral-700 rounded'></div>
                <div className='h-12 w-2/5 bg-neutral-300 dark:bg-neutral-700 rounded-full'></div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
