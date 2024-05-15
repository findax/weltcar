export default function CarDescriptions({
  description,
}: {
  description: string;
}) {
  return (
    <div className='detailsSection__wrap sm:bg-white dark:bg-neutral-900'>
      <h2 className='text-2xl font-semibold'>Car descriptions</h2>
      <div className='w-14 border-b border-neutral-300 dark:border-neutral-700'></div>
      <div className='text-neutral-600 dark:text-neutral-300'>
        <p>{description}</p>
      </div>
    </div>
  );
}
