export default function CarCardSkeleton({
  paddingBottomGrid,
}: {
  paddingBottomGrid: string;
}) {
  return (
    <ul className='grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-2'>
      {Array.from(new Array(6)).map((_, i) => (
        <li
          key={i}
          className='bg-white dark:bg-transparent border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden'
        >
          <div className='animate-pulse'>
            <div className={`relative overflow-hidden ${paddingBottomGrid}`}>
              <div className='absolute inset-0 bg-neutral-300 dark:bg-neutral-700'></div>
            </div>
            <div className='py-4 px-5 space-y-2'>
              <div className='space-y-2'>
                <div className='h-8 bg-neutral-300 dark:bg-neutral-700 rounded'></div>
                <div className='h-4 w-2/5 bg-neutral-300 dark:bg-neutral-700 rounded'></div>
              </div>
              <div className='py-3 space-y-2'>
                <div className='h-6 w-2/5 bg-neutral-300 dark:bg-neutral-700 rounded'></div>
                <div className='h-6 w-2/5 bg-neutral-300 dark:bg-neutral-700 rounded'></div>
              </div>

              <div className='pt-4 flex items-center justify-between border-t border-dashed border-neutral-300 dark:border-neutral-700'>
                <div className='h-8 w-1/3 bg-neutral-300 dark:bg-neutral-700 rounded'></div>
                <div className='h-11 w-1/3 bg-neutral-300 dark:bg-neutral-700 rounded-full'></div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
